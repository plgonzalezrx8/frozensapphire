/**
 * Unit tests for static role capability mappings.
 */
import { describe, expect, it } from "vitest";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import { resolveCapabilitiesFromRoleNames } from "@/modules/rbac/roleMatrix";

describe("resolveCapabilitiesFromRoleNames", () => {
  it("returns seeded contributor capabilities", () => {
    const capabilities = resolveCapabilitiesFromRoleNames(["Contributor"]);

    expect(capabilities).toContain(CAPABILITIES.ADMIN_ACCESS);
    expect(capabilities).toContain(CAPABILITIES.CONTENT_CREATE);
    expect(capabilities).not.toContain(CAPABILITIES.CONTENT_PUBLISH);
  });

  it("merges capabilities across roles", () => {
    const capabilities = resolveCapabilitiesFromRoleNames(["Author", "Editor"]);

    expect(capabilities).toContain(CAPABILITIES.CONTENT_PUBLISH);
    expect(capabilities).toContain(CAPABILITIES.CONTENT_DELETE);
  });
});
