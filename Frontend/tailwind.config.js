/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html", 
    "./js/scripts.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark-brown": "#1a0200ee",
        "custom-light-brown": "#594636",
        "custom-very-light-brown": "#d5bdaec7",
        "custom-orange": "#F2A007",
        "custom-text-light": "#AEBABF",
        "custom-text-dark": "#0D0202",
      },
    },
  },
  plugins: [
    
    require('@tailwindcss/aspect-ratio'),
  ],
}

  