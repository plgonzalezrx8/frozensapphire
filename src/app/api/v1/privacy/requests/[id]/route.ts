/**
 * REST v1 endpoint for privacy request status.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Retrieving privacy request ${params.id} is not implemented yet.`,
  );
}
