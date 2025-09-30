// pages/_app.tsx
// Point d'entrée de l'application avec injection de styles Tailwind CSS critiques.

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

// Importation du fichier CSS pour la base et la configuration de Tailwind (même s'il est ignoré, il est nécessaire)
import '../styles/globals.css'; 


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>CV Expert AI</title>
        {/* INJECTION STATIQUE DU STYLE CRITIQUE POUR LA COMPATIBILITÉ VERCEL */}
        <style>{`
          /* BASE COLORS & FONT (Répétition pour garantir la lecture par le navigateur) */
          body {
            background-color: #0D1B2A !important; 
            color: #E5E7EB !important; /* gray-200 */
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* CLASSES TAILWIND CRITIQUES (Sélectionnées pour le header et la page d'accueil) */
          .bg-\\[\\#0D1B2A\\] { background-color: #0D1B2A; }
          .bg-\\[\\#1A2A3A\\] { background-color: #1A2A3A; }
          .text-white { color: #ffffff; }
          .text-gray-100 { color: #f3f4f6; }
          .text-gray-300 { color: #d1d5db; }
          .text-gray-400 { color: #9ca3af; }
          .text-cyan-400 { color: #22d3ee; }
          .text-indigo-600 { color: #4f46e5; }
          .hover\\:bg-indigo-700:hover { background-color: #4338ca; }
          .bg-indigo-600 { background-color: #4f46e5; }
          .border-gray-700 { border-color: #374151; }
          .rounded-xl { border-radius: 0.75rem; }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }

          /* Layout & Flex */
          .flex { display: flex; }
          .justify-center { justify-content: center; }
          .items-center { align-items: center; }
          .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
          .w-full { width: 100%; }
          .mx-auto { margin-left: auto; margin-right: auto; }

          /* Typography */
          .text-5xl { font-size: 3rem; line-height: 1; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .font-extrabold { font-weight: 800; }
          .px-8 { padding-left: 2rem; padding-right: 2rem; }
          .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        `}</style>
      </Head>
      <div className="min-h-screen font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}