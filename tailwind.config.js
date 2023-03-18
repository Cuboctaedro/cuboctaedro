const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-franklin)', ...fontFamily.sans],
      },
      spacing: {
        'container-1': '20rem', // 320px
        'container-2': '40rem', // 640 px
        'container-3': '60rem', // 960 px
        'container-4': '80rem', // 1280 px
        'container-5': '100rem', // 1600 px
      }
    },
  },
  plugins: [],
}
