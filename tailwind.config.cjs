/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        darkPurple: "#191739",
        darkGrey: "#8C8C9C",
        offWhite: "#e4e4ff",
        transparent: "#00000059",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "868px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
