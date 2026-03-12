# Testing and Performance

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Define test strategy and performance goals.

## Current State

Vitest covers unit and integration tests. Playwright E2E is part of the platform-distribution lane and must become a required PR gate for `development`.

## Testing Plan

- Unit tests for domain services
- Integration tests for API boundaries
- E2E tests for admin critical paths

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
