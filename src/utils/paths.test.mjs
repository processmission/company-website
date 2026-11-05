import assert from 'node:assert/strict';
import { withBase } from './paths.ts';

const base = '/company-website/';
for (const [path, expected] of [
  ['/', '/company-website/'],
  ['/products/os/', '/company-website/products/os/'],
  ['/favicon.svg?v=1#icon', '/company-website/favicon.svg?v=1#icon'],
  ['/?view=all#top', '/company-website/?view=all#top'],
  ['/company-website', '/company-website'],
  ['/company-website/products/', '/company-website/products/'],
  ['/company-website?view=all', '/company-website?view=all'],
  ['/company-website#top', '/company-website#top'],
  ['/company-website-news/', '/company-website/company-website-news/'],
  ['https://example.com/path', 'https://example.com/path'],
  ['//example.com/path', '//example.com/path'],
  ['#details', '#details'],
  ['products/os/', 'products/os/'],
  ['mailto:hello@example.com', 'mailto:hello@example.com'],
  ['', ''],
]) {
  assert.equal(withBase(path, base), expected, path);
  assert.equal(withBase(path, '/'), path, `root base: ${path}`);
  assert.equal(withBase(expected, base), expected, `idempotent: ${path}`);
}
assert.equal(withBase('/products/', '/company-website'), '/company-website/products/');
