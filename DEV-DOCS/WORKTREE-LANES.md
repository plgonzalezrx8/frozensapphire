# Worktree Lanes

**Last Updated:** March 11, 2026
**Status:** Active

## Purpose

Define the official worktree and branch layout for the MVP mega sprint.

## Current State

The project now uses dedicated worktrees to reduce merge risk and keep concurrent delivery lanes isolated.

## Lane Map

- `wt-integration` on `development`
  - Rebase, merge order, full-gate verification, release candidate assembly
- `wt-platform-dist` on `feature/mvp-platform-distribution`
  - Packaging, install flows, migrations, seeds, CI, release docs
- `wt-auth-content` on `feature/mvp-auth-content`
  - Auth, RBAC, audit, content core, public rendering
- `wt-editor-media` on `feature/mvp-editor-media`
  - Tiptap, media upload, variants, media library
- `wt-site-structure` on `feature/mvp-site-structure`
  - Taxonomies, menus, settings, themes
- `wt-discussion-api` on `feature/mvp-discussion-api`
  - Comments, REST surface completion, API tokens
- `wt-ops-release` on `feature/mvp-ops-release`
  - Import/export, privacy, health, plugins/hooks, hardening, release checklist

## Lane Rules

1. One sub-agent or engineer per worktree.
2. No cross-lane edits without an explicit handoff through `wt-integration`.
3. Every feature must end in a feature-complete commit.
4. `development` is the release-candidate branch.
5. `master` is the production-ready branch.

## References

- [GIT-WORKFLOW.md](/Users/pedrogonzalez/CascadeProjects/frozensapphire-worktrees/wt-platform-dist/DEV-DOCS/GIT-WORKFLOW.md)
- [DEVELOPMENT-STATUS.md](/Users/pedrogonzalez/CascadeProjects/frozensapphire-worktrees/wt-platform-dist/DEV-DOCS/DEVELOPMENT-STATUS.md)
