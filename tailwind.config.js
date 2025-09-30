/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
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
```eof

---

#### 2. Fichier `postcss.config.js` (Le Compilateur)

Ce fichier dit à Next.js **comment compiler** Tailwind CSS. Il doit être à la **racine** de votre projet.

```javascript:PostCSS Config:postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```eof

---

#### 3. Fichier `styles/globals.css` (L'Activateur)

Ce fichier importe les styles de base de Tailwind pour tout le site. Il est dans le dossier **`styles`**.

```css:Global Styles:styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0D1B2A; 
  color: #f3f4f6; 
  min-height: 100vh;
}
```eof

---

#### 4. Fichier `pages/_app.tsx` (L'Importateur)

Ce fichier est le point d'entrée qui lit le `globals.css`. Il doit être dans le dossier **`pages`**.

```typescript:Main App Layout:pages/_app.tsx
// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// L'importation des styles globaux est cruciale
import '../styles/globals.css'; 

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}