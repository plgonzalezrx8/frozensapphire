/**
 * Validates the minimum runtime environment required for self-hosted installs.
 */
const requiredVariables = [
  "DATABASE_URL",
  "REDIS_URL",
  "S3_ENDPOINT",
  "S3_BUCKET",
  "S3_ACCESS_KEY",
  "S3_SECRET_KEY",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
];

const missingVariables = requiredVariables.filter((name) => {
  const value = process.env[name];
  return typeof value !== "string" || value.trim().length === 0;
});

if (missingVariables.length > 0) {
  console.error("Missing required self-hosted runtime variables:");
  for (const name of missingVariables) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log("Self-hosted runtime configuration looks valid.");
