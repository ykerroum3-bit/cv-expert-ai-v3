// pages/api/contact.ts
// Route API pour recevoir un message du formulaire de contact et envoyer un email.

import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactData {
    name: string;
    email: string;
    message: string;
}

// TODO: Insérer ici le VRAI code d'envoi d'email (ex: Nodemailer, SendGrid, Mailgun)
// Vous n'avez pas besoin d'une clé dans .env.local pour l'envoi d'email pour cette simulation.
async function sendEmail(data: ContactData) {
    console.log("--- SIMULATION ENVOI EMAIL ---");
    console.log(`De: ${data.name} <${data.email}>`);
    console.log(`Message: ${data.message}`);
    console.log("--- EMAIL ENVOYÉ (Simulé) ---");
    // Dans une application réelle, une librairie Node.js gèrerait l'envoi ici.
    return { success: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Seul POST est autorisé' });
    }

    const { name, email, message }: ContactData = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
    }

    try {
        await sendEmail({ name, email, message });
        return res.status(200).json({ message: 'Message envoyé avec succès.' });
    } catch (error) {
        console.error("Erreur d'envoi d'email:", error);
        return res.status(500).json({ message: "Échec de l'envoi du message." });
    }
}