/**
 * Unit tests for RBAC guard helpers.
 */
import { describe, expect, it } from "vitest";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  requireAuthenticatedUser,
  requireCapability,
  toAuthorizationContext,
} from "@/modules/rbac/guards";

describe("rbac guards", () => {
  it("returns 401 when session user is missing", async () => {
    const response = requireAuthenticatedUser(null);

    expect(response).not.toBeNull();
    expect(response?.status).toBe(401);
    expect(await response?.json()).toEqual({
      error: {
        code: "unauthorized",
        message: "Authentication is required.",
      },
    });
  });

  it("returns 403 when capability is missing", async () => {
    const context = toAuthorizationContext({
      id: "user-1",
      email: "user@example.com",
      name: "User",
      roles: ["Contributor"],
      capabilities: [CAPABILITIES.CONTENT_CREATE],
    });

    const response = requireCapability(context, CAPABILITIES.CONTENT_PUBLISH);

    expect(response).not.toBeNull();
    expect(response?.status).toBe(403);
  });
});
