/**
 * NextAuth configuration for credentials-based sessions.
 */
import argon2 from "argon2";
import { z } from "zod";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/modules/audit/service";
import { getAuthorizationContext } from "@/modules/rbac/service";
import type { CapabilityKey } from "@/modules/rbac/capabilities";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * Auth.js options used by route handlers, middleware, and session helpers.
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsedCredentials = credentialsSchema.safeParse(rawCredentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsedCredentials.data.email.toLowerCase() },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isPasswordValid = await argon2.verify(
          user.passwordHash,
          parsedCredentials.data.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        const context = await getAuthorizationContext(user.id);

        if (!context) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: context.roles,
          capabilities: context.capabilities,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.roles = Array.isArray(user.roles) ? user.roles : [];
        token.capabilities = Array.isArray(user.capabilities)
          ? user.capabilities
          : [];
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.userId ?? token.sub ?? "");
        session.user.roles = (token.roles as string[] | undefined) ?? [];
        session.user.capabilities =
          ((token.capabilities as CapabilityKey[] | undefined) ?? []);
      }

      return session;
    },
  },
  events: {
    async signIn(event) {
      await logAuditEvent({
        actorId: event.user.id,
        action: "auth.sign_in",
        resource: "auth_session",
        metadata: {
          provider: event.account?.provider,
          email: event.user.email,
        },
      });
    },
    async signOut(event) {
      await logAuditEvent({
        actorId: (event.token?.userId as string | undefined) ?? undefined,
        action: "auth.sign_out",
        resource: "auth_session",
      });
    },
  },
};
