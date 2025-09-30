// pages/_app.tsx
import '../styles/globals.css'; // IMPORTANT : import Tailwind
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>CV Expert AI</title>
      </Head>
      <div className="min-h-screen bg-background text-textPrimary font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
