/**
 * REST v1 endpoint for content item detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Retrieving content item ${params.id} is not implemented yet.`,
  );
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Updating content item ${params.id} is not implemented yet.`,
  );
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Deleting content item ${params.id} is not implemented yet.`,
  );
}
