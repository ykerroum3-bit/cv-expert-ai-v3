// pages/tarifs.tsx
// Page des tarifs, présentation des plans et simulation de l'intégration Stripe.

import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Check, X, Star, Gift, Shield } from 'lucide-react';
import { useRouter } from 'next/router';

const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-white mb-12 text-center";

const PlanFeature: React.FC<{ children: React.ReactNode, included: boolean }> = ({ children, included }) => (
    <li className="flex items-start space-x-3 text-lg">
        {included ? (
            <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
        ) : (
            <X size={20} className="text-gray-500 flex-shrink-0 mt-1" />
        )}
        <span className={included ? 'text-gray-200' : 'text-gray-500 line-through'}>{children}</span>
    </li>
);

interface Plan {
    name: string;
    price: string;
    description: string;
    link: string;
    isPremium: boolean;
    features: { text: string, included: boolean }[];
}

const plans: Plan[] = [
    {
        name: "Essai Gratuit",
        price: "0 CHF/mois",
        description: "Testez l'essentiel de CV Expert AI sans engagement.",
        link: "/login?signup=true",
        isPremium: false,
        features: [
            { text: "1 Génération de CV (Contenu AI limité)", included: true },
            { text: "1 Analyse de Photo (Rapport de base)", included: true },
            { text: "Mise en page PDF standard", included: true },
            { text: "Téléchargement sans filigrane", included: false },
            { text: "Support prioritaire", included: false },
        ]
    },
    {
        name: "Premium",
        price: "19 CHF/mois",
        description: "Accès illimité à toute la puissance de l'IA pour maximiser votre candidature.",
        link: "/api/subscribe-stripe", // Endpoint simulé pour l'abonnement
        isPremium: true,
        features: [
            { text: "Générations de CV illimitées", included: true },
            { text: "Analyses de Photos illimitées (Rapport détaillé)", included: true },
            { text: "Modèles de CVs premium (Suisse & France)", included: true },
            { text: "Téléchargement PDF & Word sans filigrane", included: true },
            { text: "Support prioritaire par email", included: true },
        ]
    },
];


// Composant de la page
export default function TarifsPage() {
    const router = useRouter();

    const handleSubscribe = async (plan: Plan) => {
        if (!plan.isPremium) {
            router.push(plan.link);
            return;
        }

        // SIMULATION STRIPE - Le lien doit mener à une API Route
        alert(`Début de l'abonnement au plan ${plan.name} (19 CHF/mois). Redirection vers Stripe...`);
        
        // TODO: Insérer ici le code pour créer une session Stripe Checkout
        // Utilisez process.env.STRIPE_SECRET_KEY et NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        
        // Exemple de redirection simulée
        window.location.href = `https://checkout.stripe.com/pay-simulated?plan=${plan.name}`;
    };

    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <h1 className={sectionTitleStyle}>Choisissez votre Plan d'Expertise</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`bg-[#1A2A3A] p-8 rounded-3xl shadow-xl flex flex-col justify-between ${plan.isPremium ? 'border-4 border-cyan-500' : 'border border-gray-700'}`}>
                            <header>
                                <h2 className="text-3xl font-extrabold flex items-center space-x-2">
                                    {plan.isPremium && <Star size={24} className="text-yellow-400" />}
                                    <span className="text-white">{plan.name}</span>
                                </h2>
                                <p className="text-4xl font-bold mt-4 mb-2 text-cyan-400">{plan.price}</p>
                                <p className="text-gray-400 mb-6">{plan.description}</p>
                            </header>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <PlanFeature key={index} included={feature.included}>{feature.text}</PlanFeature>
                                ))}
                            </ul>

                            <footer>
                                {plan.isPremium ? (
                                    <button 
                                        onClick={() => handleSubscribe(plan)}
                                        className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-base font-medium rounded-xl shadow-sm text-white hover:bg-indigo-700 transition duration-300"
                                    >
                                        <Shield size={20} className="mr-2" />
                                        Passer au Premium
                                    </button>
                                ) : (
                                    // CORRECTION FINALE : S'assurer que le lien est une string valide
                                    <Link 
                                        href={plan.link} 
                                        className="w-full flex items-center justify-center px-6 py-3 border-2 border-cyan-400 text-base font-medium rounded-xl shadow-sm text-cyan-400 hover:bg-cyan-900 transition duration-300"
                                    >
                                        <Gift className="w-5 h-5 mr-2" />
                                        Commencer l'Essai Gratuit
                                    </Link>
                                )}
                            </footer>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center text-gray-400">
                    <p>*Annulation possible à tout moment. Paiement sécurisé par Stripe.</p>
                </div>
            </main>
        </div>
    );
}