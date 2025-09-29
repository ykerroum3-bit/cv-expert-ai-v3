// pages/login.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const inputStyle = "appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-[#1A2A3A] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150";
const buttonStyle = "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150";

// Composant de la page de connexion
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Appel à l'API de connexion/inscription de NextAuth
        const result = await signIn('credentials', {
            redirect: false, // Ne pas rediriger, on gère la redirection nous-mêmes
            email: email,
            password: password,
            // Pour l'inscription, on vérifie si l'utilisateur existe dans le hook 'authorize' (Fichier 6)
        });

        if (result?.error) {
            setError("Identifiants invalides ou échec de l'inscription. Veuillez réessayer.");
        } else {
            // Redirection vers le tableau de bord après une connexion réussie
            router.push('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D1B2A] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-[#1A2A3A] rounded-xl shadow-2xl border border-gray-700">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        {isLogin ? 'Connexion à CV Expert AI' : 'Créer votre Compte'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Adresse e-mail</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputStyle}
                                placeholder="Adresse e-mail"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputStyle}
                                placeholder="Mot de passe"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={buttonStyle}
                        >
                            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-cyan-400 hover:text-cyan-300 focus:outline-none transition duration-150"
                    >
                        {isLogin ? "Pas de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
                    </button>
                </div>
                
                <div className="text-center text-xs text-gray-500 mt-6">
                    En continuant, vous acceptez nos <Link href="/mentions-legales" className="hover:text-gray-400">Mentions Légales</Link> et notre <Link href="/politique-confidentialite" className="hover:text-gray-400">Politique de Confidentialité</Link>.
                </div>
            </div>
        </div>
    );
}