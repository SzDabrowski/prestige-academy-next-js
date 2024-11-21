import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  // Validate database connection
  prisma.$connect().catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

  // Cleanup on application shutdown
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });

  return prisma;
};
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
