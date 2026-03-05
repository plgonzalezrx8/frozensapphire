/**
 * Health service responsible for aggregating system checks.
 * Add database, cache, storage, and queue probes here.
 */

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
 * Returns a baseline health report.
 * TODO: Replace placeholder checks with real probes.
 */
export function getHealthReport(): HealthReport {
  return {
    status: "degraded",
    checks: [
      {
        name: "database",
        status: "unknown",
        message: "Database checks not wired yet.",
      },
      {
        name: "cache",
        status: "unknown",
        message: "Redis checks not wired yet.",
      },
      {
        name: "storage",
        status: "unknown",
        message: "Object storage checks not wired yet.",
      },
      {
        name: "queue",
        status: "unknown",
        message: "Queue checks not wired yet.",
      },
    ],
  };
}
