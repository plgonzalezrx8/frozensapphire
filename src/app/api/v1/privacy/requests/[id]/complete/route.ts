/**
 * REST v1 endpoint for completing privacy requests.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Completing privacy request ${id} is not implemented yet.`,
  );
}
