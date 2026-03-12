/**
 * Health service responsible for aggregating system checks.
 * Add database, cache, storage, and queue probes here.
 */
import { getMissingRuntimeEnvKeys } from "@/lib/runtime-config";

export interface HealthCheckResult {
  /** Name of the health check. */
  name: string;
  /** Status for the check. */
  status: "ok" | "degraded" | "down" | "unknown";
  /** Human-readable context message. */
  message: string;
}

export interface HealthReport {
  /** Overall system status. */
  status: "ok" | "degraded" | "down";
  /** Individual health check results. */
  checks: HealthCheckResult[];
}

/**
 * Returns a baseline health report with runtime configuration validation.
 */
export function getHealthReport(): HealthReport {
  const missingRuntimeKeys = getMissingRuntimeEnvKeys();
  const runtimeStatus = missingRuntimeKeys.length === 0 ? "ok" : "degraded";

  return {
    status: runtimeStatus,
    checks: [
      {
        name: "database",
        status: process.env.DATABASE_URL ? "ok" : "degraded",
        message: process.env.DATABASE_URL
          ? "Database connection string is configured."
          : "DATABASE_URL is missing.",
      },
      {
        name: "cache",
        status: process.env.REDIS_URL ? "ok" : "degraded",
        message: process.env.REDIS_URL
          ? "Redis connection string is configured."
          : "REDIS_URL is missing.",
      },
      {
        name: "storage",
        status:
          process.env.S3_ENDPOINT &&
          process.env.S3_BUCKET &&
          process.env.S3_ACCESS_KEY &&
          process.env.S3_SECRET_KEY
            ? "ok"
            : "degraded",
        message:
          process.env.S3_ENDPOINT &&
          process.env.S3_BUCKET &&
          process.env.S3_ACCESS_KEY &&
          process.env.S3_SECRET_KEY
            ? "Object storage configuration is present."
            : "One or more S3 runtime variables are missing.",
      },
      {
        name: "queue",
        status: process.env.REDIS_URL ? "ok" : "degraded",
        message: process.env.REDIS_URL
          ? "Queue backend can use the configured Redis connection."
          : "Queue backend is unavailable because REDIS_URL is missing.",
      },
      {
        name: "auth",
        status:
          process.env.NEXTAUTH_URL && process.env.NEXTAUTH_SECRET
            ? "ok"
            : "degraded",
        message:
          process.env.NEXTAUTH_URL && process.env.NEXTAUTH_SECRET
            ? "Auth runtime configuration is present."
            : "NEXTAUTH_URL or NEXTAUTH_SECRET is missing.",
      },
    ],
  };
}
