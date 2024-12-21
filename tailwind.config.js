/**
 * @Author: Abdou Lahi DIOP - Copyright © 2023 Abdallah
 * @Creation Date: 2024-12-20 10:38:18
 * @Last Modification Date: 2024-12-20 10:39:12
 * @Modified by: Abdou Lahi DIOP
 * @Description:
 */



/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
      extend: {
          colors: {
              primary: "#131010",
              secondary: "#543A14",
              tertiary: "#F0BB78",
              "black-100": "#181818",
              "black-200": "#090325",
              "white-100": "#FFF0DC",
          },
          boxShadow: {
              card: "0px 35px 120px -15px #211e35",
          },
          screens: {
              xs: "450px",
          },
          backgroundImage: {
              "hero-pattern": "url('/src/assets/herobg.png')",
              "kenross-bg": "url('/src/assets/kenross.jpg')",
          },
      },
  },
  plugins: [],
};
