// pages/index.tsx

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Sparkles, FileText, Camera, ShieldCheck } from 'lucide-react';

const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-textPrimary mb-12 text-center";

// Composant pour les cartes de fonctionnalités
const FeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
  <div className="card hover:shadow-xl transform hover:scale-[1.02] transition duration-300 text-textPrimary border border-gray-200">
    <Icon className="h-8 w-8 text-accent mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-textSecondary">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen text-textPrimary pt-16">
      <Navbar />

      {/* Section Héro */}
      <section className="text-center max-w-4xl mx-auto py-16 md:py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-textPrimary">
          Votre CV Pro, <span className="text-accent">Généré par l'IA</span>.
        </h1>
        <p className="mt-4 text-xl text-textSecondary max-w-3xl mx-auto">
          CV Expert AI est le premier service à générer des CVs optimisés aux formats suisse ou français, et à analyser votre photo de candidature pour maximiser vos chances de succès.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/create-cv" className="button-primary w-full sm:w-auto flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Créer mon CV Maintenant</span>
          </Link>
          <Link href="/fonctionnement" className="button-secondary w-full sm:w-auto">
            Voir Comment Ça Marche
          </Link>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="mt-16 w-full max-w-7xl mx-auto px-4">
        <h2 className={sectionTitleStyle}>
          Pourquoi Choisir CV Expert AI ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={FileText}
            title="Génération AI Spécifique"
            description="Obtenez un contenu de CV parfait, optimisé pour les standards de recrutement suisses ou français. Fini les phrases passe-partout."
          />
          <FeatureCard
            icon={Camera}
            title="Analyse de Photo par Vision AI"
            description="Recevez un rapport détaillé sur le cadrage, l'arrière-plan, la luminosité, et la tenue de votre photo."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Conformité et Sécurité"
            description="Vos données sont traitées selon les normes RGPD et LPD (Suisse). Sécurité maximale de vos informations personnelles."
          />
        </div>
      </section>

      {/* Section Tarifs (CTA) */}
      <section className="mt-20 w-full max-w-4xl mx-auto card text-center">
        <h2 className="text-3xl font-bold text-textPrimary mb-4">
          Démarrez Gratuitement
        </h2>
        <p className="text-lg text-textSecondary mb-6">
          Testez notre service avec le plan gratuit ou passez au Premium pour un accès illimité à toutes les fonctionnalités d'IA.
        </p>
        <Link href="/tarifs" className="button-primary w-full sm:w-auto inline-block">
          Voir les Plans Tarifs
        </Link>
      </section>
    </div>
  );
}
