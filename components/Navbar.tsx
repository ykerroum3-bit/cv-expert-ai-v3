// components/Navbar.tsx
// Ce composant est la barre de navigation fixe et réactive du site.

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Menu, X, FileText, LayoutDashboard, User, LogOut, DollarSign, BookOpen, HelpCircle, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Fonctionnement', href: '/fonctionnement' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0D1B2A] shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-extrabold text-2xl text-white">
            CV Expert AI
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition duration-150 font-medium">
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition duration-150 font-medium">
                Tableau de bord
              </Link>
            )}
            <Link href={isAuthenticated ? '/create-cv' : '/login'} className="ml-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
              Créer mon CV
            </Link>
            {isAuthenticated ? (
              <button onClick={() => signOut()} className="ml-2 flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white transition duration-150">
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            ) : (
              <Link href="/login" className="ml-2 flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white transition duration-150">
                <User size={16} />
                <span>Connexion</span>
              </Link>
            )}
          </nav>

          {/* Bouton Burger pour Mobile */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Affiché si isMenuOpen est vrai) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#1A2A3A] shadow-xl border-t border-gray-700">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>
                Tableau de bord
              </Link>
            )}
            <div className="pt-2 border-t border-gray-600">
              <Link href={isAuthenticated ? '/create-cv' : '/login'} className="block px-3 py-2 text-center bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700" onClick={() => setIsMenuOpen(false)}>
                Créer mon CV
              </Link>
              {isAuthenticated ? (
                <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700">
                  Déconnexion
                </button>
              ) : (
                <Link href="/login" className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>
                  Connexion / Inscription
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}