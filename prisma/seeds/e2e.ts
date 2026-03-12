/**
 * End-to-end seed profile with deterministic auth and content fixtures.
 */
import { PrismaClient } from "@prisma/client";
import { resetSeedData, seedCoreData, seedSampleContent } from "./shared";

/**
 * Resets and seeds the data required for browser-driven tests.
 */
export async function seedE2eData(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    await resetSeedData(prisma);
    await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");
    await seedSampleContent(prisma);
  } finally {
    await prisma.$disconnect();
  }
}
