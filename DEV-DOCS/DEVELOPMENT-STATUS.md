# Development Status

**Last Updated:** March 5, 2026  
**Current Phase:** Milestone 0 Hardening in Progress (CI/Secrets/Testing Platform)

## Current Status

**Completed**
- Next.js scaffold with App Router.
- Prisma schema and seed baseline.
- API route skeleton for REST v1.
- Credentials auth flow and admin route protection.
- RBAC capability guard and baseline role-capability mapping.
- First content CRUD vertical slice (API + minimal admin UI).
- Deterministic seed profiles for development, integration, and E2E.
- Initial Prisma migration files checked in.
- Playwright E2E baseline suite and configuration.

**In Progress**
- CI hardening with Infisical OIDC, Neon per-PR DB branches, and failure artifacts.
- CodeQL and Dependabot rollout.
- Commit policy enforcement in PR workflow.

**Not Started**
- Neon Auth migration and auth context refactor.
- Tiptap editor.
- Media upload pipeline.
- Taxonomies/menus/themes/plugins runtime features.
- Import/export and privacy workflows.

## Sprint Focus (March 9 to March 20, 2026)

- Finalize CI quality gates and secrets integration.
- Stabilize e2e execution path with seeded fixtures.
- Begin Neon Auth migration for admin/API guards.
- Keep commit-per-feature discipline enforced in every PR.

## Blockers

- External service setup risk remains for Infisical OIDC and Neon branch automation.
