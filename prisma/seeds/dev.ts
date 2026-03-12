/**
 * Development seed profile used for local self-hosted installs.
 */
import { PrismaClient } from "@prisma/client";
import { seedCoreData, seedSampleContent } from "./shared";

/**
 * Seeds development data with idempotent upserts.
 */
export async function seedDevData(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");
    await seedSampleContent(prisma);
  } finally {
    await prisma.$disconnect();
  }
}
