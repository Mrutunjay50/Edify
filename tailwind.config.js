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
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '768px',
        // => @media (min-width: 1024px) { ... }
      
        'pc' : '940px',
        'desktop': '1024x',
        // => @media (min-width: 1280px) { ... }
      },
    }
  },
  plugins: [],
};

// sm : 640px
// md : 768px
// lg : 1024px