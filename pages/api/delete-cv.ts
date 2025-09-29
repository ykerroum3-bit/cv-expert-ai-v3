// pages/api/delete-cv.ts

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
    const { cvId } = req.query;

    if (!cvId || typeof cvId !== 'string') {
        return res.status(400).json({ message: 'ID de CV manquant ou invalide.' });
    }

    try {
        // Supprime uniquement le CV correspondant à l'ID et appartenant à l'utilisateur
        const result = await prisma.cv.deleteMany({
            where: {
                id: cvId,
                userId: userId, // SECURITÉ : Vérifie la propriété
            },
        });

        if (result.count === 0) {
            return res.status(404).json({ message: 'CV non trouvé ou autorisation refusée.' });
        }

        return res.status(200).json({ message: 'CV supprimé avec succès.' });

    } catch (error) {
        console.error("Erreur de suppression du CV:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
             return res.status(404).json({ message: 'Ressource non trouvée.' });
        }
        return res.status(500).json({ message: 'Échec de la suppression du CV.' });
    }
}