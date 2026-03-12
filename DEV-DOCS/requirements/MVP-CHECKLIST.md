# MVP Execution Checklist

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Track MVP completion against the TRD scope.

## Current State

Foundation scaffolding exists; most items are not yet complete.

Use this list to track implementation progress against TRD MVP scope.

## Foundation
- [ ] Next.js App Router scaffolded (TypeScript, lint, format)
- [ ] Prisma configured with PostgreSQL
- [ ] Checked-in Prisma migrations created
- [ ] Deterministic seed profiles added (`seed:dev`, `seed:test`, `seed:e2e`)
- [ ] Redis configured for queues/cache
- [ ] MinIO configured for local S3-compatible storage
- [ ] Docker-first self-hosting install path documented
- [ ] Manual Node deployment path documented
- [ ] CI runs lint + typecheck + tests

## Auth and Authorization
- [ ] Auth.js configured (credentials provider)
- [ ] User profiles implemented
- [ ] Default roles seeded
- [ ] Capability guard middleware implemented
- [ ] Audit log service wired for privileged actions

## Content and Publishing
- [ ] Post/page CRUD
- [ ] Custom content type registration
- [ ] Status workflow (draft/pending/scheduled/published)
- [ ] Slug/permalink rules implemented
- [ ] Reading settings (static front page/latest posts)

## Media and Editor
- [ ] Media upload endpoint and storage integration
- [ ] Media library UI with filters
- [ ] Block editor with core blocks (Tiptap)

## Site Structure
- [ ] Menu management
- [ ] Theme activation and template rendering
- [ ] Public rendering for post/page/archive

## Discussion
- [ ] Comment submission
- [ ] Moderation queue and actions
- [ ] Discussion settings

## API and Ops
- [ ] REST API v1 for core entities
- [ ] Scoped API token auth
- [ ] Health dashboard checks
- [ ] Import/export jobs (JSON)
- [ ] Privacy tools (export + erasure requests)
- [ ] Release artifacts and upgrade notes documented

## Quality Gates
- [ ] Unit tests for domain logic
- [ ] Integration tests for authz + CRUD
- [ ] E2E tests for publish path
- [ ] Security checks (CSRF/rate limiting/upload validation)
