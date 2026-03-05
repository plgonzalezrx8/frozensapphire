/**
 * NextAuth type augmentation for session and JWT custom fields.
 */
import type { DefaultSession } from "next-auth";
import type { CapabilityKey } from "@/modules/rbac/capabilities";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      roles: string[];
      capabilities: CapabilityKey[];
    };
  }

  interface User {
    roles?: string[];
    capabilities?: CapabilityKey[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    roles?: string[];
    capabilities?: CapabilityKey[];
  }
}
