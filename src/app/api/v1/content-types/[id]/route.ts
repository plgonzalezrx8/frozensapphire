/**
 * REST v1 endpoint for content type detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

/**
 * Placeholder for content type update endpoint.
 */
export async function PATCH(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Updating content type ${id} is not implemented yet.`,
  );
}

/**
 * Placeholder for content type delete endpoint.
 */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Deleting content type ${id} is not implemented yet.`,
  );
}
