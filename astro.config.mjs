import { defineConfig } from 'astro/config';
import astrotation from 'astrotation';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  integrations: [astrotation()],
});
