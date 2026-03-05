/**
 * REST v1 endpoint for import job status.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Retrieving import job ${params.id} is not implemented yet.`,
  );
}
