export function withBase(path: string, base = import.meta.env.BASE_URL): string {
  if (base === '/' || !path.startsWith('/') || path.startsWith('//')) return path;

  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (
    path === prefix ||
    path.startsWith(`${prefix}/`) ||
    path.startsWith(`${prefix}?`) ||
    path.startsWith(`${prefix}#`)
  ) return path;

  return `${prefix}${path}`;
}
