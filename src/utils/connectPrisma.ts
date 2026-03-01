// src/utils/connectPrisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Tworzy instancję PrismaClient (singleton) i konfiguruje połączenie z MongoDB.
 * W trybie development używa globalnego obiektu, żeby uniknąć problemów z hot reload.
 */
const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in the environment");
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL as string, // wymuszenie typu string
      },
    },
  });

  // Weryfikacja połączenia z bazą
  prisma.$connect().catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

  // Czyszczenie połączenia przy zamykaniu aplikacji
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });

  return prisma;
};

/**
 * Typowanie globalThis dla singletona Prisma w dev mode
 */
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

// Tworzenie singletona
const prisma = globalThis.prisma ?? prismaClientSingleton();

// W development przypisujemy do globalThis, żeby uniknąć wielu instancji przy hot reload
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
