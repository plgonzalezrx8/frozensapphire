/**
 * Content domain service providing CRUD operations and permission checks.
 */
import type { ContentItem, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  canManageContentOwnership,
  canPublishContent,
  hasCapability,
  type AuthorizationContext,
} from "@/modules/rbac/service";
import {
  type ContentListQuery,
  type CreateContentInput,
  type UpdateContentInput,
} from "@/modules/content/schemas";
import { logAuditEvent } from "@/modules/audit/service";

const ALLOWED_STATUS_TRANSITIONS: Record<
  ContentItem["status"],
  ContentItem["status"][]
> = {
  draft: ["draft", "pending", "scheduled", "published"],
  pending: ["draft", "pending", "scheduled", "published"],
  scheduled: ["draft", "pending", "scheduled", "published"],
  published: ["draft", "published"],
};

interface ContentServiceDependencies {
  /** Prisma-like client dependency for tests and production. */
  db?: Prisma.TransactionClient | typeof prisma;
}

export interface ContentListResult {
  /** Returned content rows. */
  data: ContentItem[];
  /** Pagination metadata. */
  meta: {
    page: number;
    per_page: number;
    total: number;
  };
}

export class ContentValidationError extends Error {
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = "ContentValidationError";
    this.details = details;
  }
}

export class ContentForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentForbiddenError";
  }
}

export class ContentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentNotFoundError";
  }
}

/**
 * Normalizes a slug value for URL safety.
 */
export function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Returns true when a status transition is allowed.
 */
export function isValidStatusTransition(
  fromStatus: ContentItem["status"],
  toStatus: ContentItem["status"],
) {
  return ALLOWED_STATUS_TRANSITIONS[fromStatus].includes(toStatus);
}

/**
 * Lists content items for admin APIs.
 */
export async function listContentItems(
  query: ContentListQuery,
  dependencies: ContentServiceDependencies = {},
): Promise<ContentListResult> {
  const dbClient = dependencies.db ?? prisma;
  const where: Prisma.ContentItemWhereInput = {};

  if (query.status) {
    where.status = query.status;
  }

  const [data, total] = await Promise.all([
    dbClient.contentItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * query.perPage,
      take: query.perPage,
    }),
    dbClient.contentItem.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: query.page,
      per_page: query.perPage,
      total,
    },
  };
}

/**
 * Creates a content item for the authenticated author.
 */
export async function createContentItem(
  input: CreateContentInput,
  context: AuthorizationContext,
  dependencies: ContentServiceDependencies = {},
): Promise<ContentItem> {
  const dbClient = dependencies.db ?? prisma;

  if (!hasCapability(context, CAPABILITIES.CONTENT_CREATE)) {
    throw new ContentForbiddenError("Missing content.create capability.");
  }

  if (input.status === "published" && !canPublishContent(context, context.userId)) {
    throw new ContentForbiddenError("User cannot publish content.");
  }

  if (input.status === "scheduled" && !input.scheduledAt) {
    throw new ContentValidationError(
      "scheduledAt is required when status is scheduled.",
    );
  }

  const baseSlug = normalizeSlug(input.slug ?? input.title);

  if (!baseSlug) {
    throw new ContentValidationError("A valid slug could not be derived.");
  }

  const slug = await ensureUniqueSlug(baseSlug, input.typeId, undefined, dbClient);

  const created = await dbClient.contentItem.create({
    data: {
      typeId: input.typeId,
      authorId: context.userId,
      title: input.title,
      slug,
      status: input.status,
      content: input.content as Prisma.InputJsonValue,
      fields: input.fields as Prisma.InputJsonValue | undefined,
      scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
      publishedAt: input.status === "published" ? new Date() : null,
    },
  });

  await logAuditEvent({
    actorId: context.userId,
    action: "content.create",
    resource: `content_item:${created.id}`,
    metadata: {
      status: created.status,
      typeId: created.typeId,
    },
  });

  return created;
}

/**
 * Fetches a content item by id.
 */
