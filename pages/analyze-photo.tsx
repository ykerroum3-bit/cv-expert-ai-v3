// pages/analyze-photo.tsx
// Page d'upload et d'affichage du rapport d'analyse de photo (FRONTEND)

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Camera, Upload, Trash2, Shield, Loader2, Award } from 'lucide-react';

const inputStyle = "w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1A2A3A] text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
const sectionTitleStyle = "text-2xl font-bold text-orange-400 mb-4 border-b border-gray-700 pb-2";

// Définition des types de données
interface AnalysisReport {
    global_score: number;
    cadrage: string;
    fond: string;
    luminosite: string;
    tenue: string;
}

export default function AnalyzePhotoPage() {
    const { status } = useSession();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisReport | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }
    
    // Gère le changement de fichier
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setAnalysisResult(null);
        }
    };

    // Soumission du formulaire à l'API de Vision AI
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setStatusMessage("Veuillez sélectionner une photo à analyser.");
            return;
        }

        setIsAnalyzing(true);
        setStatusMessage("Analyse en cours... Ceci peut prendre quelques instants.");
        setAnalysisResult(null);

        const formData = new FormData();
        // Le nom du champ doit correspondre à ce que l'API Route attend (files.photo)
        formData.append('photo', selectedFile); 

        try {
            // L'API Route `/api/analyze-photo` est appelée
            const response = await fetch('/api/analyze-photo', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Échec de l\'analyse par l\'IA de Vision.');
            }

            setStatusMessage("Analyse terminée ! Consultez le rapport ci-dessous.");
            setAnalysisResult(result.analysis);

        } catch (error) {
            setStatusMessage(`Erreur: ${error instanceof Error ? error.message : 'Une erreur inconnue est survenue.'}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-500';
        if (score >= 6) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-3xl mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-white mb-6 flex items-center space-x-3">
                    <Camera size={36} /> <span>Analyse Photo AI</span>
                </h1>
                <p className="text-gray-400 mb-6">Recevez un feedback IA instantané sur votre photo de CV pour une première impression parfaite.</p>

                <div className="bg-[#1A2A3A] p-6 rounded-xl shadow-2xl space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className={labelStyle}>Sélectionnez votre Photo (Max 5MB)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange} 
                            className={inputStyle}
                        />
                        
                        {selectedFile && (
                            <p className="text-sm text-gray-400">Fichier sélectionné : {selectedFile.name}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isAnalyzing || !selectedFile}
                            className="w-full flex items-center justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-xl text-white bg-orange-600 hover:bg-orange-700 transition duration-300 shadow-lg disabled:opacity-50"
                        >
                            {isAnalyzing ? (
                                <><Loader2 className="animate-spin mr-2" size={24} /> Lancement de l'Analyse...</>
                            ) : (
                                <><Upload className="mr-2" size={20} /> Lancer l'Analyse AI</>
                            )}
                        </button>
                    </form>

                    {statusMessage && (
                        <div className={`p-4 rounded-lg text-sm ${isAnalyzing ? 'bg-cyan-900' : (analysisResult ? 'bg-green-600' : 'bg-red-600')}`}>
                            <span className="font-semibold">{statusMessage}</span>
                        </div>
                    )}
                </div>

                {/* Section Rapport d'Analyse */}
                {analysisResult && (
                    <section className="mt-8 bg-gray-800 p-6 rounded-xl border-t-4 border-orange-500">
                        <h2 className={sectionTitleStyle}>Rapport d'Analyse (Score: <span className={getScoreColor(analysisResult.global_score)}>{analysisResult.global_score}/10</span>)</h2>
                        
                        <div className="space-y-4 text-gray-300">
                            <ReportItem title="Cadrage & Composition" content={analysisResult.cadrage} />
                            <ReportItem title="Fond & Arrière-plan" content={analysisResult.fond} />
                            <ReportItem title="Luminosité" content={analysisResult.luminosite} />
                            <ReportItem title="Tenue Vestimentaire" content={analysisResult.tenue} />
                        </div>
                        
                        <div className="mt-6 p-4 border border-cyan-600 rounded-lg bg-cyan-900/20 flex items-center space-x-3">
                            <Award size={24} className="text-cyan-400 flex-shrink-0" />
                            <p className="font-semibold text-cyan-200">Conseil : Un score de 8/10 et plus est fortement recommandé par les recruteurs.</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

const ReportItem: React.FC<{ title: string, content: string }> = ({ title, content }) => (
    <div>
        <h3 className="font-semibold text-lg text-white flex items-center space-x-2">
            <Shield size={16} className="text-orange-400" />
            <span>{title}</span>
        </h3>
        <p className="mt-1 text-gray-400 ml-6">{content}</p>
    </div>
);