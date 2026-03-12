/**
 * Shared runtime configuration helpers for self-hosted environments.
 */
export const REQUIRED_RUNTIME_ENV_KEYS = [
  "DATABASE_URL",
  "REDIS_URL",
  "S3_ENDPOINT",
  "S3_BUCKET",
  "S3_ACCESS_KEY",
  "S3_SECRET_KEY",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
] as const;

export type RequiredRuntimeEnvKey = (typeof REQUIRED_RUNTIME_ENV_KEYS)[number];

/**
 * Returns the required runtime keys that are missing or blank.
 * @param env - Environment map to inspect.
 * @returns Missing environment variable names.
 */
export function getMissingRuntimeEnvKeys(
  env: NodeJS.ProcessEnv = process.env,
): RequiredRuntimeEnvKey[] {
  return REQUIRED_RUNTIME_ENV_KEYS.filter((name) => {
    const value = env[name];
    return typeof value !== "string" || value.trim().length === 0;
  });
}
