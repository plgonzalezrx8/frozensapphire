/**
 * Shared auth session user contract used by guards and route handlers.
 */
import type { CapabilityKey } from "@/modules/rbac/capabilities";

export interface SessionUser {
  /** Authenticated user id. */
  id: string;
  /** User email address. */
  email: string;
  /** Optional display name. */
  name?: string | null;
  /** Role names included in the session token. */
  roles: string[];
  /** Capability keys included in the session token. */
  capabilities: CapabilityKey[];
}
