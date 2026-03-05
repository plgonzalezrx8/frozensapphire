/**
 * CLI runner for integration-test seed profile.
 */
import { seedTestData } from "./test";

seedTestData()
  .then(() => {
    console.log("Integration seed completed.");
  })
  .catch((error) => {
    console.error("Integration test seed failed", error);
    process.exitCode = 1;
  });
