/**
 * Tests for plugin hook registry behavior.
 */
import { describe, expect, it } from "vitest";
import {
  addAction,
  addFilter,
  applyFilters,
  doAction,
  removePluginHooks,
} from "@/modules/plugins/hooks";

describe("hooks", () => {
  it("executes actions in registration order", () => {
    const calls: string[] = [];
    const actionName = `test.action.${Math.random().toString(36).slice(2)}`;

    addAction(
      actionName,
      () => {
        calls.push("first");
      },
      { plugin: "plugin-a" },
    );
    addAction(
      actionName,
      () => {
        calls.push("second");
      },
      { plugin: "plugin-b" },
    );

    doAction(actionName, { ok: true });

    expect(calls).toEqual(["first", "second"]);
  });

  it("applies filters sequentially", () => {
    const filterName = `test.filter.${Math.random().toString(36).slice(2)}`;

    addFilter<number>(filterName, (value) => value + 2, { plugin: "plugin-a" });
    addFilter<number>(filterName, (value) => value * 3, { plugin: "plugin-a" });

    const result = applyFilters(filterName, 4);

    expect(result).toBe(18);
  });

  it("removes hooks registered by a plugin", () => {
    const actionName = `test.remove.${Math.random().toString(36).slice(2)}`;
    const calls: string[] = [];

    addAction(
      actionName,
      () => {
        calls.push("kept");
      },
      { plugin: "plugin-a" },
    );
    addAction(
      actionName,
      () => {
        calls.push("removed");
      },
      { plugin: "plugin-b" },
    );

    removePluginHooks("plugin-b");
    doAction(actionName, { ok: true });

    expect(calls).toEqual(["kept"]);
  });
});
