// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// Importe les styles globaux (Tailwind CSS) pour toute l'application
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // SessionProvider rend la session utilisateur disponible sur toutes les pages
    <SessionProvider session={session}>
      {/* Le conteneur principal applique un style de fond et une police de base */}
      <div className="min-h-screen bg-[#0D1B2A] font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}