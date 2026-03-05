/**
 * Unit tests for content service helpers.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  ContentValidationError,
  createContentItem,
  isValidStatusTransition,
  normalizeSlug,
} from "@/modules/content/service";

vi.mock("@/modules/audit/service", () => ({
  logAuditEvent: vi.fn().mockResolvedValue(undefined),
}));

describe("content service helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("normalizes slug values", () => {
    expect(normalizeSlug(" Hello, World!! ")).toBe("hello-world");
  });

  it("enforces status transition rules", () => {
    expect(isValidStatusTransition("published", "scheduled")).toBe(false);
    expect(isValidStatusTransition("draft", "published")).toBe(true);
  });

  it("rejects scheduled content without scheduledAt", async () => {
    const db = {
      contentItem: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn(),
      },
    } as any;

    await expect(
      createContentItem(
        {
          typeId: "d5c10cb8-b4be-41bd-9b8e-533ea7c6936f",
          title: "Scheduled Item",
          status: "scheduled",
          content: {},
        },
        {
          userId: "user-1",
          roles: ["Editor"],
          capabilities: [CAPABILITIES.CONTENT_CREATE, CAPABILITIES.CONTENT_PUBLISH],
        },
        { db },
      ),
    ).rejects.toBeInstanceOf(ContentValidationError);
  });

  it("appends numeric suffix when slug conflicts", async () => {
    const db = {
      contentItem: {
        findFirst: vi
          .fn()
          .mockResolvedValueOnce({ id: "existing" })
          .mockResolvedValueOnce(null),
        create: vi.fn().mockResolvedValue({
          id: "new-item",
          typeId: "d5c10cb8-b4be-41bd-9b8e-533ea7c6936f",
          authorId: "user-1",
          title: "Hello World",
          slug: "hello-world-1",
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

    await createContentItem(
      {
        typeId: "d5c10cb8-b4be-41bd-9b8e-533ea7c6936f",
        title: "Hello World",
        status: "draft",
        content: {},
      },
      {
        userId: "user-1",
        roles: ["Editor"],
        capabilities: [CAPABILITIES.CONTENT_CREATE],
      },
      { db },
    );

    expect(db.contentItem.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ slug: "hello-world-1" }),
      }),
    );
  });
});
