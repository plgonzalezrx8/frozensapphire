/**
 * REST v1 endpoint for API token revocation.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Revoking API token ${id} is not implemented yet.`,
  );
}
