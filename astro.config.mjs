// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique (D5) : pages HTML envoyées par FTPS sur LWS.
// Français à la racine, anglais sous /en/ (D7, D8).
export default defineConfig({
  site: 'https://entrepreneuriat.sn',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-SN', en: 'en-GB' } },
    }),
  ],
  devToolbar: { enabled: false },
});
