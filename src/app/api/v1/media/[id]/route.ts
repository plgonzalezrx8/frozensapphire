/**
 * REST v1 endpoint for media asset detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(`Retrieving media asset ${id} is not implemented yet.`);
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(`Updating media asset ${id} is not implemented yet.`);
}
