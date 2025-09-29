// pages/api/generate-cv.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '../../lib/prisma';
import { CvData } from '../../../types';

// Simulation de la fonction d'appel IA
async function callAIGeneration(data: CvData): Promise<string> {
    const apiKey = process.env.IA_API_KEY;

    // TODO: Si IA_API_KEY est configurée, insérer ici le VRAI appel à l'API IA (OpenAI, Gemini, etc.)
    if (apiKey && apiKey.startsWith("sk-")) {
        console.log("Appel API IA réel simulé...");
        // Logique pour l'appel réel...
    }

    // SIMULATION (Réponse par défaut)
    const styleName = data.style === 'Suisse' ? 'Suisse' : 'Français';
    return `
        **CV EXPERT AI - RÉSULTAT OPTIMISÉ (${styleName})**

        **Objectif :** ${data.objective || 'Objectif professionnel non spécifié.'}

        **Expérience Professionnelle :**
        ${data.experiences.map(exp => `
            - **${exp.title}** chez ${exp.company} (${exp.start} - ${exp.end}) : ${exp.description}
        `).join('\n')}

        **Formation :**
        ${data.education.map(edu => `
            - **${edu.degree}** à ${edu.institution} (${edu.end})
        `).join('\n')}

        **Compétences Clés :** ${data.skills}
        **Langues :** ${data.languages}

        *Ceci est un contenu généré par l'IA. La mise en page PDF professionnelle suivra.*
    `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Seul POST est autorisé' });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !(session.user as { id: string }).id) {
        return res.status(401).json({ message: 'Authentification requise.' });
    }

    const userId = (session.user as { id: string }).id;
    const data: CvData = req.body;

    if (!data || !data.personal || !data.style) {
        return res.status(400).json({ message: 'Données de CV manquantes ou incomplètes.' });
    }

    try {
        const generatedText = await callAIGeneration(data);

        const newCv = await prisma.cv.create({
            data: {
                userId: userId,
                style: data.style,
                data: data as any,
                generatedContent: generatedText,
                status: 'GENERATED',
            },
        });

        return res.status(200).json({ 
            message: 'CV généré avec succès !',
            cvId: newCv.id,
            content: generatedText,
        });

    } catch (error) {
        console.error("Erreur de génération de CV:", error);
        return res.status(500).json({ message: 'Échec de la génération de CV.' });
    }
}