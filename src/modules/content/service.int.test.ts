/**
 * Integration-style tests for content service authorization behavior.
 */
import { describe, expect, it, vi } from "vitest";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  ContentForbiddenError,
  createContentItem,
  deleteContentItem,
  updateContentItem,
} from "@/modules/content/service";
import { logAuditEvent } from "@/modules/audit/service";

vi.mock("@/modules/audit/service", () => ({
  logAuditEvent: vi.fn().mockResolvedValue(undefined),
}));

describe("content service integration", () => {
  it("rejects publish attempts by contributors", async () => {
    const db = {
      contentItem: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn(),
      },
    } as any;

    await expect(
      createContentItem(
        {
          typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
          title: "Draft",
          status: "published",
          content: {},
        },
        {
          userId: "contributor-1",
          roles: ["Contributor"],
          capabilities: [CAPABILITIES.CONTENT_CREATE, CAPABILITIES.CONTENT_EDIT],
        },
        { db },
      ),
    ).rejects.toBeInstanceOf(ContentForbiddenError);
  });

  it("allows editors to publish content", async () => {
    const db = {
      contentItem: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({
          id: "item-1",
          typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
          authorId: "editor-1",
          title: "Published",
          slug: "published",
          status: "published",
          content: {},
          fields: null,
          scheduledAt: null,
          publishedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      },
    } as any;

    const created = await createContentItem(
      {
        typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
        title: "Published",
        status: "published",
        content: {},
      },
      {
        userId: "editor-1",
        roles: ["Editor"],
        capabilities: [
          CAPABILITIES.CONTENT_CREATE,
          CAPABILITIES.CONTENT_EDIT,
          CAPABILITIES.CONTENT_PUBLISH,
        ],
      },
      { db },
    );

    expect(created.status).toBe("published");
  });

  it("allows author to edit own draft and blocks editing another author item", async () => {
    const db = {
      contentItem: {
        findUnique: vi
          .fn()
          .mockResolvedValueOnce({
            id: "item-1",
            typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
            authorId: "author-1",
            title: "Mine",
            slug: "mine",
            status: "draft",
            content: {},
            fields: null,
            scheduledAt: null,
            publishedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .mockResolvedValueOnce({
            id: "item-2",
            typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
            authorId: "author-2",
            title: "Not Mine",
            slug: "not-mine",
            status: "draft",
            content: {},
            fields: null,
            scheduledAt: null,
            publishedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        findFirst: vi.fn().mockResolvedValue(null),
        update: vi.fn().mockResolvedValue({
          id: "item-1",
          typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
          authorId: "author-1",
          title: "Mine Updated",
          slug: "mine",
          status: "draft",
          content: {},
          fields: null,
          scheduledAt: null,
          publishedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      },
    } as any;

    const context = {
      userId: "author-1",
      roles: ["Author"],
      capabilities: [CAPABILITIES.CONTENT_EDIT, CAPABILITIES.CONTENT_PUBLISH],
    };

    const updated = await updateContentItem(
      "item-1",
      { title: "Mine Updated" },
      context,
      { db },
    );

    expect(updated.title).toBe("Mine Updated");

    await expect(
      updateContentItem("item-2", { title: "Illegal" }, context, { db }),
    ).rejects.toBeInstanceOf(ContentForbiddenError);
  });

  it("logs audit events when deleting content", async () => {
    const db = {
      contentItem: {
        findUnique: vi.fn().mockResolvedValue({
          id: "item-1",
          typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
          authorId: "editor-1",
          title: "Delete Me",
          slug: "delete-me",
          status: "draft",
          content: {},
          fields: null,
          scheduledAt: null,
          publishedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        delete: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    await deleteContentItem(
      "item-1",
      {
        userId: "editor-1",
        roles: ["Editor"],
        capabilities: [CAPABILITIES.CONTENT_DELETE],
      },
      { db },
    );

    expect(logAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "content.delete",
        resource: "content_item:item-1",
      }),
    );
  });
});
