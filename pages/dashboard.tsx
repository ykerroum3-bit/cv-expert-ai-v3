// pages/dashboard.tsx
// Tableau de bord utilisateur montrant l'historique des CVs et analyses de photos

import React from 'react';
import Navbar from '../components/Navbar';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next'; 
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { FileText, Camera, Trash2, Download, User, DollarSign } from 'lucide-react';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '../lib/prisma';

// Définitions de types pour les données de la page
interface PhotoAnalysis {
    id: string;
    aiReport: { global_score: number; cadrage: string; fond: string; luminosite: string; tenue: string; };
    createdAt: string;
}

interface Cv {
    id: string;
    style: string;
    createdAt: string;
    generatedContent: string;
}

interface DashboardProps {
    user: { id: string; email: string };
    cvs: Cv[];
    analyses: PhotoAnalysis[];
}

// Fonction utilitaire pour la suppression (côté client)
// NOTE: Utilisez des notifications modales à la place d'alert/confirm dans une application réelle.
const handleDelete = async (id: string, type: 'cv' | 'analysis') => {
    // Les API routes gèrent la sécurité (vérification du userId)
    const endpoint = type === 'cv' ? `/api/delete-cv?cvId=${id}` : `/api/delete-analysis?analysisId=${id}`;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette ${type === 'cv' ? 'CV' : 'analyse'} ?`)) {
        try {
            const response = await fetch(endpoint, { method: 'DELETE' });
            if (response.ok) {
                alert(`${type === 'cv' ? 'CV' : 'Analyse'} supprimée avec succès. Veuillez rafraîchir la page.`);
                window.location.reload(); 
            } else {
                const error = await response.json();
                alert(`Erreur de suppression: ${error.message}`);
            }
        } catch (error) {
            alert('Échec de la communication avec le serveur.');
        }
    }
};

// Fonction pour simuler le téléchargement
const handleDownload = (content: string, type: 'pdf' | 'word') => {
    alert(`Téléchargement de la version ${type.toUpperCase()} en cours... (Simulé)`);
    console.log(`Contenu du document:\n${content}`);
};

// --- Composant Principal ---
export default function Dashboard({ user, cvs, analyses }: DashboardProps) {
    const router = useRouter(); 

    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Tableau de Bord</h1>
                        <p className="text-gray-400 mt-1">Bienvenue, {user.email} <span className="text-sm text-gray-600 ml-2">ID: {user.id}</span></p>
                    </div>
                    <button onClick={() => router.push('/create-cv')} className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300 flex items-center space-x-2">
                        <FileText size={20} />
                        <span>Nouveau CV</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne de gauche: Historique des CVs */}
                    <section className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-indigo-400 border-b border-gray-800 pb-2 flex items-center space-x-2">
                            <FileText size={24} /> 
                            <span>Historique des CVs ({cvs.length})</span>
                        </h2>
                        <div className="space-y-4">
                            {cvs.length === 0 ? (
                                <p className="text-gray-500 p-4 bg-[#1A2A3A] rounded-lg">Aucun CV généré pour l'instant. Commencez-en un nouveau !</p>
                            ) : (
                                cvs.map((cv) => (
                                    <div key={cv.id} className="bg-[#1A2A3A] p-4 rounded-lg flex justify-between items-center border border-gray-700">
                                        <div>
                                            <p className="font-semibold text-lg">{cv.style} CV <span className="text-sm text-gray-500 ml-2">({new Date(cv.createdAt).toLocaleDateString()})</span></p>
                                            <p className="text-sm text-gray-400 truncate max-w-sm">{cv.generatedContent.substring(0, 80)}...</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleDownload(cv.generatedContent, 'pdf')} title="Télécharger en PDF" className="p-2 rounded-full text-red-400 hover:bg-gray-700 transition">
                                                <Download size={20} />
                                            </button>
                                            <button onClick={() => handleDelete(cv.id, 'cv')} title="Supprimer" className="p-2 rounded-full text-red-500 hover:bg-red-900 transition">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                    
                    {/* Colonne de droite: Infos et Analyses Photo */}
                    <aside className="space-y-8">
                        <section className="bg-[#1A2A3A] p-6 rounded-xl border border-cyan-700 space-y-4">
                            <h2 className="text-xl font-bold text-cyan-400 flex items-center space-x-2">
                                <User size={20} /> 
                                <span>Statut du Compte</span>
                            </h2>
                            <p className="text-lg font-medium">Plan: <span className="text-green-400">Premium (Simulé)</span></p>
                            <button onClick={() => router.push('/tarifs')} className="text-indigo-400 hover:text-indigo-300 transition duration-150 flex items-center space-x-1">
                                <DollarSign size={16} /> <span>Gérer l'abonnement</span>
                            </button>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-orange-400 border-b border-gray-800 pb-2 flex items-center space-x-2">
                                <Camera size={24} /> 
                                <span>Analyses Photos ({analyses.length})</span>
                            </h2>
                            <div className="space-y-4 mt-4">
                                {analyses.length === 0 ? (
                                    <p className="text-gray-500 p-4 bg-[#1A2A3A] rounded-lg">Aucune photo analysée.</p>
                                ) : (
                                    analyses.map((analysis) => (
                                        <div key={analysis.id} className="bg-[#1A2A3A] p-4 rounded-lg border border-gray-700">
                                            <p className="font-semibold">Note Globale: <span className={`text-xl font-extrabold ${analysis.aiReport.global_score > 7 ? 'text-green-500' : 'text-yellow-500'}`}>{analysis.aiReport.global_score}/10</span></p>
                                            <p className="text-sm text-gray-500">Analysé le {new Date(analysis.createdAt).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-400 mt-2 truncate">{analysis.aiReport.cadrage}</p>
                                            <div className="flex justify-end mt-2">
                                                <button onClick={() => handleDelete(analysis.id, 'analysis')} title="Supprimer" className="p-2 rounded-full text-red-500 hover:bg-red-900 transition">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button onClick={() => router.push('/analyze-photo')} className="w-full mt-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-300">
                                Nouvelle Analyse Photo
                            </button>
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
}

// --- Fonction Serveur Next.js (getServerSideProps) ---
// Le code ci-dessous s'exécute côté serveur pour charger les données.

// IMPORTANT : Les imports dans getServerSideProps doivent être séparés
// pour la bonne gestion des modules Vercel.
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Importation dynamique du client Prisma (pour éviter les erreurs de compilation)
    const prisma = (await import('../lib/prisma')).default;

    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session || !session.user || !(session.user as { id: string }).id) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const userId = (session.user as { id: string }).id;

    try {
        // Récupération des CVs
        const cvs = await prisma.cv.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
            select: { id: true, style: true, createdAt: true, generatedContent: true },
        });

        // Récupération des Analyses Photos
        const analyses = await prisma.photoAnalysis.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
            select: { id: true, createdAt: true, aiReport: true },
        });

        return {
            props: {
                user: { id: userId, email: session.user.email || 'N/A' },
                // Sérialisation des Dates : conversion en chaîne de caractères ISO pour Next.js
                cvs: cvs.map(cv => ({ ...cv, createdAt: cv.createdAt.toISOString() })),
                analyses: analyses.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })),
            },
        };
    } catch (error) {
        console.error("Erreur de BDD/Session dans Dashboard:", error);
        // En cas d'erreur de base de données, redirigez l'utilisateur pour éviter le crash
        return {
            redirect: { destination: '/login', permanent: false }
        };
    }
};