export async function getContentItemById(
  id: string,
  dependencies: ContentServiceDependencies = {},
): Promise<ContentItem | null> {
  const dbClient = dependencies.db ?? prisma;
  return dbClient.contentItem.findUnique({ where: { id } });
}

/**
 * Updates a content item with status and permission checks.
 */
export async function updateContentItem(
  id: string,
  input: UpdateContentInput,
  context: AuthorizationContext,
  dependencies: ContentServiceDependencies = {},
): Promise<ContentItem> {
  const dbClient = dependencies.db ?? prisma;
  const existing = await dbClient.contentItem.findUnique({ where: { id } });

  if (!existing) {
    throw new ContentNotFoundError("Content item not found.");
  }

  if (!hasCapability(context, CAPABILITIES.CONTENT_EDIT)) {
    throw new ContentForbiddenError("Missing content.edit capability.");
  }

  if (!canManageContentOwnership(context, existing.authorId)) {
    throw new ContentForbiddenError("User cannot modify this content item.");
  }

  const nextStatus = input.status ?? existing.status;

  if (!isValidStatusTransition(existing.status, nextStatus)) {
    throw new ContentValidationError(
      `Status transition from ${existing.status} to ${nextStatus} is not allowed.`,
    );
  }

  if (nextStatus === "published" && !canPublishContent(context, existing.authorId)) {
    throw new ContentForbiddenError("User cannot publish this content item.");
  }

  if (nextStatus === "scheduled" && !input.scheduledAt && !existing.scheduledAt) {
    throw new ContentValidationError(
      "scheduledAt is required when status is scheduled.",
    );
  }

  const slugSource = input.slug ?? existing.slug;
  const normalizedSlug = normalizeSlug(slugSource);

  if (!normalizedSlug) {
    throw new ContentValidationError("A valid slug could not be derived.");
  }

  const slug = await ensureUniqueSlug(
    normalizedSlug,
    existing.typeId,
    existing.id,
    dbClient,
  );

  const updated = await dbClient.contentItem.update({
    where: { id },
    data: {
      title: input.title,
      slug,
      status: nextStatus,
      content: input.content as Prisma.InputJsonValue | undefined,
      fields: input.fields as Prisma.InputJsonValue | undefined,
      scheduledAt:
        input.scheduledAt !== undefined
          ? input.scheduledAt
            ? new Date(input.scheduledAt)
            : null
          : existing.scheduledAt,
      // If content leaves published state, publishedAt is reset.
      publishedAt: nextStatus === "published" ? existing.publishedAt ?? new Date() : null,
    },
  });

  await logAuditEvent({
    actorId: context.userId,
    action: "content.update",
    resource: `content_item:${updated.id}`,
    metadata: {
      fromStatus: existing.status,
      toStatus: updated.status,
    },
  });

  return updated;
}

/**
 * Deletes a content item if the user has permission.
 */
export async function deleteContentItem(
  id: string,
  context: AuthorizationContext,
  dependencies: ContentServiceDependencies = {},
): Promise<void> {
  const dbClient = dependencies.db ?? prisma;
  const existing = await dbClient.contentItem.findUnique({ where: { id } });

  if (!existing) {
    throw new ContentNotFoundError("Content item not found.");
  }

  if (!hasCapability(context, CAPABILITIES.CONTENT_DELETE)) {
    throw new ContentForbiddenError("Missing content.delete capability.");
  }

  if (!canManageContentOwnership(context, existing.authorId)) {
    throw new ContentForbiddenError("User cannot delete this content item.");
  }

  await dbClient.contentItem.delete({ where: { id } });

  await logAuditEvent({
    actorId: context.userId,
    action: "content.delete",
    resource: `content_item:${id}`,
    metadata: {
      authorId: existing.authorId,
    },
  });
}

async function ensureUniqueSlug(
  baseSlug: string,
  typeId: string,
  existingId: string | undefined,
  dbClient: Prisma.TransactionClient | typeof prisma,
): Promise<string> {
  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const conflict = await dbClient.contentItem.findFirst({
      where: {
        typeId,
        slug: candidate,
        ...(existingId ? { id: { not: existingId } } : {}),
      },
      select: { id: true },
    });

    if (!conflict) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}
