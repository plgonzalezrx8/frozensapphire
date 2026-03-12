# Testing and Performance

**Last Updated:** March 12, 2026
**Status:** In Progress

## Purpose

Define test strategy and performance goals.

## Current State

Vitest covers unit and integration tests. Playwright E2E is now part of the required `development` gate and is expected to run against a built app on an isolated port when local machines already have other apps listening on common dev ports.

## Testing Plan

- Unit tests for domain services
- Integration tests for API boundaries
- E2E tests for admin critical paths
- Local E2E should use an explicit free port and matching `NEXTAUTH_URL`/`PLAYWRIGHT_BASE_URL` when `3000` or other dev ports are already occupied

## CI Gates

- `pnpm lint`
- `pnpm typecheck`
- `pnpm comments:check`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm test:e2e`
- `pnpm build`
- CodeQL workflow

## Performance Goals

- Admin read endpoints P95 < 300ms for <= 100k records
