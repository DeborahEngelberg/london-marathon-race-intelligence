import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#E41E31',
          light: '#FF4D5E',
          dark: '#C11A2A',
        },
        'accent-red': '#E41E31',
        surface: {
          light: '#F5F5F5',
          DEFAULT: '#EAEAEF',
          dark: '#1A1A1A',
          darker: '#111111',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
