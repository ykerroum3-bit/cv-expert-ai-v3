// pages/fonctionnement.tsx
// Page expliquant le fonctionnement du service étape par étape

import React from 'react';
import Navbar from '../components/Navbar';
import { ChevronRight, FileText, Camera, Zap, Download } from 'lucide-react';

const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-white mb-12 text-center";

// Définition de l'interface pour les données d'une étape
interface Step {
    title: string;
    description: string;
    icon: React.ElementType;
}

// Définition de l'interface pour les props du StepCard
interface StepCardProps {
    step: Step;
    index: number;
}

// Liste des étapes
const steps: Step[] = [
    {
        title: "1. Saisie de vos Informations",
        description: "Remplissez le formulaire guidé avec vos expériences professionnelles, formations, compétences et objectifs. C'est la seule étape manuelle.",
        icon: FileText
    },
    {
        title: "2. Choix du Modèle & Style",
        description: "Sélectionnez si vous souhaitez un CV adapté aux normes suisses ou aux normes françaises. Cette sélection guide l'algorithme d'IA.",
        icon: Zap
    },
    {
        title: "3. Analyse Photo (Optionnel)",
        description: "Uploadez votre photo de candidature. Notre IA de vision analyse le cadrage, la luminosité et la tenue pour vous donner une note professionnelle.",
        icon: Camera
    },
    {
        title: "4. Génération du Contenu AI",
        description: "L'IA utilise les mots-clés de votre saisie pour rédiger des descriptions percutantes et optimise votre objectif professionnel. Ceci est la phase clé de l'expertise.",
        icon: Zap
    },
    {
        title: "5. Mise en Page & Téléchargement",
        description: "Visualisez le CV final mis en page selon les standards choisis. Téléchargez-le en PDF ou Word depuis votre tableau de bord.",
        icon: Download
    },
];

// Composant pour une étape
const StepCard: React.FC<StepCardProps> = ({ step, index }) => (
    <div className="flex flex-col md:flex-row bg-[#1A2A3A] p-6 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-600 transition duration-300">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 border-2 border-indigo-600 mb-4 md:mb-0 md:mr-6">
            <span className="text-xl font-bold text-white">{index + 1}</span>
        </div>
        <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
        </div>
    </div>
);


// Composant de la page
export default function FonctionnementPage() {
    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <h1 className={sectionTitleStyle}>Comment Ça Marche ?</h1>
                
                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center text-gray-400">
                    <p className="text-lg font-semibold text-cyan-400">Prêt à commencer ?</p>
                    <a href="/create-cv" className="inline-flex items-center mt-3 px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
                        Créer mon CV
                        <ChevronRight size={20} className="ml-2" />
                    </a>
                </div>
            </main>
        </div>
    );
}
