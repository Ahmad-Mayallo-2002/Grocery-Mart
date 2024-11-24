/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redColor: "#ed174a",
        blueColor: "#233a95",
        darkBlueColor: "#0f183a",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
