/**
 * Vitest configuration for unit and integration tests.
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
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/",
        "temp-next/",
        "**/temp-next/**",
        "**/*.d.ts",
        "src/app/**/route.ts", // API routes are covered in integration tests later.
      ],
    },
  },
});
