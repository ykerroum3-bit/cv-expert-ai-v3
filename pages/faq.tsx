// pages/faq.tsx
// Page des questions fréquemment posées (FAQ)

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ChevronDown, HelpCircle } from 'lucide-react';

const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-white mb-8 text-center";

// Définition de l'interface pour les props du FAQItem
interface FAQItemProps {
    question: string;
    answer: string;
}

// Composant pour un élément de la FAQ
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-700 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:border-cyan-500/50">
            <button
                className="w-full text-left flex justify-between items-center p-5 text-lg font-semibold text-white bg-[#1A2A3A] hover:bg-gray-800 focus:outline-none transition duration-150"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center space-x-3">
                    <HelpCircle size={20} className="text-cyan-400" />
                    <span>{question}</span>
                </span>
                <ChevronDown size={20} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-gray-400'}`} />
            </button>
            {isOpen && (
                <div className="p-5 bg-gray-800 text-gray-300 transition-all duration-300">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

// Liste des questions/réponses
const faqData: FAQItemProps[] = [
    {
        question: "Le CV généré est-il adapté aux normes suisses et françaises ?",
        answer: "Oui, notre IA a été entraînée spécifiquement sur des corpus de CVs provenant de cabinets de recrutement suisses (LPD) et français (RGPD), assurant une conformité totale au format, au contenu, et aux attentes locales (mise en page, sections obligatoires, etc.)."
    },
    {
        question: "Comment l'IA analyse-t-elle ma photo de candidature ?",
        answer: "L'IA utilise des algorithmes de vision pour évaluer quatre critères clés : le cadrage (proportion du visage/corps), le fond (neutralité, absence d'éléments distrayants), la luminosité (ombres, exposition), et la tenue (professionnalisme). Vous recevez une note globale et un rapport détaillé."
    },
    {
        question: "Est-ce que mes données personnelles sont sécurisées ?",
        answer: "Absolument. Nous respectons strictement les réglementations RGPD (Europe) et LPD (Suisse). Toutes les données, y compris les photos et le contenu des CVs, sont stockées de manière sécurisée et ne sont utilisées que pour la fourniture du service."
    },
    {
        question: "Puis-je modifier le CV généré par l'IA ?",
        answer: "Oui. Le contenu généré par l'IA est fourni en texte brut (avant la mise en page PDF) et est toujours éditable. Vous pouvez ajuster les phrases ou ajouter des détails manuellement depuis votre tableau de bord."
    },
    {
        question: "Quel est l'avantage du plan Premium ?",
        answer: "Le plan Premium offre un nombre illimité de générations de CVs et d'analyses de photos, l'accès à des modèles de CVs avancés, et des options de téléchargement aux formats PDF et Word sans filigrane."
    },
    {
        question: "Comment puis-je passer de l'essai gratuit au plan Premium ?",
        answer: "Vous pouvez vous abonner au plan Premium via la page Tarifs. Le paiement est géré par notre partenaire sécurisé, Stripe. Vous aurez accès aux fonctionnalités Premium immédiatement après la confirmation du paiement."
    },
    {
        question: "Dois-je installer un logiciel pour créer mon CV ?",
        answer: "Non. CV Expert AI est une application web (SaaS) entièrement en ligne. Vous pouvez créer, analyser et télécharger votre CV depuis n'importe quel navigateur (ordinateur, tablette ou mobile)."
    },
];

// Composant de la page
export default function FAQPage() {
    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-3xl mx-auto p-4 md:p-8">
                <h1 className={sectionTitleStyle}>Questions Fréquemment Posées</h1>
                
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
                
                <div className="mt-12 text-center text-gray-400">
                    <p>Vous n'avez pas trouvé votre réponse ? <a href="/contact" className="text-cyan-400 hover:text-cyan-300 font-medium transition duration-150">Contactez notre support.</a></p>
                </div>
            </main>
        </div>
    );
}