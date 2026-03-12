/**
 * Health endpoint for API consumers and uptime checks.
 * Returns a summarized report for runtime readiness and uptime checks.
 */
import { jsonOk } from "@/lib/api/responses";
import { getHealthReport } from "@/modules/health/healthService";

export async function GET() {
  const report = getHealthReport();

  return jsonOk({
    status: report.status,
    time: new Date().toISOString(),
    services: Object.fromEntries(
      report.checks.map((check) => [check.name, check.status]),
    ),
  });
}
