import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { prepareCacheRelease } from './cache-release.mjs';
import { cachePolicy } from '../src/config/cache.ts';

const policy = cachePolicy.pages;
const now = 2_000_000;
const base = '/company-website/';
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const entry = (path, bytes) => ({ path, sha256: digest(bytes) });
const routes = new Map();
const requests = [];
const server = createServer((request, response) => {
  requests.push({ path: request.url, cacheControl: request.headers['cache-control'] });
  const route = routes.get(request.url);
  if (!route) {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(route.status ?? 200, route.headers).end(route.body);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
await mkdir('.npm-cache', { recursive: true });
const temporary = await mkdtemp('.npm-cache/cache-release-test-');
let serial = 0;

function html(path = '', body = '', control = 'max-age=600') {
  routes.set(base + path, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': control }, body: `<!doctype html><html><body>${body}</body></html>` });
}

function asset(path, body, type = 'application/javascript') {
  routes.set(base + path, { headers: { 'Content-Type': type }, body });
}

function manifest(current = [], retired = [], preparedAt = now - 1000) {
  const value = { version: 1, preparedAt, revision: 'previous', current, retired };
  routes.set(base + policy.manifestPath, { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
  return value;
}

async function build(files = { '_astro/new.js': 'export const current = true;', 'index.html': '<h1>New HTML</h1>' }) {
  const dist = join(temporary, `dist-${serial++}`);
  await mkdir(dist);
  for (const [path, contents] of Object.entries(files)) {
    const destination = join(dist, path);
    await mkdir(join(destination, '..'), { recursive: true });
    await writeFile(destination, contents);
  }
  return dist;
}

async function prepare(dist, options = {}) {
  return prepareCacheRelease({ dist, siteUrl: origin, siteBase: base, now, revision: 'new-revision', ...options });
}

async function test(name, run) {
  routes.clear();
  requests.length = 0;
  html();
  await run();
  console.log(`ok: ${name}`);
}

try {
  await test('initial deployment and explicit offline build publish current-only manifests', async () => {
    routes.clear();
    const dist = await build();
    const result = await prepare(dist);
    assert.deepEqual(result.manifest.current, [entry('_astro/new.js', 'export const current = true;')]);
    assert.deepEqual(result.manifest.retired, []);
    assert.equal(result.preparedAt, now);
    assert.equal(result.deployBefore, now + policy.maxPreparationAgeSeconds);
    assert.deepEqual(JSON.parse(await readFile(join(dist, policy.manifestPath), 'utf8')), result.manifest);
    await assert.rejects(prepareCacheRelease({ dist: await build(), now }), /SITE_URL is required/);
    assert.equal((await prepareCacheRelease({ dist: await build(), now, local: true })).manifest.retired.length, 0);
    await assert.rejects(prepare(dist), /already prepared/);
  });

  await test('very old live current resources retire now, not at their old build date', async () => {
    const old = 'export const old = true;';
    manifest([entry('_astro/old.js', old)], [], 1000);
    asset('_astro/old.js', old);
    const dist = await build();
    const result = await prepare(dist);
    assert.equal(await readFile(join(dist, '_astro/old.js'), 'utf8'), old);
    assert.deepEqual(result.manifest.retired, [{ ...entry('_astro/old.js', old), expiresAt: now + policy.retainedAssetSeconds }]);
    assert.deepEqual(result.manifest.current.map(({ path }) => path), ['_astro/new.js']);
    assert.equal(await readFile(join(dist, 'index.html'), 'utf8'), '<h1>New HTML</h1>');
    assert(requests.every((request) => /no-cache/.test(request.cacheControl)));
  });

  await test('retired expiry never extends, expired entries disappear, current files win', async () => {
    const inherited = { ...entry('_astro/inherited.js', 'old chunk'), expiresAt: now + 500 };
    const expired = { ...entry('_astro/expired.js', 'expired chunk'), expiresAt: now - 1 };
    const legacy = { ...entry('favicon.svg', '<svg>old</svg>'), expiresAt: now + 500 };
    manifest([entry('_astro/new.js', 'export const current = true;')], [inherited, expired, legacy]);
    asset('_astro/inherited.js', 'old chunk');
    const dist = await build({ '_astro/new.js': 'export const current = true;', 'favicon.svg': '<svg>new</svg>' });
    const result = await prepare(dist);
    assert.deepEqual(result.manifest.retired, [inherited]);
    assert.equal(await readFile(join(dist, 'favicon.svg'), 'utf8'), '<svg>new</svg>');
    assert(!requests.some(({ path }) => /expired|favicon|new\.js/.test(path)));
    // The next release inherits exactly the same deadline instead of accumulating another day.
    manifest(result.manifest.current, result.manifest.retired, result.manifest.preparedAt);
    asset('_astro/new.js', 'export const current = true;');
    const next = await prepare(await build({ '_astro/next.js': 'next' }), { now: now + 100 });
    assert.equal(next.manifest.retired.find(({ path }) => path === inherited.path).expiresAt, inherited.expiresAt);
    assert.deepEqual(next.manifest.current.map(({ path }) => path), ['_astro/next.js']);
  });

  await test('one-time bootstrap follows old HTML, srcsets, CSS and JS dependencies under the base', async () => {
    html('', `<a href="removed/">Old route</a><script type="module" src="${base}_astro/main.js"></script>
      <link rel="stylesheet" href="${base}_astro/site.css"><img src="company-logo.webp" srcset="${base}_astro/one.svg 1x, ${base}_astro/two.svg 2x"><img srcset="data:image/svg+xml;base64,PHN2Zy8+ 1x">
      <link rel="icon" href="favicon.svg"><a href="mfcp/LICENSE.txt">License</a><a href="https://example.com/private/">External</a>
      <a href="/outside/">Outside base</a><img src="data:image/png;base64,a"><a href="#section">Section</a>`);
    html('removed/', '<script src="../_astro/removed.js"></script><a href="../">Cycle</a>');
    asset('_astro/main.js', `import './chunk.js'; export { x } from './export.js'; import('./dynamic.js'); new URL('./url.svg', import.meta.url); new URL(e.src,location.href); new Url(e.src,location.href); url(e.src,location.href); new URL('.',import.meta.url); new URL('./',import.meta.url); new URL('../',import.meta.url); new URL('./missing-url.js' + suffix,import.meta.url); import('./missing-import.js' + suffix); const dynamic = ['./missing-array.js' + suffix]; const preload = ['_astro/preloaded.js'];`);
    asset('_astro/chunk.js', 'export const chunk = 1;');
    asset('_astro/export.js', 'export const x = 1;');
    asset('_astro/dynamic.js', 'export default 1;');
    asset('_astro/removed.js', 'export const removed = 1;');
    asset('_astro/preloaded.js', 'export const preloaded = 1;');
    asset('_astro/site.css', '@import "./theme.css"; .icon { background: url("./background.svg"); }', 'text/css');
    asset('_astro/theme.css', '@font-face { src: url(./font.woff2); }', 'text/css');
    asset('_astro/font.woff2', Buffer.from([0x77, 0x4f, 0x46, 0x32]), 'font/woff2');
    for (const name of ['one', 'two', 'url', 'background']) asset(`_astro/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg"><title>${name}</title></svg>`, 'image/svg+xml');
    asset('company-logo.webp', Buffer.from('RIFF old logo WEBP'), 'image/webp');
    asset('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>', 'image/svg+xml');
    const dist = await build();
    const result = await prepare(dist);
    const expected = [...routes.keys()].filter((path) => path.includes('_astro/') || /(?:company-logo.webp|favicon.svg)$/.test(path)).map((path) => path.slice(base.length)).sort();
    assert.deepEqual(result.manifest.retired.map(({ path }) => path).sort(), expected);
    for (const path of expected) assert.deepEqual(await readFile(join(dist, path)), Buffer.from(routes.get(base + path).body));
    assert(result.manifest.retired.every(({ expiresAt }) => expiresAt === now + policy.retainedAssetSeconds));
    assert(!requests.some(({ path }) => /LICENSE|outside|private/.test(path)));
  });

  await test('root deployment bootstrap resolves the same resource graph', async () => {
    routes.clear();
    routes.set('/', { headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' }, body: '<img src="/_astro/root.svg">' });
    routes.set('/_astro/root.svg', { headers: { 'Content-Type': 'image/svg+xml' }, body: '<svg/>' });
    const result = await prepare(await build(), { siteBase: '/' });
    assert.equal(result.manifest.retired[0].path, '_astro/root.svg');
  });

  await test('missing required old assets and disguised HTML fail closed', async () => {
    const old = entry('_astro/missing.js', 'missing');
    manifest([old]);
    await assert.rejects(prepare(await build()), /HTTP 404/);
    asset(old.path, '<!doctype html><html>Error</html>', 'text/html');
    await assert.rejects(prepare(await build()), /Invalid asset payload/);
    routes.delete(base + policy.manifestPath);
    html('', '<img src="_astro/missing.svg">');
    await assert.rejects(prepare(await build()), /HTTP 404/);
  });

  await test('corrupt bytes and immutable key reuse reject without overwriting new files', async () => {
    manifest([entry('_astro/old.js', 'expected')]);
    asset('_astro/old.js', 'corrupt');
    await assert.rejects(prepare(await build()), /digest mismatch/);
    manifest([entry('_astro/new.js', 'changed old content')]);
    const dist = await build();
    await assert.rejects(prepare(dist), /Immutable asset key changed/);
    assert.equal(await readFile(join(dist, '_astro/new.js'), 'utf8'), 'export const current = true;');
  });

  await test('network failure leaves a clean retry, filesystem failure requires a rebuild', async () => {
    const first = entry('_astro/first.js', 'first');
    const missing = entry('_astro/missing.js', 'missing');
    manifest([first, missing]);
    asset(first.path, 'first');
    const dist = await build();
    await assert.rejects(prepare(dist), /HTTP 404/);
    await assert.rejects(readFile(join(dist, first.path)), { code: 'ENOENT' });
    await assert.rejects(readFile(join(dist, policy.manifestPath)), { code: 'ENOENT' });
    asset(missing.path, 'missing');
    assert.equal((await prepare(dist)).manifest.current.length, 1);
    await assert.rejects(prepare(dist), /already prepared/);

    const nested = entry('_astro/occupied/old.js', 'nested');
    manifest([first, nested]);
    asset(nested.path, 'nested');
    const conflict = await build({ '_astro/occupied': 'current file' });
    await assert.rejects(prepare(conflict), { code: 'EEXIST' });
    await assert.rejects(prepare(conflict), /already prepared/);
    assert.equal(await readFile(join(conflict, '_astro/occupied'), 'utf8'), 'current file');
  });

  await test('combined outgoing manifest rejects overflow before writes and accepts the exact boundary', async () => {
    const old = entry('_astro/retired.js', 'retired');
    manifest([old]);
    asset(old.path, 'retired');
    const files = Object.fromEntries(Array.from({ length: 4096 }, (_, index) => [`_astro/current-${index}.js`, `export default ${index};`]));
    const dist = await build(files);
    await assert.rejects(prepare(dist), /Invalid previous cache manifest/);
    await assert.rejects(readFile(join(dist, policy.manifestPath)), { code: 'ENOENT' });
    await assert.rejects(readFile(join(dist, old.path)), { code: 'ENOENT' });
    assert.equal(await readFile(join(dist, '_astro/current-0.js'), 'utf8'), files['_astro/current-0.js']);

    await rm(join(dist, '_astro/current-4095.js'));
    const result = await prepare(dist);
    assert.equal(result.manifest.current.length, 4095);
    assert.equal(result.manifest.retired.length, 1);
    assert.equal(await readFile(join(dist, old.path), 'utf8'), 'retired');
    assert.deepEqual(JSON.parse(await readFile(join(dist, policy.manifestPath), 'utf8')), result.manifest);
  });

  await test('untrusted manifest paths, duplicate entries, digests and timestamps are rejected', async () => {
    for (const path of ['../escape.js', '_astro/../escape.js', '_astro\\escape.js', '/_astro/escape.js', '_astro/%2e%2e/escape.js', 'mfcp/LICENSE.txt']) {
      manifest([{ path, sha256: '0'.repeat(64) }]);
      await assert.rejects(prepare(await build()), /Unsafe resource path|outside retained assets/);
    }
    manifest([{ path: '_astro/x.js', sha256: 'not-a-digest' }]);
    await assert.rejects(prepare(await build()), /Invalid previous cache manifest entry/);
    const same = entry('_astro/x.js', 'x');
    manifest([same, same]);
    await assert.rejects(prepare(await build()), /duplicate manifest path/);
    manifest([], [], now + 1);
    await assert.rejects(prepare(await build()), /Invalid previous cache manifest/);
    manifest([], [{ ...same, expiresAt: now + policy.retainedAssetSeconds + 1 }]);
    await assert.rejects(prepare(await build()), /Invalid previous cache manifest entry/);
  });

  await test('symlinked output cannot redirect retained writes outside dist', async () => {
    const dist = await build();
    const outside = join(temporary, 'outside');
    await mkdir(outside);
    await symlink(outside, join(dist, 'redirect'));
    manifest();
    await assert.rejects(prepare(dist), /Symlink in build/);
  });

  await test('server failures and redirects outside origin/base fail closed', async () => {
    routes.set(base, { status: 503, body: 'Unavailable' });
    await assert.rejects(prepare(await build()), /HTTP 503/);
    html();
    for (const location of ['https://example.com/private', '/outside/', `${origin}/company-website/%2fprivate`]) {
      routes.set(base + policy.manifestPath, { status: 302, headers: { Location: location } });
      await assert.rejects(prepare(await build()), /Unsafe previous release redirect|Unsafe published URL/);
    }
    routes.set(base + policy.manifestPath, { status: 302, headers: { Location: `${base}${policy.manifestPath}` } });
    await assert.rejects(prepare(await build()), /redirect limit/);
    routes.set(base + policy.manifestPath, { status: 302, headers: { Location: `${base}manifest.json` } });
    routes.set(base + 'manifest.json', { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: 1, preparedAt: now, revision: 'redirected', current: [], retired: [] }) });
    assert.equal((await prepare(await build())).manifest.retired.length, 0);
  });

  await test('published HTML freshness must be explicitly bounded, including stale windows', async () => {
    manifest();
    for (const control of ['', 'public', 'max-age=31536000', 'max-age=600, stale-while-revalidate=1', 's-maxage=601', 'max-age=oops', 'max-age=1, max-age=2']) {
      html('', '', control);
      await assert.rejects(prepare(await build()), /freshness/);
    }
    for (const control of ['max-age=300, stale-while-revalidate=300', 'max-age=600, must-revalidate', 's-maxage=600', 'no-store', 'no-cache']) {
      html('', '', control);
      assert.equal((await prepare(await build())).manifest.retired.length, 0);
    }
  });
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  await rm(temporary, { recursive: true, force: true });
}
