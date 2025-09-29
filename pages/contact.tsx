// pages/contact.tsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';

const inputStyle = "w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1A2A3A] text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-white mb-6 text-center";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Échec de l'envoi du message.");
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-[#0D1B2A] min-h-screen text-gray-100 pt-16">
            <Navbar />
            <main className="max-w-xl mx-auto p-4 md:p-8">
                <h1 className={sectionTitleStyle}>
                    <Mail className="inline w-8 h-8 mr-3 text-cyan-400" />
                    Contactez-nous
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Notre équipe est là pour répondre à toutes vos questions.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#1A2A3A] p-6 rounded-xl shadow-2xl border border-gray-700">
                    <div>
                        <label className={labelStyle} htmlFor="name">Votre Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="Nom et Prénom"
                        />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="email">Votre Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="email@exemple.com"
                        />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="message">Votre Message</label>
                        <TextareaAutosize
                            minRows={4}
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className={`${inputStyle} resize-none`}
                            placeholder="Décrivez votre demande..."
                        />
                    </div>

                    {status === 'success' && (
                        <div className="bg-green-900 border border-green-700 text-green-300 p-4 rounded-lg">
                            Message envoyé avec succès ! Nous vous répondrons bientôt.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="bg-red-900 border border-red-700 text-red-300 p-4 rounded-lg">
                            Erreur lors de l'envoi. Veuillez réessayer.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg disabled:opacity-50"
                    >
                        {status === 'loading' ? (
                            <><Loader2 className="animate-spin mr-2" size={20} /> Envoi en cours...</>
                        ) : (
                            <><Send className="mr-2" size={20} /> Envoyer le Message</>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}