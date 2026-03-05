/**
 * Commitlint configuration that enforces project-wide conventional commit policy.
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "refactor", "test", "docs", "chore", "ci", "security"],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "auth",
        "rbac",
        "content",
        "editor",
        "media",
        "taxonomy",
        "settings",
        "themes",
        "plugins",
        "comments",
        "api",
        "db",
        "ci",
        "docs",
        "tests",
        "seed",
        "security",
      ],
    ],
  },
};
