import type { APIRoute } from 'astro';
import { GET as devGET } from 'astro/assets/endpoint/dev';
import { GET as genericGET } from 'astro/assets/endpoint/generic';
import { cachePolicy } from './config/cache';

export const GET: APIRoute = async (context) => {
  const response = await (import.meta.env.DEV ? devGET : genericGET)(context);
  if (import.meta.env.DEV) {
    response.headers.set('Cache-Control', cachePolicy.development.cacheControl);
  }
  return response;
};
