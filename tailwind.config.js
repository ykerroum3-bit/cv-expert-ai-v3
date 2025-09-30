/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Chemins classiques pour Next.js (pages et composants)
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Ajout d'une ligne pour la compatibilité avec Vercel et les sous-dossiers
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
