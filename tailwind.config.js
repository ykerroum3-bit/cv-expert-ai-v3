/** @type {import('tailwindcss').Config} */
module.exports = {
  // Indique à Tailwind où trouver les classes utilisées (pages et composants)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
