# Development Status

**Last Updated:** March 5, 2026  
**Current Phase:** Milestone 1 in Progress (Auth + RBAC + First Content CRUD)

## Current Status

**Completed**
- Next.js scaffold with App Router.
- Prisma schema and seed baseline.
- API route skeleton for REST v1.
- Credentials auth flow and admin route protection.
- RBAC capability guard and baseline role-capability mapping.
- First content CRUD vertical slice (API + minimal admin UI).
- CI gates: comment policy, lint, typecheck, unit tests, integration tests, and build.

**In Progress**
- Expanding content workflow hardening (status transitions, ownership checks).
- Auth/RBAC polish and audit event coverage.

**Not Started**
- Tiptap editor.
- Media upload pipeline.
- Taxonomies/menus/themes/plugins runtime features.
- Import/export and privacy workflows.

## Sprint Focus (March 9 to March 20, 2026)

- Stabilize auth and RBAC behavior.
- Expand content CRUD tests and edge-case coverage.
- Keep CI merge gates strict and non-optional.
- Prepare next sprint handoff for editor/media scope.

## Blockers

- None active. Remaining risks are implementation depth and test coverage for upcoming editor/media work.
