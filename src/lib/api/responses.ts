/**
 * Shared API response helpers for REST v1 endpoints.
 * Keeps response shapes consistent across route handlers.
 */
import { NextResponse } from "next/server";

export interface ApiError {
  /** Machine-readable error code. */
  code: string;
  /** Human-readable error message. */
  message: string;
  /** Optional diagnostic details for debugging. */
  details?: unknown;
}

export interface PaginationMeta {
  /** Current page index (1-based). */
  page: number;
  /** Page size used for the response. */
  per_page: number;
  /** Total number of records available. */
  total: number;
}

export interface ApiListResponse<T> {
  /** Data payload for list endpoints. */
  data: T[];
  /** Pagination metadata. */
  meta: PaginationMeta;
}

/**
 * Returns a JSON response for successful operations.
 */
export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

/**
 * Returns a JSON response for list endpoints with pagination metadata.
 */
export function jsonList<T>(data: T[], meta: PaginationMeta, init?: ResponseInit) {
  return NextResponse.json({ data, meta } satisfies ApiListResponse<T>, init);
}

/**
 * Returns a JSON response for errors in the standard contract.
 */
export function jsonError(status: number, error: ApiError) {
  return NextResponse.json({ error }, { status });
}

/**
 * Returns a 501 Not Implemented response for stubbed endpoints.
 */
export function jsonNotImplemented(message = "Endpoint not implemented yet.") {
  return jsonError(501, {
    code: "not_implemented",
    message,
  });
}
