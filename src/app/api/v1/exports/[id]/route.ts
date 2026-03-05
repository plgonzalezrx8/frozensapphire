/**
 * REST v1 endpoint for export job status.
 */
import { jsonNotImplemented } from "@/lib/api/responses";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  return jsonNotImplemented(
    `Retrieving export job ${id} is not implemented yet.`,
  );
}
