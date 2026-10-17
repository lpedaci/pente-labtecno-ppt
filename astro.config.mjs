// @ts-check
import { defineConfig } from 'astro/config';

// Para publicar en GitHub Pages bajo un subdirectorio: BASE_PATH=/nombre-del-repo npm run build
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  site: process.env.SITE_URL || undefined,
  build: { inlineStylesheets: 'auto' },
});
