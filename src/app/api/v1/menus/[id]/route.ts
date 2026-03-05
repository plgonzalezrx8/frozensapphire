/**
 * REST v1 endpoint for menu detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(`Updating menu ${id} is not implemented yet.`);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(`Deleting menu ${id} is not implemented yet.`);
}
