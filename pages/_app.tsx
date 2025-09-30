// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
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