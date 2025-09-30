/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',    // fond général clair
        card: '#FFFFFF',          // cartes blanches
        accent: '#1E88E5',        // bleu pour boutons et highlights
        highlight: '#0ABAB5',     // cyan pour accents secondaires
        textPrimary: '#111827',   // texte principal sombre
        textSecondary: '#6B7280', // texte secondaire gris
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',               // arrondis doux pour cartes et boutons
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.05)', // ombre légère type Material
      },
    },
  },
  plugins: [],
};
