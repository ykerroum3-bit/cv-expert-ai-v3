// pages/_app.tsx
// Ce fichier est le point d'entrée de votre application Next.js.

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>CV Expert AI</title>
        {/*
          Injection du style directement dans le HTML.
          Ceci garantit que le style est toujours appliqué,
          contournant les problèmes de compilation de Vercel.
        */}
        <style>{`
          /* Styles de base pour le thème sombre */
          body {
            background-color: #0D1B2A; 
            color: #f3f4f6; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
          }

          /* Classes Tailwind */
          .bg-blue-night { background-color: #0D1B2A; }
          .text-gray-200 { color: #e5e7eb; }
          .font-sans { font-family: Inter, sans-serif; }
          .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

          /* Couleurs et autres classes utiles */
          .bg-dark-gray { background-color: #1A2A3A; }
          .text-white { color: #ffffff; }
          .text-cyan-400 { color: #22d3ee; }
          .text-gray-400 { color: #9ca3af; }
          .rounded-xl { border-radius: 0.75rem; }
          .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
          .p-6 { padding: 1.5rem; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .flex-col { flex-direction: column; }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
        `}</style>
      </Head>
      <div className="min-h-screen font-sans antialiased bg-blue-night text-gray-200">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}