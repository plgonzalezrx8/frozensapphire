/**
 * REST v1 endpoint for comment moderation operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Updating comment ${params.id} is not implemented yet.`,
  );
}
