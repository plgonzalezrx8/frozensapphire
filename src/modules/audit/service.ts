/**
 * Audit logging service for security-sensitive operations.
 */
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

export interface AuditEventInput {
  /** Authenticated actor id for the event, if available. */
  actorId?: string;
  /** Action key describing what happened. */
  action: string;
  /** Resource identifier impacted by the action. */
  resource: string;
  /** Additional contextual metadata. */
  metadata?: unknown;
}

/**
 * Writes an audit log record and swallows failures to avoid blocking user flows.
 */
export async function logAuditEvent(input: AuditEventInput) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: input.actorId,
        action: input.action,
        resource: input.resource,
        metadata: input.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    logger.error({ error, input }, "Failed to persist audit event");
  }
}
