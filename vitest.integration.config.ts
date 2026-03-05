/**
 * Integration test configuration for route handlers and service wiring.
 */
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.int.test.ts"],
    coverage: {
      enabled: false,
    },
  },
});
