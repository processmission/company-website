import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cachePolicy } from '../config/cache.ts';

// HTTP checks require an explicitly supplied, already-running local dev server.
// Without a URL this file is safe to include in Node's default test discovery.
if (process.argv[2]) {
  const base = new URL(process.argv[2]);
  assert.ok(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP server URL');
  assert.equal(base.search, '', 'Server URL must not contain a query');
  assert.equal(base.hash, '', 'Server URL must not contain a fragment');
  if (!base.pathname.endsWith('/')) base.pathname += '/';

  const root = fileURLToPath(new URL('../../', import.meta.url));
  const cacheRoot = join(root, '.npm-cache');
  await mkdir(cacheRoot, { recursive: true });
  const fixtureRoot = await mkdtemp(join(cacheRoot, 'cache-http-'));
  const fixture = join(fixtureRoot, 'probe.svg');
  const svg = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32"><rect width="64" height="32" fill="${fill}"/></svg>`;
  const endpoint = new URL(cachePolicy.development.imageRoute.replace(/^\//, ''), base);
  const image = new URL(endpoint);
  image.search = new URLSearchParams({ href: `/@fs${fixture}`, w: '64', h: '32', f: 'svg' }).toString();

  async function request(url, headers = {}) {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
    const body = Buffer.from(await response.arrayBuffer());
    return { response, body };
  }

  function assertNoStore(response) {
    const directives = (response.headers.get('cache-control') ?? '').toLowerCase().split(',').map((value) => value.trim());
    assert.ok(directives.includes('no-store'), `Expected no-store: ${response.url}`);
  }

  try {
    const html = await request(base, { Accept: 'text/html' });
    assert.equal(html.response.status, 200);
    assert.match(html.response.headers.get('content-type') ?? '', /^text\/html\b/);
    assertNoStore(html.response);

    await writeFile(fixture, svg('#ff0000'));
    const first = await request(image);
    assert.equal(first.response.status, 200);
    assert.match(first.response.headers.get('content-type') ?? '', /^image\/svg\+xml\b/);
    assertNoStore(first.response);
    assert.ok(first.body.length, 'Native image response must contain image bytes');
    const etag = first.response.headers.get('etag');
    assert.ok(etag, 'Native image responses must retain their ETag');

    const repeated = await request(image);
    assert.equal(repeated.response.status, 200);
    assertNoStore(repeated.response);
    assert.equal(repeated.response.headers.get('etag'), etag);
    assert.deepEqual(repeated.body, first.body);

    const conditional = await request(image, { 'If-None-Match': etag });
    assert.ok([200, 304].includes(conditional.response.status));
    assertNoStore(conditional.response);
    assert.equal(conditional.response.headers.get('etag'), etag);
    if (conditional.response.status === 200) assert.deepEqual(conditional.body, first.body);

    await writeFile(fixture, svg('#0000ff'));
    const changed = await request(image, { 'If-None-Match': etag });
    assert.equal(changed.response.status, 200);
    assertNoStore(changed.response);
    assert.ok(changed.body.length, 'Updated native image response must contain image bytes');
    assert.notDeepEqual(changed.body, first.body);
    assert.ok(changed.response.headers.get('etag'));
    assert.notEqual(changed.response.headers.get('etag'), etag);

    const invalid = await request(endpoint);
    assert.equal(invalid.response.status, 400);
    assertNoStore(invalid.response);

    const forbidden = new URL(endpoint);
    forbidden.search = new URLSearchParams({ href: 'https://example.invalid/cache-test.svg', f: 'svg' }).toString();
    const rejected = await request(forbidden);
    assert.equal(rejected.response.status, 403, 'Native remote-image allowlist must remain enforced');
    assertNoStore(rejected.response);

    const missing = await request(new URL(`${fixtureRoot.split('/').at(-1)}-missing/`, base), { Accept: 'text/html' });
    assert.equal(missing.response.status, 404);
    assertNoStore(missing.response);
    console.log(`Development cache HTTP checks passed: ${base}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
} else {
  console.log('Development cache HTTP checks skipped: pass the running server URL as the first argument.');
}
