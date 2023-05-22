/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
// https://css-tricks.com/snippets/css/system-font-stack/
const systemFontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,css}'
  ],
  theme: {
    fontFamily: {
      primary: `Jost, ${systemFontStack}`,
      secondary: `Source Sans Pro, ${systemFontStack}`,
    },
    extend: {
      colors: {
        primary: '#9D54BF',
        primaryBg: '#F5E8FC',
        primaryLight: '#FCF8FE',
        dark: '#222122',
        lightGray: '#9B9B9B',
        light: '#DCDCDC',
        white: '#FFFFFF',
        appBg: '#FBFBFB',
        transparent: 'transparent',
        red: {
          500: 'red',
        },
        lighten: '#E2E5E6',
        lightBlue: '#EFF5F8',
      },
      width: {
        container: '80vw',
        wideContainer: 'calc(100% - 4rem)',
        narrowContainer: '60vw',
      },
      zIndex: {
        '-1': '-1',
        99999: 99999,
      },
      spacing: {
        navbarHeight: 'var(--navbar-height)',
        filtersRowHeight: 'var(--filters-row-height)',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      backgroundColor: ['even'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
  ],
};
