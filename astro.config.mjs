// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL и BASE_PATH задаёт workflow деплоя: для GitHub Pages сайт живёт
// в подпапке репозитория, для своего VPS — в корне домена.
const site = process.env.SITE_URL ?? 'https://angrymonkey86101.github.io';
const base = process.env.BASE_PATH ?? '/WebSite-visitcard';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
