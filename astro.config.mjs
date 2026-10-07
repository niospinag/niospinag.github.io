// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

/**
 * Public URL of the site.
 * -> For a custom domain set it in the repo: Settings > Secrets and variables > Actions
 *    as `SITE_URL`, or just replace the fallback below.
 * -> For a project page (https://<user>.github.io/<repo>) the fallback works as-is.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://niospinag.github.io';

/**
 * `base` is derived from the URL pathname so the same build works both on a
 * custom domain (`/`) and on a GitHub *project* page (`/<repo>/`).
 * The deploy workflow feeds `SITE_URL` from `actions/configure-pages`.
 */
const BASE = new URL(SITE_URL).pathname.replace(/\/+$/, '') || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE,

  // Static output = the whole site is prerendered at build time (GitHub Pages ready).
  output: 'static',
  trailingSlash: 'ignore',

  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],

  // Astro dev toolbar adds a floating widget + extra client JS we don't want.
  devToolbar: { enabled: false },

  build: {
    // Inline small stylesheets -> fewer round trips, better Lighthouse on Pages.
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    // Tailwind CSS v4 is wired through its own Vite plugin (no PostCSS config needed).
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 4096,
      // The model-viewer + WebGL runtime is intentionally a separate lazy chunk.
      chunkSizeWarningLimit: 1200,
    },
    optimizeDeps: {
      exclude: ['@google/model-viewer'],
    },
  },
});
