🚀 CV Expert AI - L'Application de Génération de CV par IA
Bienvenue dans le projet CV Expert AI, une application complète construite avec Next.js 14, React, Tailwind CSS et Prisma (MySQL) pour la génération et l'analyse de CV.

🛠️ 1. Prérequis
Assurez-vous d'avoir installé les outils suivants sur votre Mac :

Node.js (version 18 ou supérieure) : Nécessaire pour exécuter Next.js et npm.

npm (Node Package Manager) : Installé automatiquement avec Node.js.

Base de Données MySQL : La structure des tables a déjà été créée (via le script SQL fourni).

⚙️ 2. Installation du Projet
Étape 2.1 : Créer le projet Next.js

Si ce n'est pas déjà fait, ouvrez votre Terminal et exécutez la commande suivante pour créer la structure de base (vous pouvez nommer le dossier cv-expert-ai) :

npx create-next-app@latest cv-expert-ai --ts --tailwind --eslint

Sélectionnez les options par défaut ou oui partout.

Étape 2.2 : Déplacer les Fichiers

Déplacez les fichiers que nous avons créés ensemble dans le nouveau dossier cv-expert-ai :

Le dossier prisma/

Le fichier .env.local

Étape 2.3 : Installer les Dépendances

Déplacez-vous dans le dossier de votre projet et installez les dépendances nécessaires :

cd cv-expert-ai
npm install next-auth @prisma/client
npm install -D prisma

Étape 2.4 : Synchronisation avec la Base de Données

Puisque vous avez déjà créé les tables MySQL, il suffit maintenant de demander à Prisma de se connecter et de générer le code client pour l'application :

# Génère le client Prisma à partir du schéma
npx prisma generate

🚀 3. Lancement de l'Application
Une fois toutes les dépendances installées, vous pouvez démarrer le serveur de développement :

npm run dev

L'application sera accessible dans votre navigateur à l'adresse : http://localhost:3000

🔑 4. Variables d'Environnement (Rappel)
ATTENTION : Les fonctionnalités d'IA, de paiement Stripe et d'envoi d'e-mails ne fonctionneront que si vous remplacez les valeurs placeholders dans le fichier .env.local :

IA_API_KEY

VISION_API_KEY

STRIPE_SECRET_KEY

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

CONTACT_EMAIL_SERVICE_API

☁️ 5. Déploiement vers Vercel
Le projet est configuré pour être déployé sur Vercel (l'entreprise derrière Next.js).

Liez votre projet à Git (GitHub, GitLab, ou Bitbucket).

Connectez-vous à Vercel et importez le projet.

Lors de la configuration Vercel, vous devrez copier toutes les variables du fichier .env.local (sauf NEXTAUTH_URL et celles commençant par NEXT_PUBLIC_) dans les Variables d'Environnement de Vercel.

