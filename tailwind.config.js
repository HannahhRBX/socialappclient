/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
     
      "blue": "#1fb6ff",
      "purple": "#7e5bef",
      "pink": "#ff49db",
      "orange": "#ff7849",
      "green": "#13ce66",
      "yellow": "#ffc82c",
      "gray-dark": "#273444",
      "gray": "#8492a6",
      "gray-light": "#d3dce6",
      
      bgColor: "rgb(var(--color-bg) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      blue: "rgb(var(--color-blue) / <alpha-value>)",
      white: "rgb(var(--color-white) / <alpha-value>)",
      ascent: {
        1: "rgb(var(--color-ascent1) / <alpha-value>)",
        2: "rgb(var(--color-ascent2) / <alpha-value>)",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {},
  },
  plugins: [],
};