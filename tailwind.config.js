const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
