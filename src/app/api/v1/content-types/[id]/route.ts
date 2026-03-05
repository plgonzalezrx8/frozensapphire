/**
 * REST v1 endpoint for content type detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Updating content type ${params.id} is not implemented yet.`,
  );
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Deleting content type ${params.id} is not implemented yet.`,
  );
}
