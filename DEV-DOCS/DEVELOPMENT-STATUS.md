# Development Status

**Last Updated:** March 12, 2026
**Current Phase:** Milestone 1 in Progress (Auth + RBAC + First Content CRUD)

## Current Status

**Completed**
- Next.js scaffold with App Router.
- Prisma schema, checked-in migrations, and deterministic seed baseline.
- API route skeleton for REST v1.
- Credentials auth flow and admin route protection.
- RBAC capability guard and baseline role-capability mapping.
- First content CRUD vertical slice (API + minimal admin UI).
- Self-hosted packaging baseline: `Dockerfile`, `docker-compose.selfhost.yml`, `.env.example`, and runtime validation helpers.
- CI gates: comment policy, lint, typecheck, unit tests, integration tests, Playwright E2E, build, CodeQL, and Dependabot.

**In Progress**
- Stabilizing auth and RBAC behavior via [BLU-39](https://linear.app/blueforce-innovations/issue/BLU-39/stabilize-auth-and-rbac-behavior).
- Expanding content CRUD tests and edge-case coverage via [BLU-40](https://linear.app/blueforce-innovations/issue/BLU-40/expand-content-crud-tests-and-edge-case-coverage).
- Adding auth and RBAC audit event coverage via [BLU-41](https://linear.app/blueforce-innovations/issue/BLU-41/add-auth-and-rbac-audit-event-coverage).
- Verifying the new Playwright and self-hosted runtime baseline against the full local and GitHub Actions gate.

**Not Started**
- Tiptap editor.
- Media upload pipeline.
- Taxonomies/menus/themes/plugins runtime features.
- Import/export and privacy workflows.

## Sprint Focus (March 9 to March 20, 2026)

- Stabilize auth and RBAC behavior via [BLU-39](https://linear.app/blueforce-innovations/issue/BLU-39/stabilize-auth-and-rbac-behavior).
- Expand content CRUD tests and edge-case coverage via [BLU-40](https://linear.app/blueforce-innovations/issue/BLU-40/expand-content-crud-tests-and-edge-case-coverage).
- Add auth and RBAC audit event coverage via [BLU-41](https://linear.app/blueforce-innovations/issue/BLU-41/add-auth-and-rbac-audit-event-coverage).
- Keep commit-per-feature discipline enforced in every PR.

## Blockers

- None active. Remaining risks are local infrastructure stability for E2E and the unfinished auth/content hardening needed before broader feature work starts.

## Planning Source

- Live planning state: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
- Use this file only as a technical snapshot, not as the authoritative task board.
