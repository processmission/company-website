import { createHash } from 'node:crypto';
import { appendFile, lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { cachePolicy } from '../src/config/cache.ts';

const policy = cachePolicy.pages;
const limits = { requests: 4096, bytes: 64 * 1024 * 1024, responseBytes: 16 * 1024 * 1024 };
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const integer = (value) => Number.isSafeInteger(value) && value >= 0;

function safePath(path) {
  if (typeof path !== 'string' || path.length > 1024 || !path.split('/').every((part) => /^[\w-][\w.-]*$/.test(part) && part !== '.' && part !== '..')) {
    throw new Error(`Unsafe resource path: ${path}`);
  }
  return path;
}

function assetPath(path) {
  safePath(path);
  if (!path.startsWith('_astro/') && !policy.legacyAssets.includes(path)) {
    throw new Error(`Resource is outside retained assets: ${path}`);
  }
  return path;
}

function keys(value, expected) {
  return value && typeof value === 'object' && !Array.isArray(value)
    && Object.keys(value).sort().join(',') === [...expected].sort().join(',');
}

function validateManifest(value, now) {
  if (!keys(value, ['version', 'preparedAt', 'revision', 'current', 'retired']) || value.version !== 1
    || !integer(value.preparedAt) || value.preparedAt > now
    || typeof value.revision !== 'string' || !/^[\w.-]{1,128}$/.test(value.revision)
    || !Array.isArray(value.current) || !Array.isArray(value.retired)
    || value.current.length + value.retired.length > limits.requests) {
    throw new Error('Invalid previous cache manifest');
  }
  const paths = new Set();
  for (const [entries, retired] of [[value.current, false], [value.retired, true]]) {
    for (const entry of entries) {
      if (!keys(entry, retired ? ['path', 'sha256', 'expiresAt'] : ['path', 'sha256'])
        || !/^[a-f0-9]{64}$/.test(entry.sha256)
        || (retired && (!integer(entry.expiresAt) || entry.expiresAt <= value.preparedAt
          || entry.expiresAt > value.preparedAt + policy.retainedAssetSeconds))) {
        throw new Error('Invalid previous cache manifest entry');
      }
      assetPath(entry.path);
      if ((!retired && !entry.path.startsWith('_astro/')) || paths.has(entry.path)) {
        throw new Error(`Invalid or duplicate manifest path: ${entry.path}`);
      }
      paths.add(entry.path);
    }
  }
  return value;
}

function checkHtml(response) {
  if (!/^text\/html(?:;|$)/i.test(response.headers.get('content-type') ?? '')) {
    throw new Error(`Expected published HTML: ${response.url}`);
  }
  const control = response.headers.get('cache-control') ?? '';
  const directives = control.toLowerCase().split(',').map((part) => part.trim());
  if (directives.some((part) => /^(no-cache|no-store)$/.test(part))) return;
  const age = {};
  for (const directive of directives) {
    const match = /^(max-age|s-maxage|stale-while-revalidate|stale-if-error)\s*=\s*"?(\d+)"?$/.exec(directive);
    if (match) {
      if (age[match[1]] !== undefined || !integer(Number(match[2]))) throw new Error('Invalid HTML cache freshness');
      age[match[1]] = Number(match[2]);
    } else if (/^(max-age|s-maxage|stale-while-revalidate|stale-if-error)\b/.test(directive)) {
      throw new Error('Invalid HTML cache freshness');
    }
  }
  const freshness = Math.max(age['max-age'] ?? 0, age['s-maxage'] ?? 0);
  const stale = Math.max(age['stale-while-revalidate'] ?? 0, age['stale-if-error'] ?? 0);
  if ((age['max-age'] === undefined && age['s-maxage'] === undefined)
    || freshness + stale > policy.htmlFreshnessLimitSeconds) {
    throw new Error(`Published HTML freshness exceeds ${policy.htmlFreshnessLimitSeconds}s or is unspecified`);
  }
}

function checkAsset(path, response, bytes) {
  const type = (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
  const text = bytes.subarray(0, 256).toString().trimStart();
  if (!bytes.length || type === 'text/html' || /^<!doctype\s+html|^<html[\s>]/i.test(text)
    || (/\.css$/i.test(path) && type !== 'text/css')
    || (/\.[cm]?js$/i.test(path) && !['application/javascript', 'text/javascript', 'application/ecmascript'].includes(type))
    || (/\.svg$/i.test(path) && (type !== 'image/svg+xml' || !/<svg[\s/>]/i.test(bytes.toString())))
    || (/\.(png|jpe?g|webp|avif|gif|ico)$/i.test(path) && !type.startsWith('image/'))) {
    throw new Error(`Invalid asset payload: ${path}`);
  }
}

function siteRoot(siteUrl, siteBase) {
  const origin = new URL(siteUrl);
  if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password
    || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('SITE_URL must be an HTTP(S) origin');
  const base = siteBase === '' || siteBase === '/' ? '' : siteBase.replace(/^\//, '').replace(/\/$/, '');
  if (base) safePath(base);
  return new URL(base ? `/${base}/` : '/', origin);
}

// Only static published routes/assets are followed; this is not a general web crawler.
function reference(raw, from, root) {
  if (!raw || /^(?:#|data:|mailto:|tel:|javascript:)/i.test(raw)) return;
  const decoded = raw.replace(/&amp;/g, '&').replace(/&#(?:x([\da-f]+)|(\d+));/gi,
    (_, hex, dec) => String.fromCodePoint(parseInt(hex ?? dec, hex ? 16 : 10)));
  if (/[\\\u0000-\u0020]/.test(decoded) || /%(?:2f|5c|00)/i.test(decoded)) throw new Error(`Unsafe published URL: ${raw}`);
  const url = new URL(decoded, from);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return;
  if (url.username || url.password) throw new Error('Credentials in published URL');
  const path = decodeURIComponent(url.pathname.slice(root.pathname.length));
  if (path) safePath(path.replace(/\/$/, ''));
  url.search = '';
  url.hash = '';
  return { url, path };
}

function htmlReferences(text, base) {
  const references = [];
  // Astro emits quoted attributes; stripping comments prevents following commented-out links.
  for (const tag of text.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<([a-z][\w:-]*)\b([^<>]*)>/gi)) {
    const attributes = new Map();
    for (const attr of tag[2].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      attributes.set(attr[1].toLowerCase(), attr[2] ?? attr[3]);
    }
    for (const name of ['href', 'src', 'poster', 'xlink:href']) {
      if (attributes.has(name)) references.push(attributes.get(name));
    }
    const srcset = attributes.get('srcset') ?? '';
    let offset = 0;
    while (offset < srcset.length) {
      while (offset < srcset.length && /[\s,]/.test(srcset[offset])) offset++;
      const start = offset;
      while (offset < srcset.length && !/\s/.test(srcset[offset])) offset++;
      const url = srcset.slice(start, offset).replace(/,+$/, '');
      if (url && !/^data:/i.test(url)) references.push(url);
      if (srcset[offset - 1] !== ',') {
        while (offset < srcset.length && srcset[offset] !== ',') offset++;
      }
    }
    references.push(...codeReferences(attributes.get('style') ?? '', false));
  }
  for (const style of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) references.push(...codeReferences(style[1], false));
  for (const script of text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) references.push(...codeReferences(script[1], true, base));
  return references;
}

function codeReferences(text, javascript, base = '/') {
  const references = [];
  if (!javascript) {
    for (const match of text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)'";]+))\s*\)|@import\s+["']([^"']+)["']/gi)) {
      references.push(match[1] ?? match[2] ?? match[3] ?? match[4]);
    }
  } else {
    for (const match of text.matchAll(/(?:\b(?:import|export)\s*(?:[^;"'()]*?\bfrom\s*)?|\bimport\s*\(|\bnew\s+URL\s*\()\s*["']([^"']+)["'](?=\s*(?:[,);]|$))/g)) references.push(match[1]);
    // Vite preload arrays use build-root-relative _astro paths, unlike imports.
    for (const match of text.matchAll(/(?:\[|,)\s*["']((?:\.{1,2}\/|\/?_astro\/)[^"'\s]+)["'](?=\s*[,\]])/g)) {
      references.push(match[1].startsWith('_astro/') ? `${base}${match[1]}` : match[1]);
    }
    // Compiled file dependencies have extensions; directory/base URL calculations do not.
    return references.filter((reference) => /(?:^|\/)[^/]+\.[^/]+$/.test(reference.split(/[?#]/, 1)[0]));
  }
  return references;
}

async function freshFiles(dist, prefix = '') {
  const files = new Map();
  const stat = await lstat(join(dist, prefix));
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`Unsafe build directory: ${prefix || dist}`);
  for (const entry of await readdir(join(dist, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Symlink in build: ${path}`);
    if (entry.isDirectory()) {
      for (const [name, digest] of await freshFiles(dist, path)) files.set(name, digest);
    } else if (entry.isFile()) {
      files.set(path, path.startsWith('_astro/') ? sha256(await readFile(join(dist, safePath(path)))) : null);
    } else throw new Error(`Unsupported build entry: ${path}`);
  }
  return files;
}

export async function prepareCacheRelease({ dist = 'dist', siteUrl, siteBase = '/', now = Math.floor(Date.now() / 1000), revision = process.env.GITHUB_SHA ?? `local-${now}`, local = false } = {}) {
  if (!integer(now) || !/^[\w.-]{1,128}$/.test(revision)) throw new Error('Invalid release timestamp or revision');
  if (!siteUrl && !local) throw new Error('SITE_URL is required; use --local only for an isolated local build');
  dist = resolve(dist);
  const files = await freshFiles(dist);
  if (files.has(policy.manifestPath)) throw new Error('Build already prepared; rebuild before preparing a release');
  const current = [...files].filter(([path]) => path.startsWith('_astro/')).map(([path, digest]) => ({ path, sha256: digest })).sort((a, b) => a.path.localeCompare(b.path));
  const retained = new Map();
  const payloads = new Map();
  if (siteUrl) {
    const root = siteRoot(siteUrl, siteBase);
    let requestCount = 0;
    let totalBytes = 0;
    async function get(input, allow404 = false) {
      let url = new URL(input);
      for (let redirects = 0; ; redirects++) {
        if (++requestCount > limits.requests) throw new Error('Previous release request limit exceeded');
        if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname) || url.username || url.password) throw new Error('Unsafe previous release redirect');
        const response = await fetch(url, { redirect: 'manual', credentials: 'omit', cache: 'no-store', headers: { 'Cache-Control': 'no-cache, no-store', Pragma: 'no-cache' }, signal: AbortSignal.timeout(30000) });
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          await response.body?.cancel();
          if (redirects >= 5 || !response.headers.get('location')) throw new Error('Previous release redirect limit exceeded');
          const next = reference(response.headers.get('location'), url, root);
          if (!next) throw new Error('Unsafe previous release redirect');
          url = next.url;
          continue;
        }
        if (response.status === 404 && allow404) {
          await response.body?.cancel();
          return null;
        }
        if (response.status !== 200) {
          await response.body?.cancel();
          throw new Error(`Previous release HTTP ${response.status}: ${url}`);
        }
        const chunks = [];
        let size = 0;
        for await (const chunk of response.body) {
          size += chunk.length;
          totalBytes += chunk.length;
          if (size > limits.responseBytes || totalBytes > limits.bytes) throw new Error('Previous release byte limit exceeded');
          chunks.push(chunk);
        }
        return { response, bytes: Buffer.concat(chunks), url };
      }
    }
    const live = await get(root, true);
    if (live) {
      checkHtml(live.response);
      const previous = await get(new URL(policy.manifestPath, root), true);
      if (previous) {
        const manifest = validateManifest(JSON.parse(previous.bytes.toString()), now);
        for (const entry of manifest.current) retained.set(entry.path, { ...entry, expiresAt: now + policy.retainedAssetSeconds });
        for (const entry of manifest.retired) if (entry.expiresAt > now) retained.set(entry.path, entry);
      } else {
        const visited = new Set();
        const queue = [{ ...live, path: '' }];
        for (let index = 0; index < queue.length; index++) {
          const item = queue[index];
          if (visited.has(item.path)) continue;
          visited.add(item.path);
          const isAsset = item.path.startsWith('_astro/') || policy.legacyAssets.includes(item.path);
          const resource = item.bytes ? item : await get(item.url);
          if (isAsset) {
            checkAsset(item.path, resource.response, resource.bytes);
            retained.set(item.path, { path: item.path, sha256: sha256(resource.bytes), expiresAt: now + policy.retainedAssetSeconds });
            payloads.set(item.path, resource.bytes);
          } else checkHtml(resource.response);
          const text = resource.bytes.toString();
          const links = !isAsset ? htmlReferences(text, root.pathname) : /\.css$/i.test(item.path) ? codeReferences(text, false) : /\.[cm]?js$/i.test(item.path) ? codeReferences(text, true, root.pathname) : [];
          for (const link of links) {
            const target = reference(link, resource.url, root);
            if (!target) continue;
            const asset = target.path.startsWith('_astro/') || policy.legacyAssets.includes(target.path);
            const html = !target.path || target.path.endsWith('/') || !target.path.split('/').at(-1).includes('.') || /\.html$/i.test(target.path);
            if (!asset && !html) continue;
            if (asset) assetPath(target.path);
            if (!visited.has(target.path) && !queue.some((queued) => queued.path === target.path)) queue.push(target);
            if (queue.length > limits.requests) throw new Error('Previous release resource limit exceeded');
          }
        }
      }
      for (const [path, entry] of retained) {
        if (files.has(path)) {
          if (path.startsWith('_astro/') && files.get(path) !== entry.sha256) throw new Error(`Immutable asset key changed: ${path}`);
          retained.delete(path);
          continue;
        }
        if (!payloads.has(path)) {
          const resource = await get(new URL(path, root));
          checkAsset(path, resource.response, resource.bytes);
          if (sha256(resource.bytes) !== entry.sha256) throw new Error(`Previous asset digest mismatch: ${path}`);
          payloads.set(path, resource.bytes);
        }
      }
    }
  }
  const manifest = { version: 1, preparedAt: now, revision, current, retired: [...retained.values()].sort((a, b) => a.path.localeCompare(b.path)) };
  validateManifest(manifest, now);
  // All downloads are verified first. Mark the dist before merging so a failed write
  // cannot make a retry mistake partially retained resources for fresh build assets.
  await writeFile(join(dist, policy.manifestPath), `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx' });
  for (const path of retained.keys()) {
    const parts = assetPath(path).split('/');
    for (let index = 1; index < parts.length; index++) {
      const directory = join(dist, ...parts.slice(0, index));
      await mkdir(directory, { recursive: true });
      const stat = await lstat(directory);
      if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`Unsafe retained asset directory: ${path}`);
    }
    await writeFile(join(dist, path), payloads.get(path), { flag: 'wx' });
  }
  return { manifest, preparedAt: now, deployBefore: now + policy.maxPreparationAgeSeconds };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== '--local')) throw new Error('Usage: node scripts/cache-release.mjs [--local]');
  const result = await prepareCacheRelease({ siteUrl: process.env.SITE_URL, siteBase: process.env.SITE_BASE ?? '/', local: args.includes('--local') });
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `prepared-at=${result.preparedAt}\ndeploy-before=${result.deployBefore}\n`);
  console.log(`Prepared ${result.manifest.current.length} current and ${result.manifest.retired.length} retired cache assets; deploy before ${result.deployBefore}`);
}
