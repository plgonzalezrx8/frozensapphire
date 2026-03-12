/**
 * Tests for the health service baseline report.
 */
import { describe, expect, it } from "vitest";
import { getHealthReport } from "@/modules/health/healthService";

describe("getHealthReport", () => {
  it("returns a report with checks", () => {
    const report = getHealthReport();

    expect(["ok", "degraded"]).toContain(report.status);
    expect(report.checks.length).toBeGreaterThan(0);
    expect(report.checks[0]).toHaveProperty("name");
  });
});
