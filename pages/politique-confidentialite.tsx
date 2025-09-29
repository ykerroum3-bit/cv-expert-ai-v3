// pages/politique-confidentialite.tsx
// Page d'information légale sur le traitement des données (RGPD/LPD).

import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

// Définit le style des titres de section pour la lisibilité
const subTitleStyle = "text-xl font-bold text-cyan-400 mb-3 mt-6";
const listItemStyle = "list-disc list-inside ml-4 space-y-1 text-gray-400";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-[#0D1B2A] min-h-screen pt-16 text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">
          Politique de Confidentialité
        </h1>
        
        <p className="mb-8 text-lg text-gray-300">
          Cette politique de confidentialité explique comment **CV Expert AI** collecte, utilise et protège vos données personnelles conformément au RGPD (Europe) et à la LPD (Suisse).
        </p>

        {/* 1. Responsable du Traitement */}
        <div>
          <h2 className={subTitleStyle}>1. Identité et Coordonnées du Responsable du Traitement</h2>
          <p className="text-gray-400">
            Le responsable du traitement des données personnelles collectées est : **[Votre Nom ou Nom de l'Entreprise]**.
            Pour toute question concernant cette politique, veuillez nous contacter via notre <Link href="/contact" className="text-indigo-400 hover:underline">page de contact</Link>.
          </p>
          <p className="mt-3 text-sm text-red-400">
            <strong>// TODO :</strong> Veuillez vérifier la conformité de ces informations.
          </p>
        </div>

        {/* 2. Données Collectées */}
        <div>
          <h2 className={subTitleStyle}>2. Données que Nous Collectons</h2>
          <p className="text-gray-400">Nous collectons les types de données suivants pour fournir notre service :</p>
          <ul className={listItemStyle}>
            <li><strong>Données d'identification :</strong> Nom, prénom, adresse e-mail (lors de l'inscription).</li>
            <li><strong>Données de CV :</strong> Expériences professionnelles, diplômes, compétences, objectif professionnel (saisies dans le formulaire).</li>
            <li><strong>Données sensibles (Photo) :</strong> Les photos de candidatures sont traitées par l'IA de Vision pour l'analyse, mais elles ne sont pas partagées avec des tiers et sont supprimées après [Durée/Action].</li>
            <li><strong>Données de navigation :</strong> Adresses IP, type de navigateur, pages consultées.</li>
          </ul>
        </div>

        {/* 3. Finalités du Traitement */}
        <div>
          <h2 className={subTitleStyle}>3. Finalités de l'Utilisation des Données</h2>
          <p className="text-gray-400">Vos données sont utilisées dans le but de :</p>
          <ul className={listItemStyle}>
            <li>Générer et optimiser le contenu de votre CV grâce à l'Intelligence Artificielle.</li>
            <li>Fournir le rapport d'analyse sur votre photo de candidature.</li>
            <li>Gérer votre compte utilisateur et votre abonnement (Stripe).</li>
            <li>Améliorer nos algorithmes d'IA (uniquement avec votre consentement et anonymisation des données).</li>
          </ul>
        </div>

        {/* 4. Partage des Données */}
        <div>
          <h2 className={subTitleStyle}>4. Partage de Vos Informations</h2>
          <p className="text-gray-400">Nous ne partageons vos données qu'avec les entités strictement nécessaires à l'exécution du service :</p>
          <ul className={listItemStyle}>
            <li><strong>Prestataires IA :</strong> Le texte de votre CV et votre photo sont envoyés aux API d'IA (OpenAI/Gemini/Azure) pour la génération/analyse, et sont anonymisés autant que possible.</li>
            <li><strong>Prestataires de paiement :</strong> Les données de paiement sont gérées par Stripe et ne transitent jamais par nos serveurs.</li>
          </ul>
        </div>

        {/* 5. Vos Droits */}
        <div>
          <h2 className={subTitleStyle}>5. Vos Droits (RGPD & LPD)</h2>
          <p className="text-gray-400">Conformément à la législation, vous disposez des droits suivants :</p>
          <ul className={listItemStyle}>
            <li>Droit d'accès (savoir quelles données nous détenons).</li>
            <li>Droit de rectification (corriger des données inexactes).</li>
            <li>Droit à l'effacement (supprimer vos données, y compris les CVs et analyses, depuis votre tableau de bord).</li>
            <li>Droit à la portabilité de vos données.</li>
          </ul>
          <p className="mt-2 text-gray-400">Pour exercer ces droits, veuillez contacter le responsable du traitement à l'adresse indiquée ci-dessus ou utiliser les outils disponibles dans votre tableau de bord.</p>
        </div>
      </main>
    </div>
  );
}