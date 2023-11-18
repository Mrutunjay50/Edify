/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      'roboto' : ["sans-serif", 'Roboto Condensed'],
      'playpen' : ["Playpen Sans", "cursive"]
    },
    extend: {
      colors: {

      },
      screens: {
        xs: "420px"
      }
    }
  },
  plugins: [],
};