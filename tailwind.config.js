/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chemins d'accès au contenu pour forcer la compilation de toutes les classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ajout pour la sécurité
  ],
  theme: {
    extend: {
      colors: {
        'blue-night': '#0D1B2A',
        'dark-gray': '#1A2A3A',
        'light-blue': '#415A77',
        'accent-cyan': '#00ADB5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
