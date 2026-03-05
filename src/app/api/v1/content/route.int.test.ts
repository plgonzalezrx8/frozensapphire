/**
 * Integration tests for content collection route authorization and validation.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const getSessionUser = vi.fn();

vi.mock("@/lib/auth/session", () => ({
  getSessionUser,
}));

vi.mock("@/modules/content/service", async () => {
  const actual = await vi.importActual<typeof import("@/modules/content/service")>(
    "@/modules/content/service",
  );

  return {
    ...actual,
    listContentItems: vi.fn().mockResolvedValue({
      data: [],
      meta: { page: 1, per_page: 20, total: 0 },
    }),
    createContentItem: vi.fn(),
  };
});

describe("/api/v1/content route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 for anonymous mutations", async () => {
    const { POST } = await import("@/app/api/v1/content/route");
    getSessionUser.mockResolvedValue(null);

    const response = await POST(
      new Request("http://localhost/api/v1/content", {
        method: "POST",
        body: JSON.stringify({ title: "Nope" }),
      }),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: {
        code: "unauthorized",
        message: "Authentication is required.",
      },
    });
  });

  it("returns standardized validation errors", async () => {
    const { POST } = await import("@/app/api/v1/content/route");
    getSessionUser.mockResolvedValue({
      id: "editor-1",
      email: "editor@example.com",
      name: "Editor",
      roles: ["Editor"],
      capabilities: ["content.create"],
    });

    const response = await POST(
      new Request("http://localhost/api/v1/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invalid: true }),
      }),
    );

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.error.code).toBe("validation_error");
    expect(payload.error.message).toBe("Request payload failed validation.");
  });

  it("returns 403 when capability is missing", async () => {
    const { POST } = await import("@/app/api/v1/content/route");
    getSessionUser.mockResolvedValue({
      id: "viewer-1",
      email: "viewer@example.com",
      name: "Viewer",
      roles: ["Subscriber"],
      capabilities: [],
    });

    const response = await POST(
      new Request("http://localhost/api/v1/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typeId: "de4f4f95-a1f3-4e28-9640-8b63f91f2d3c",
          title: "Forbidden",
          status: "draft",
          content: {},
        }),
      }),
    );

    expect(response.status).toBe(403);
    const payload = await response.json();
    expect(payload.error.code).toBe("forbidden");
  });
});
