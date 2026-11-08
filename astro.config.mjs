import { defineConfig } from 'astro/config';
import astrotation from 'astrotation';
import { cachePolicy } from './src/config/cache.ts';

export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.SITE_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [astrotation()],
  image: {
    endpoint: {
      route: cachePolicy.development.imageRoute,
      entrypoint: './src/image-endpoint.ts',
    },
  },
  vite: {
    preview: {
      headers: { 'Cache-Control': cachePolicy.preview.cacheControl },
    },
  },
});
