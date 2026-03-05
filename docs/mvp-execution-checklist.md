# MVP Execution Checklist

Use this list to track implementation progress against P0 scope.

## Foundation
- [ ] Next.js app scaffolded (TypeScript, lint, format)
- [ ] Prisma configured with PostgreSQL
- [ ] Redis configured for queues/cache
- [ ] CI runs lint + typecheck + tests

## Auth and Authorization
- [ ] Auth.js configured
- [ ] User profiles implemented
- [ ] Default roles seeded
- [ ] Capability guard middleware implemented

## Content and Publishing
- [ ] Post/page CRUD
- [ ] Custom content type registration
- [ ] Status workflow (draft/pending/scheduled/published)
- [ ] Slug/permalink rules implemented

## Media and Editor
- [ ] Media upload endpoint and storage integration
- [ ] Media library UI with filters
- [ ] Block editor with core blocks

## Site Structure
- [ ] Menu management
- [ ] Reading settings (static front page/latest posts)
- [ ] Public rendering for post/page/archive

## Discussion
- [ ] Comment submission
- [ ] Moderation queue and actions
- [ ] Discussion settings

## API and Ops
- [ ] REST API v1 for core entities
- [ ] Scoped API token auth
- [ ] Health dashboard checks
- [ ] Audit logs for privileged actions

## Quality Gates
- [ ] Unit tests for domain logic
- [ ] Integration tests for authz + CRUD
- [ ] E2E tests for publish path
- [ ] Security checks (CSRF/rate limiting/upload validation)

