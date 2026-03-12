/**
 * CLI runner for the development seed profile.
 */
import { seedDevData } from "./dev";

seedDevData()
  .then(() => {
    console.log("Development seed completed.");
  })
  .catch((error) => {
    console.error("Development seed failed", error);
    process.exitCode = 1;
  });
