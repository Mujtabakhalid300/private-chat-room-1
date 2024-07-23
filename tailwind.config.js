/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        blurAnimation: {
          "0%": { filter: "blur(100px)" },
          "100%": { filter: "blur(0px)" }
        }
      },
      animation: {
        blurAnimation: "blurAnimation 1s ease-in-out forwards"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
