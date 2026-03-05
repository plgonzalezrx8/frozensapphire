/**
 * Authorization guard helpers for enforcing capability checks.
 */
import { jsonError } from "@/lib/api/responses";

/**
 * Placeholder capability guard used by API routes.
 * TODO: Replace with session-aware capability checks.
 */
export function requireCapability(_capability: string) {
  return jsonError(403, {
    code: "forbidden",
    message: "Capability checks are not wired yet.",
  });
}
