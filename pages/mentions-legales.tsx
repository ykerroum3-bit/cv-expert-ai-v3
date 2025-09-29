// pages/mentions-legales.tsx
// Page d'information légale obligatoire.

import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <div className="bg-[#0D1B2A] min-h-screen pt-16 text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">
          Mentions Légales
        </h1>
        
        <div className="space-y-8 text-gray-300">
          {/* 1. Identification de l'éditeur */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">1. Identification de l'Éditeur du Site</h2>
            <p>Le présent site est édité par :</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li><strong>Nom de l'entreprise :</strong> [Votre Nom ou Nom de l'Entreprise]</li>
              <li><strong>Forme juridique :</strong> [SARL, SA, Entrepreneur individuel, etc.]</li>
              <li><strong>Siège social :</strong> [Votre adresse complète]</li>
              <li><strong>Email :</strong> [Votre email de contact]</li>
              <li><strong>Téléphone :</strong> [Votre numéro de téléphone]</li>
              <li><strong>Numéro d'immatriculation (SIRET/RC) :</strong> [Votre numéro d'immatriculation]</li>
            </ul>
            <p className="mt-3 text-sm text-red-400">
                <strong>// TODO :</strong> Veuillez remplacer toutes les informations ci-dessus par vos données légales réelles.
            </p>
          </div>

          {/* 2. Hébergement */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">2. Hébergement du Site</h2>
            <p>Le site est hébergé par :</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li><strong>Hébergeur :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
              <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">https://vercel.com</a></li>
            </ul>
          </div>

          {/* 3. Propriété Intellectuelle */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">3. Propriété Intellectuelle</h2>
            <p>L'ensemble de ce site (contenu et présentation) constitue une œuvre protégée par la législation en vigueur sur la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
            <p className="mt-2">Toute reproduction, distribution ou modification des contenus du site, sans autorisation préalable écrite, est strictement interdite.</p>
          </div>

          {/* 4. Limitation de responsabilité */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">4. Limitation de responsabilité</h2>
            <p>L'éditeur ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site. L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.</p>
            <p className="mt-2 text-sm italic">Le contenu généré par l'IA est fourni à titre indicatif et ne saurait engager la responsabilité de l'éditeur quant à son exactitude ou son adéquation à un usage spécifique.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
