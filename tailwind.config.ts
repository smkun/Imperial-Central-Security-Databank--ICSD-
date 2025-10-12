import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ic: {
          bg: '#0A0A0A',
          panel: '#161A1D',
          line: '#23272A',
          alert: '#D93A3A',
          mute: '#9AA0A6',
        },
      },
      fontFamily: {
        body: ['Exo 2', 'sans-serif'],
        label: ['Rajdhani', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      maxWidth: {
        reading: '65ch',
      },
    },
  },
  plugins: [],
} satisfies Config;
