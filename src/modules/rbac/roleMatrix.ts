/**
 * Static role-to-capability matrix used for auth defaults and unit checks.
 */
import { CAPABILITIES, type CapabilityKey } from "@/modules/rbac/capabilities";

export const ROLE_CAPABILITY_MATRIX: Record<string, CapabilityKey[]> = {
  Administrator: Object.values(CAPABILITIES),
  Editor: [
    CAPABILITIES.ADMIN_ACCESS,
    CAPABILITIES.CONTENT_CREATE,
    CAPABILITIES.CONTENT_EDIT,
    CAPABILITIES.CONTENT_DELETE,
    CAPABILITIES.CONTENT_PUBLISH,
    CAPABILITIES.MEDIA_MANAGE,
    CAPABILITIES.COMMENTS_MODERATE,
  ],
  Author: [
    CAPABILITIES.ADMIN_ACCESS,
    CAPABILITIES.CONTENT_CREATE,
    CAPABILITIES.CONTENT_EDIT,
    CAPABILITIES.CONTENT_PUBLISH,
  ],
  Contributor: [
    CAPABILITIES.ADMIN_ACCESS,
    CAPABILITIES.CONTENT_CREATE,
    CAPABILITIES.CONTENT_EDIT,
  ],
  Subscriber: [],
};

/**
 * Resolves the merged capability set for provided role names.
 */
export function resolveCapabilitiesFromRoleNames(roleNames: string[]): CapabilityKey[] {
  const capabilitySet = new Set<CapabilityKey>();

  for (const roleName of roleNames) {
    const capabilities = ROLE_CAPABILITY_MATRIX[roleName] ?? [];

    for (const capability of capabilities) {
      capabilitySet.add(capability);
    }
  }

  return [...capabilitySet];
}
