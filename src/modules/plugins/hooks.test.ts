/**
 * Tests for plugin hook registry behavior.
 */
import { describe, expect, it } from "vitest";
import { addAction, addFilter, applyFilters, doAction } from "@/modules/plugins/hooks";

describe("hooks", () => {
  it("executes actions in registration order", () => {
    const calls: string[] = [];
    const actionName = `test.action.${Math.random().toString(36).slice(2)}`;

    addAction(actionName, () => {
      calls.push("first");
    });
    addAction(actionName, () => {
      calls.push("second");
    });

    doAction(actionName, { ok: true });

    expect(calls).toEqual(["first", "second"]);
  });

  it("applies filters sequentially", () => {
    const filterName = `test.filter.${Math.random().toString(36).slice(2)}`;

    addFilter<number>(filterName, (value) => value + 2);
    addFilter<number>(filterName, (value) => value * 3);

    const result = applyFilters(filterName, 4);

    expect(result).toBe(18);
  });
});
