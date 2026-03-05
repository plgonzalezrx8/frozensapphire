/**
 * Input schemas for content CRUD operations.
 */
import { z } from "zod";

export const contentStatusSchema = z.enum([
  "draft",
  "pending",
  "scheduled",
  "published",
]);

export const createContentInputSchema = z.object({
  typeId: z.string().uuid(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).optional(),
  status: contentStatusSchema.default("draft"),
  content: z.unknown().default({}),
  fields: z.record(z.string(), z.unknown()).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const updateContentInputSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
  status: contentStatusSchema.optional(),
  content: z.unknown().optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
});

export const contentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
  status: contentStatusSchema.optional(),
});

export type CreateContentInput = z.infer<typeof createContentInputSchema>;
export type UpdateContentInput = z.infer<typeof updateContentInputSchema>;
export type ContentListQuery = z.infer<typeof contentListQuerySchema>;
