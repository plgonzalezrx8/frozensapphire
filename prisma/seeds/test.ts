/**
 * Integration-test seed profile with deterministic reset behavior.
 */
import { PrismaClient } from "@prisma/client";
import { resetSeedData, seedCoreData } from "./shared";

/**
 * Resets and seeds only the records needed by integration tests.
 */
export async function seedTestData(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    await resetSeedData(prisma);
    await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");
  } finally {
    await prisma.$disconnect();
  }
}
