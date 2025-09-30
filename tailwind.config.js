/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',       // fond général clair
        card: '#FFFFFF',             // fond cartes
        accent: '#1E88E5',           // bleu boutons / accents
        highlight: '#0ABAB5',        // cyan secondaire
        textPrimary: '#111827',      // texte principal sombre
        textSecondary: '#6B7280',    // texte secondaire gris
        'blue-night': '#0D1B2A',     // optionnel pour ancien code
        'dark-gray': '#1A2A3A',
        'light-blue': '#415A77',
        'accent-cyan': '#00ADB5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',                  // arrondis doux
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
