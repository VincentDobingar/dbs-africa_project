/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dbsOrange: "#FF6A00",
        dbsDark: "#0B0B0B",
        dbsGray: "#1F2937",
        dbsLight: "#F5F7FA",
        dbsBlue: "#00B8D9",
      },
      fontFamily: {
        heading: ["Poppins", "Montserrat", "sans-serif"],
        body: ["Inter", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};