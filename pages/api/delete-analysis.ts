// pages/api/delete-analysis.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Seul DELETE est autorisé' });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !(session.user as { id: string }).id) {
        return res.status(401).json({ message: 'Authentification requise.' });
    }

    const userId = (session.user as { id: string }).id;
    const { analysisId } = req.query; 

    if (!analysisId || typeof analysisId !== 'string') {
        return res.status(400).json({ message: 'ID d\'analyse manquant ou invalide.' });
    }

    try {
        const result = await prisma.photoAnalysis.deleteMany({
            where: {
                id: analysisId, 
                userId: userId, // SECURITÉ : Vérifie la propriété
            },
        });

        if (result.count === 0) {
            return res.status(404).json({ message: 'Analyse non trouvée ou autorisation refusée.' });
        }

        return res.status(200).json({ message: 'Analyse photo supprimée avec succès.' });

    } catch (error) {
        console.error("Erreur de suppression de l'analyse:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
             return res.status(404).json({ message: 'Ressource non trouvée.' });
        }
        return res.status(500).json({ message: 'Échec de la suppression de l\'analyse.' });
    }
}