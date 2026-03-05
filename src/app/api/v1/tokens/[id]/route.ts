/**
 * REST v1 endpoint for API token revocation.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Revoking API token ${params.id} is not implemented yet.`,
  );
}
