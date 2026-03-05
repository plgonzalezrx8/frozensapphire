/**
 * Health endpoint for API consumers and uptime checks.
 * Expands to include DB/Redis/S3 checks as services are wired.
 */
import { jsonOk } from "@/lib/api/responses";

export async function GET() {
  const now = new Date().toISOString();

  return jsonOk({
    status: "ok",
    time: now,
    services: {
      database: "unknown",
      cache: "unknown",
      storage: "unknown",
      queue: "unknown",
    },
  });
}
