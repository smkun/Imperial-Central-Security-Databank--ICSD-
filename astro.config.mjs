// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://32gamers.com',
  base: '/ICSD',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});