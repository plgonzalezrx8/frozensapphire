# Testing and Performance

**Last Updated:** March 5, 2026  
**Status:** In Progress

## Purpose

Define required test coverage and CI quality gates for MVP delivery.

## Current State

Unit and integration tests are running in CI. Playwright E2E is now added and CI orchestration is configured to run against a production build.

## Required Test Pyramid

### Unit Tests (Required on every PR)

Purpose: verify deterministic, pure logic with fast feedback.

Coverage priorities:
- RBAC capability resolution and policy helpers.
- Zod validation schemas.
- Slug and status transition utilities.
- Core data transformation helpers.

Rules:
- No external network calls.
- No real database dependency.
- Deterministic assertions only.

Code paths:
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/src/modules/**`

### Integration Tests (Required on every PR)

Purpose: validate route handlers and service layer behavior against Prisma schema and DB constraints.

Coverage priorities:
- Auth and authorization checks on protected server mutations.
- Content CRUD + ownership boundaries.
- Unique constraints and schema behavior.
- Standardized API error contract.

DB rules:
- CI uses a non-production Neon branch per PR.
- Migrations are applied before tests using `prisma migrate deploy`.
- Deterministic seed profile: `pnpm seed:test`.

Code paths:
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/src/app/api/v1/**`
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/src/modules/**`

### Playwright E2E (Required on every PR)

Purpose: validate browser-visible user flows against built app artifacts.

Required baseline scenarios:
1. Authentication flow works.
2. Protected route redirects unauthenticated users.
3. Primary CRUD happy path works.
4. Cross-user authorization denial is enforced.
5. At least one negative error-display path is validated.

Runtime rules:
- Run against `next build` + `next start`.
- Use deterministic `pnpm seed:e2e` fixtures.
- Capture trace/screenshot/video on failures.

Code paths:
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/playwright.config.ts`
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/tests/e2e/**`

## Required CI Quality Gates

The following checks must pass before merge into `development` or `master`:
- `pnpm comments:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm test:e2e`
- `pnpm build`
- CodeQL workflow is non-failing

Workflow path:
- `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/ci.yml`

## Performance Baseline

MVP baseline target:
- Admin read endpoints P95 < 300ms for datasets up to 100k records using indexed queries.

Performance work beyond baseline is deferred unless regressions block release.
