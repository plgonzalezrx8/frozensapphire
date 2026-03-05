# Coding Standards

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Establish code conventions and commenting requirements.

## Current State

Lint, typecheck, and Vitest are wired in CI. Commenting standards are required for all exported modules and complex logic.

## Standards

- TypeScript strict mode on
- Use `src/modules` for domain logic
- Prefer server components by default

## Commenting Requirements

- Every module exports include a short header comment
- Public functions use JSDoc
- Complex logic includes inline rationale comments

## Enforcement

- Run `pnpm comments:check` locally before opening a PR.
- CI blocks merges when exported service/controller functions are missing JSDoc.
- New route/service modules must start with a responsibility header comment.
