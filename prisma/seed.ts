/**
 * Backwards-compatible Prisma seed entrypoint.
 * Delegates to the development seed profile.
 */
import { seedDevData } from "./seeds/dev";

seedDevData().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
