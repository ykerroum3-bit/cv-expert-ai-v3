import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D1B2A] text-gray-400 border-t border-gray-700 py-6 text-center text-sm mt-auto">
      <div className="container mx-auto max-w-7xl px-4">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} CV Expert AI. Tous droits réservés.
        </p>
        <div className="space-x-4">
          <Link href="/mentions-legales" className="hover:text-white transition-colors duration-150">
            Mentions Légales
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/politique-confidentialite" className="hover:text-white transition-colors duration-150">
            Politique de Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}