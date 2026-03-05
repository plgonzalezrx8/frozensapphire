/**
 * Authorization guard helpers for enforcing capability checks.
 */
import { jsonError } from "@/lib/api/responses";
import type { SessionUser } from "@/lib/auth/types";
import type { CapabilityKey } from "@/modules/rbac/capabilities";
import type { AuthorizationContext } from "@/modules/rbac/service";

/**
 * Returns a standardized 401 error response when no user session is present.
 */
export function requireAuthenticatedUser(user: SessionUser | null) {
  if (user) {
    return null;
  }

  return jsonError(401, {
    code: "unauthorized",
    message: "Authentication is required.",
  });
}

/**
 * Returns a standardized 403 response when a capability is missing.
 */
export function requireCapability(
  context: AuthorizationContext,
  capability: CapabilityKey,
) {
  if (context.capabilities.includes(capability)) {
    return null;
  }

  return jsonError(403, {
    code: "forbidden",
    message: `Missing required capability: ${capability}.`,
  });
}

/**
 * Converts a session user into an authorization context used by RBAC checks.
 */
export function toAuthorizationContext(user: SessionUser): AuthorizationContext {
  return {
    userId: user.id,
    roles: user.roles,
    capabilities: user.capabilities,
  };
}

/**
 * Returns a standardized 403 response when ownership checks fail.
 */
export function requireOwnershipAccess(hasAccess: boolean) {
  if (hasAccess) {
    return null;
  }

  return jsonError(403, {
    code: "forbidden",
    message: "You do not have access to this content item.",
  });
}
