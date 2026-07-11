/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-bg': "#8ECAE6",
        'theme-text': "#023047",
        'theme-primary': "#219EBC",
        'theme-secondary': "#FFB703",
        'theme-accent': "#FB8500"
      }
    },
  },
  plugins: [],
}