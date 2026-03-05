# Testing and Performance

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Define test strategy and performance goals.

## Current State

Vitest is configured with unit tests; E2E is not yet added.

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
- `pnpm build`

## Performance Goals

- Admin read endpoints P95 < 300ms for <= 100k records
