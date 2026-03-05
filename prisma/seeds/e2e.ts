/**
 * Deterministic seed entrypoint for Playwright end-to-end tests.
 */
import { PrismaClient } from "@prisma/client";
import { resetCmsData, seedCoreData, seedSampleContent } from "./shared";

/**
 * Resets and seeds browser-test fixtures, including content and auth users.
 */
export async function seedE2eData(): Promise<void> {
  const prisma = new PrismaClient();

  await resetCmsData(prisma);
  await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");
  await seedSampleContent(prisma);

  await prisma.$disconnect();
}
