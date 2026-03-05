/**
 * REST v1 endpoint for content type collection operations.
 */
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { jsonError, jsonList, jsonNotImplemented } from "@/lib/api/responses";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  requireAuthenticatedUser,
  requireCapability,
  toAuthorizationContext,
} from "@/modules/rbac/guards";

/**
 * Lists content types for authenticated admin users.
 */
export async function GET() {
  const user = await getSessionUser();
  const authenticationError = requireAuthenticatedUser(user);

  if (authenticationError) {
    return authenticationError;
  }
  if (!user) {
    return jsonError(401, {
      code: "unauthorized",
      message: "Authentication is required.",
    });
  }

  const context = toAuthorizationContext(user);
  const capabilityError = requireCapability(context, CAPABILITIES.ADMIN_ACCESS);

  if (capabilityError) {
    return capabilityError;
  }

  const contentTypes = await prisma.contentType.findMany({
    orderBy: { name: "asc" },
  });

  return jsonList(contentTypes, {
    page: 1,
    per_page: contentTypes.length,
    total: contentTypes.length,
  });
}

/**
 * Placeholder for content type creation endpoint.
 */
export async function POST() {
  return jsonNotImplemented("Creating content types is not implemented yet.");
}
