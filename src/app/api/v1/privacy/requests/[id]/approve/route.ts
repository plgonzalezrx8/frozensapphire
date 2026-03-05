/**
 * REST v1 endpoint for approving privacy requests.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: { id: string };
}

export async function POST(_request: Request, { params }: RouteContext) {
  return jsonNotImplemented(
    `Approving privacy request ${params.id} is not implemented yet.`,
  );
}
