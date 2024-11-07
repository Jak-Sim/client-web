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
        primary: '#FF7A32',
        secondary: '#2B67FA',
        tertiary: '#F56060',
        gradation:'#2B67FA',
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
        textPrimary:'#FFFBFA',
        grayscale: {
          50:'#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#BAC0C7',
          600: '#858B90',
          700: '#686C70',
          800: '#4D5155',
          900: '#303235',
        },
      },
    },
  },
  plugins: [],
};
export default config;
