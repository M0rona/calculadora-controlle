import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gentleSky': '#EEF2F8',
        'graphite': '#32323E',
        'primary-blue': '#3133FF',
        'lines': '#CECED8'
      },

      fontSize: {
        'h1': '2.375rem',
        'h2': '1.063rem',
        'h1-medium': '1.375rem'
      },

      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [],
};
export default config;
