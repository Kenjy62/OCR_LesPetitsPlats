/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'customGray': '#E7E7E7',
        'customBlue': '#3282F7',
        'customGreen': '#68D9A4',
        'customOrange': '#ED6454',
        'customGrayMore': '#C7BEBE'
      }
    },
  },
  plugins: [],
}