/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        buttonColor: {
          main: "#019863",
          hover: "#01CB84"
        },
      }
    },
  },
  plugins: [],
}

