import { defineConfig } from 'astro/config';
import astrotation from 'astrotation';

export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.SITE_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [astrotation()],
});
