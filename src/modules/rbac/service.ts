/**
 * RBAC service for resolving user roles/capabilities and content ownership rules.
 */
import { prisma } from "@/lib/db";
import { type CapabilityKey, CAPABILITIES } from "@/modules/rbac/capabilities";

export interface AuthorizationContext {
  /** Authenticated user id. */
  userId: string;
  /** Role names assigned to the user. */
  roles: string[];
  /** Flattened capability list assigned through roles. */
  capabilities: CapabilityKey[];
}

/**
 * Resolves role and capability context for a user.
 */
export async function getAuthorizationContext(
  userId: string,
): Promise<AuthorizationContext | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              capabilities: {
                include: {
                  capability: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const roles = user.roles.map((entry) => entry.role.name);
  const capabilitySet = new Set<CapabilityKey>();

  for (const userRole of user.roles) {
    for (const roleCapability of userRole.role.capabilities) {
      capabilitySet.add(roleCapability.capability.key as CapabilityKey);
    }
  }

  return {
    userId,
    roles,
    capabilities: [...capabilitySet],
  };
}

/**
 * Returns true when the authorization context includes a capability.
 */
export function hasCapability(
  context: AuthorizationContext,
  capability: CapabilityKey,
): boolean {
  return context.capabilities.includes(capability);
}

/**
 * Returns true when the user can manage other users' content.
 */
export function hasCrossAuthorContentAccess(context: AuthorizationContext): boolean {
  return context.roles.includes("Administrator") || context.roles.includes("Editor");
}

/**
 * Returns true when the user can edit or delete the target author's content.
 */
export function canManageContentOwnership(
  context: AuthorizationContext,
  authorId: string,
): boolean {
  return hasCrossAuthorContentAccess(context) || context.userId === authorId;
}

/**
 * Returns true when the user can publish the target content.
 */
export function canPublishContent(
  context: AuthorizationContext,
  authorId: string,
): boolean {
  if (!hasCapability(context, CAPABILITIES.CONTENT_PUBLISH)) {
    return false;
  }

  return hasCrossAuthorContentAccess(context) || context.userId === authorId;
}
