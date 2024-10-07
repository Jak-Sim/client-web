import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#FF6700',
        secondary: '#FF8A3B',
        tertiary: '#FF9700',
        surface: {
          dark: '#1C1C1E',
          light: '#F2F2F7',
        },
        text: {
          dark: '#030303',
          light: '#FFFFFF',
        },
        error: {
          dark: '#EB4732',
          light: '#EB4732',
        },
        submit: {
          dark: '#30D158',
          light: '#49C055',
        },
        grayscale: {
          100: '#F6F6F6',
          200: '#E2E2E2',
          300: '#969696',
          400: '#2E2E2E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
