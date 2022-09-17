/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "470px",
      },
      gridTemplateColumns: {
        fill: "repeat(auto-fill, minmax(73px, 1fr))",
      },
      boxShadow: {
        md: "0 2px 10px rgba(0, 0, 0, 0.07)",
        lg: "0 5px 15px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "pop-up": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        hide: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.9)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(2rem)" },
        },
        "slide-from-top": {
          "0%": { opacity: 0, transform: "translateY(-2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-to-top": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-2rem)" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms",
        "fade-out": "fade-out 150ms",
        "pop-up": "pop-up 150ms",
        hide: "hide 150ms",
        "slide-up": "slide-up 150ms",
        "slide-down": "slide-down 150ms",
        "slide-from-top": "slide-from-top 150ms",
        "slide-to-top": "slide-to-top 150ms",
      },
    },
  },
  plugins: [],
};
