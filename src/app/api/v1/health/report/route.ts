/**
 * Detailed health report endpoint for admin dashboards.
 * Returns a structured response that can be extended with diagnostics.
 */
import { jsonOk } from "@/lib/api/responses";
import { getHealthReport } from "@/modules/health/healthService";

export async function GET() {
  return jsonOk(getHealthReport());
}
