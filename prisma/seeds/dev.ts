/**
 * Development seed entrypoint for local environments.
 */
import { PrismaClient } from "@prisma/client";
import { seedCoreData, seedSampleContent } from "./shared";

/**
 * Seeds development data using idempotent upserts.
 */
export async function seedDevData(): Promise<void> {
  const prisma = new PrismaClient();

  await seedCoreData(prisma, process.env.SEED_DEFAULT_PASSWORD ?? "ChangeMe123!");
  await seedSampleContent(prisma);

  await prisma.$disconnect();
}
