// pages/create-cv.tsx
// Formulaire de CV guidé avec gestion des listes d'expérience et d'éducation

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Plus, X, Loader2, FileText, Globe, GraduationCap } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

const inputStyle = "w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1A2A3A] text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
const sectionTitleStyle = "text-2xl font-bold text-cyan-400 mb-4 border-b border-gray-700 pb-2";

// Définitions de type pour un meilleur contrôle
interface Experience {
    title: string;
    company: string;
    start: string;
    end: string;
    description: string;
}

interface Education {
    degree: string;
    institution: string;
    start: string;
    end: string;
}

interface CvFormState {
    personal: { name: string; email: string; phone: string; linkedin: string };
    experiences: Experience[];
    education: Education[];
    skills: string;
    languages: string;
    objective: string;
    style: 'Suisse' | 'France';
}

export default function CreateCvPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState<CvFormState>({
        personal: { name: '', email: session?.user?.email || '', phone: '', linkedin: '' },
        experiences: [{ title: '', company: '', start: '', end: '', description: '' }],
        education: [{ degree: '', institution: '', start: '', end: '' }],
        skills: '',
        languages: '',
        objective: '',
        style: 'Suisse',
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [cvResult, setCvResult] = useState<{ id: string, content: string } | null>(null);

    // Redirige si l'utilisateur n'est pas authentifié
    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    // Gestion des changements dans les champs simples
    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.personal) {
            setFormData(prev => ({
                ...prev,
                personal: { ...prev.personal, [name]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Gestion des changements dans les listes (expériences/éducation)
    const handleListChange = (index: number, key: keyof Experience | keyof Education, value: string, listName: 'experiences' | 'education') => {
        setFormData(prev => {
            const list = [...prev[listName]];
            // @ts-ignore: Permet d'éviter l'erreur de type 'never' car le type est vérifié par les interfaces.
            list[index][key] = value; 
            return { ...prev, [listName]: list };
        });
    };

    // Ajout d'une nouvelle entrée (expérience ou éducation)
    const handleAddEntry = (listName: 'experiences' | 'education') => {
        setFormData(prev => ({
            ...prev,
            [listName]: [...prev[listName], listName === 'experiences' ? { title: '', company: '', start: '', end: '', description: '' } : { degree: '', institution: '', start: '', end: '' }]
        }));
    };

    // Suppression d'une entrée
    const handleRemoveEntry = (index: number, listName: 'experiences' | 'education') => {
        setFormData(prev => ({
            ...prev,
            [listName]: prev[listName].filter((_, i) => i !== index)
        }));
    };

    // Soumission du formulaire à l'API de génération IA
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setStatusMessage("Envoi des données et préparation de l'IA...");
        setCvResult(null);

        try {
            const response = await fetch('/api/generate-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Échec de la génération du CV.');
            }

            setStatusMessage("Contenu généré par l'IA avec succès. Vous pouvez le télécharger !");
            setCvResult({ id: result.cvId, content: result.content });

        } catch (error) {
            setStatusMessage(`Erreur: ${error instanceof Error ? error.message : 'Une erreur inconnue est survenue.'}`);
        } finally {
            setIsGenerating(false);
        }
    };

    if (status !== 'authenticated') {
        return <div className="bg-[#0D1B2A] min-h-screen"></div>; // Affiche un écran vide pendant la redirection
    }

    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-white mb-6">Créer mon CV Guidé</h1>
                
                {statusMessage && (
                    <div className={`p-4 rounded-lg mb-6 ${isGenerating ? 'bg-cyan-900' : (cvResult ? 'bg-green-600' : 'bg-red-600')}`}>
                        {isGenerating && <Loader2 className="animate-spin inline mr-2" />}
                        <span className="font-semibold">{statusMessage}</span>
                    </div>
                )}

                {cvResult && (
                    <div className="bg-[#1A2A3A] p-6 rounded-lg mb-6 border border-green-500">
                        <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center"><FileText className="w-5 h-5 mr-2" /> CV Généré ({cvResult.id})</h2>
                        <pre className="whitespace-pre-wrap text-sm text-gray-300 p-4 bg-gray-800 rounded-md max-h-80 overflow-y-auto">
                            {cvResult.content}
                        </pre>
                        <div className="mt-4 flex space-x-4">
                            <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">Télécharger PDF (Simulé)</button>
                            <button className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition">Modifier les Données</button>
                        </div>
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-10 bg-[#1A2A3A] p-6 rounded-xl shadow-2xl">
                    
                    {/* Section 1: Informations Personnelles */}
                    <section>
                        <h2 className={sectionTitleStyle}>1. Informations de Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Nom complet</label>
                                <input type="text" name="name" required value={formData.personal.name} onChange={handleBasicChange} className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Email</label>
                                <input type="email" name="email" required value={formData.personal.email} onChange={handleBasicChange} className={inputStyle} disabled={!!session?.user?.email} />
                            </div>
                            <div>
                                <label className={labelStyle}>Téléphone</label>
                                <input type="tel" name="phone" value={formData.personal.phone} onChange={handleBasicChange} className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Lien LinkedIn (Optionnel)</label>
                                <input type="url" name="linkedin" value={formData.personal.linkedin} onChange={handleBasicChange} className={inputStyle} />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Objectif / Résumé */}
                    <section>
                        <h2 className={sectionTitleStyle}>2. Objectif Professionnel / Résumé</h2>
                        <label className={labelStyle}>Décrivez votre objectif en quelques phrases. L'IA optimisera ce texte.</label>
                        <TextareaAutosize minRows={3} name="objective" required value={formData.objective} onChange={handleBasicChange} className={`${inputStyle} resize-none`} />
                    </section>

                    {/* Section 3: Expériences Professionnelles */}
                    <section>
                        <h2 className={sectionTitleStyle}><FileText className="w-5 h-5 inline mr-2" /> 3. Expériences Professionnelles</h2>
                        
                        {formData.experiences.map((exp, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-white">Expérience #{index + 1}</h3>
                                    {formData.experiences.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveEntry(index, 'experiences')} className="text-red-400 hover:text-red-500 transition duration-150 p-1">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>Titre du Poste</label>
                                        <input type="text" required value={exp.title} onChange={(e) => handleListChange(index, 'title', e.target.value, 'experiences')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Entreprise</label>
                                        <input type="text" required value={exp.company} onChange={(e) => handleListChange(index, 'company', e.target.value, 'experiences')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Date de début (MM/AAAA)</label>
                                        <input type="text" required value={exp.start} onChange={(e) => handleListChange(index, 'start', e.target.value, 'experiences')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Date de fin (MM/AAAA) / En cours</label>
                                        <input type="text" value={exp.end} onChange={(e) => handleListChange(index, 'end', e.target.value, 'experiences')} className={inputStyle} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelStyle}>Description (Listez les tâches et réussites clés)</label>
                                        <TextareaAutosize minRows={3} required value={exp.description} onChange={(e) => handleListChange(index, 'description', e.target.value, 'experiences')} className={`${inputStyle} resize-none`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <button type="button" onClick={() => handleAddEntry('experiences')} className="w-full flex items-center justify-center py-2 border border-gray-600 rounded-lg text-cyan-400 hover:bg-gray-800 transition duration-150 mt-4">
                            <Plus size={20} className="mr-2" /> Ajouter une expérience
                        </button>
                    </section>

                    {/* Section 4: Diplômes / Formations */}
                    <section>
                        <h2 className={sectionTitleStyle}><GraduationCap className="w-5 h-5 inline mr-2" /> 4. Formations et Diplômes</h2>
                        
                        {formData.education.map((edu, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-white">Formation #{index + 1}</h3>
                                    {formData.education.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveEntry(index, 'education')} className="text-red-400 hover:text-red-500 transition duration-150 p-1">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>Nom du Diplôme / Certification</label>
                                        <input type="text" required value={edu.degree} onChange={(e) => handleListChange(index, 'degree', e.target.value, 'education')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Institution / École</label>
                                        <input type="text" required value={edu.institution} onChange={(e) => handleListChange(index, 'institution', e.target.value, 'education')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Année de début</label>
                                        <input type="text" value={edu.start} onChange={(e) => handleListChange(index, 'start', e.target.value, 'education')} className={inputStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Année de fin</label>
                                        <input type="text" required value={edu.end} onChange={(e) => handleListChange(index, 'end', e.target.value, 'education')} className={inputStyle} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <button type="button" onClick={() => handleAddEntry('education')} className="w-full flex items-center justify-center py-2 border border-gray-600 rounded-lg text-cyan-400 hover:bg-gray-800 transition duration-150 mt-4">
                            <Plus size={20} className="mr-2" /> Ajouter une formation
                        </button>
                    </section>

                    {/* Section 5: Compétences / Langues */}
                    <section>
                        <h2 className={sectionTitleStyle}><Globe className="w-5 h-5 inline mr-2" /> 5. Compétences et Langues</h2>
                        <div className="space-y-4">
                            <div>
                                <label className={labelStyle}>Compétences Clés (Séparées par des virgules : ex. SEO, SQL, React)</label>
                                <TextareaAutosize minRows={2} name="skills" value={formData.skills} onChange={handleBasicChange} className={`${inputStyle} resize-none`} />
                            </div>
                            <div>
                                <label className={labelStyle}>Langues (Niveau : ex. Français - C2, Anglais - B1)</label>
                                <TextareaAutosize minRows={2} name="languages" value={formData.languages} onChange={handleBasicChange} className={`${inputStyle} resize-none`} />
                            </div>
                        </div>
                    </section>
                    
                    {/* Section 6: Choix du Modèle (Style) */}
                    <section>
                        <h2 className={sectionTitleStyle}>6. Choix du Modèle</h2>
                        <div className="flex space-x-6">
                            <label className="flex items-center space-x-3 text-white">
                                <input type="radio" name="style" value="Suisse" checked={formData.style === 'Suisse'} onChange={handleBasicChange} className="form-radio h-5 w-5 text-indigo-600" />
                                <span>CV Suisse (Plus factuel)</span>
                            </label>
                            <label className="flex items-center space-x-3 text-white">
                                <input type="radio" name="style" value="France" checked={formData.style === 'France'} onChange={handleBasicChange} className="form-radio h-5 w-5 text-indigo-600" />
                                <span>CV France (Plus orienté compétences)</span>
                            </label>
                        </div>
                    </section>

                    {/* Bouton de soumission */}
                    <div>
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full flex items-center justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <><Loader2 className="animate-spin mr-2" size={24} /> Génération IA en cours...</>
                            ) : (
                                "Générer mon CV par IA"
                            )}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
