import { defineMiddleware } from 'astro:middleware';
import { cachePolicy } from './config/cache';

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (
    import.meta.env.DEV &&
    (response.headers.get('Content-Type')?.startsWith('text/html') || response.status >= 400)
  ) {
    response.headers.set('Cache-Control', cachePolicy.development.cacheControl);
  }
  return response;
});
