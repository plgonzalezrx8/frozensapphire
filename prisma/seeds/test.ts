/**
 * Deterministic seed entrypoint for integration tests.
 */
import { PrismaClient } from "@prisma/client";
import { resetCmsData, seedCoreData } from "./shared";

/**
 * Resets and seeds only the records required for integration tests.
 */
export async function seedTestData(): Promise<void> {
  const prisma = new PrismaClient();

  await resetCmsData(prisma);
  await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");

  await prisma.$disconnect();
}
