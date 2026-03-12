/**
 * CLI runner for the end-to-end seed profile.
 */
import { seedE2eData } from "./e2e";

seedE2eData()
  .then(() => {
    console.log("E2E seed completed.");
  })
  .catch((error) => {
    console.error("E2E seed failed", error);
    process.exitCode = 1;
  });
