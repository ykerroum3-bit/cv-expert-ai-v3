// pages/_app.tsx
// Ce fichier est le point d'entrée de votre application Next.js.
// Il applique les styles globaux et le système d'authentification.

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// C'est LA LIGNE CRUCIALE pour les styles.
// Elle dit à Next.js : "Charge le fichier de styles pour tout le site."
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // SessionProvider rend la session utilisateur disponible sur toutes les pages
    <SessionProvider session={session}>
      {/* Ce conteneur applique les styles de base du thème sombre */}
      <div className="min-h-screen font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}