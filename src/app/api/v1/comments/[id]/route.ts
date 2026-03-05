/**
 * REST v1 endpoint for comment moderation operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Updating comment ${id} is not implemented yet.`,
  );
}
