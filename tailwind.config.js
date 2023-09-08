/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainAppColor: "#818cf8",
        secondAppColor: "#52525b",
        detailsColor: "#79fcf3",
      },
    },
  },
  plugins: [],
};
