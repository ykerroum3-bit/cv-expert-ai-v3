// lib/prisma.ts
// Ce fichier configure et exporte le client Prisma pour la connexion à la base de données.
// Il utilise un pattern pour éviter les connexions multiples en environnement de développement (hot-reload).

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Utilise la connexion existante ou en crée une nouvelle
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Affiche les requêtes SQL dans la console en environnement de développement
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

// Conserve la connexion en développement pour le hot-reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Exporte le client pour qu'il soit importé partout dans l'application
export default prisma;
