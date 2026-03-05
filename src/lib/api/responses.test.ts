/**
 * Tests for shared REST API response helpers.
 */
import { describe, expect, it } from "vitest";
import { jsonError } from "@/lib/api/responses";

describe("jsonError", () => {
  it("returns standard error shape with status", async () => {
    const response = jsonError(400, {
      code: "bad_request",
      message: "Invalid input",
    });

    expect(response.status).toBe(400);

    const payload = await response.json();
    expect(payload).toEqual({
      error: {
        code: "bad_request",
        message: "Invalid input",
      },
    });
  });
});
