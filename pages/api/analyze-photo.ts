// pages/api/analyze-photo.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '../../lib/prisma';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Désactiver le body parser pour formidable
export const config = {
  api: { bodyParser: false },
};

// Fonction pour simuler l'analyse AI et sauvegarder dans Prisma
const analyzeFile = async (filePath: string, userId: string, imageUrl: string) => {
  const fileStats = fs.statSync(filePath);
  console.log(`Fichier reçu : ${filePath}, taille : ${fileStats.size} octets`);

  const analysisReport = {
    global_score: Math.floor(Math.random() * (10 - 6 + 1)) + 6,
    cadrage: "Le visage est bien centré et l'espace au-dessus est suffisant.",
    fond: "Fond uni gris clair, professionnel.",
    luminosite: "Lumière douce et uniforme.",
    tenue: "Tenue excellente pour un entretien.",
  };

  try {
    const result = await prisma.photoAnalysis.create({
      data: { userId, imageUrl, aiReport: analysisReport },
    });
    return result.aiReport;
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Erreur nettoyage fichier temporaire:", err);
    });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Seul POST est autorisé' });

  // Typage correct de la session pour TypeScript
  const session = (await getServerSession(req, res, authOptions)) as Session | null;

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Authentification requise.' });
  }

  const userId = session.user.id;
  const uploadDir = path.join(process.cwd(), 'temp/uploads');

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ uploadDir, keepExtensions: true, maxFileSize: 5 * 1024 * 1024 });

  try {
    const { files } = await new Promise<{ fields: formidable.Fields, files: formidable.Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const uploadedFile = (files.photo as formidable.File[])?.[0];
    if (!uploadedFile) return res.status(400).json({ message: 'Aucun fichier trouvé.' });

    const tempFilePath = uploadedFile.filepath;
    const placeholderUrl = `https://temp-url.com/${uploadedFile.originalFilename}`;

    const analysisResult = await analyzeFile(tempFilePath, userId, placeholderUrl);

    return res.status(200).json({
      message: 'Analyse photo complétée et enregistrée.',
      analysis: analysisResult,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload/analyse:", error);
    return res.status(500).json({ message: "Échec de l'upload ou de l'analyse." });
  }
}
