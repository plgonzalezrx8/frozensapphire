/**
 * Session helpers for route handlers and server components.
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { SessionUser } from "@/lib/auth/types";
import type { CapabilityKey } from "@/modules/rbac/capabilities";

/**
 * Returns the authenticated session user from NextAuth.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    roles: session.user.roles ?? [],
    capabilities: (session.user.capabilities ?? []) as CapabilityKey[],
  };
}
