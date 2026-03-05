/**
 * REST v1 endpoint for media asset detail operations.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(`Retrieving media asset ${params.id} is not implemented yet.`);
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(`Updating media asset ${params.id} is not implemented yet.`);
}
