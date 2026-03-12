/**
 * CLI runner for the integration-test seed profile.
 */
import { seedTestData } from "./test";

seedTestData()
  .then(() => {
    console.log("Integration seed completed.");
  })
  .catch((error) => {
    console.error("Integration seed failed", error);
    process.exitCode = 1;
  });
