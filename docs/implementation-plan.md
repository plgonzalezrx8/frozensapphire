# Implementation Plan
## Project: frozensapphire (Next.js CMS)

This document translates the TRD and parity matrix into an execution plan with milestones, dependencies, and immediate tasks.

## 1) Delivery Strategy

- Build in **vertical slices** (auth -> content -> media -> publishing -> comments) so each milestone ships usable functionality.
- Keep all MVP scope aligned to **P0 parity targets** from the WordPress matrix.
- Delay P1/P2 items unless they unblock a P0 item.

## 2) Milestones and Exit Criteria

## Milestone 0 — Foundations (Week 1)
**Goal:** Establish the baseline engineering platform.

### Work items
- Initialize Next.js + TypeScript + ESLint + Prettier.
- Add Prisma + PostgreSQL schema baseline.
- Add Auth.js and session strategy.
- Add project structure (`src/modules/*`, `src/lib/*`, `src/app/(admin)` and public routes).
- Add CI workflow for lint, typecheck, and test commands.

### Exit criteria
- Project runs locally with a health endpoint.
- DB migration pipeline works in dev.
- CI passes on pull requests.

## Milestone 1 — Identity + RBAC + Admin Shell (Weeks 2–3)
**Goal:** Secure admin access and role-based authorization.

### Work items
- Implement users, roles, capabilities schema.
- Seed default roles: Administrator, Editor, Author, Contributor, Subscriber.
- Add authorization middleware and helper guards.
- Build admin layout and nav shell.
- Add audit log service for privileged actions.

### Exit criteria
- Role checks enforced on protected admin/API endpoints.
- Admin shell accessible to authorized users only.
- Unauthorized attempts are logged and return 403.

## Milestone 2 — Content Core (Weeks 4–5)
**Goal:** Create/manage posts, pages, and custom content types.

### Work items
- Add content types and content items CRUD.
- Implement statuses: draft, pending, scheduled, published.
- Add slug generation and uniqueness constraints.
- Add reading settings (latest posts vs static front page).
- Add basic public rendering routes for posts/pages.

### Exit criteria
- Content can be created, edited, published, and rendered publicly.
- Slug/permalink behavior is deterministic and tested.

## Milestone 3 — Editor + Media (Weeks 6–8)
**Goal:** Usable authoring experience with media support.

### Work items
- Integrate block editor framework (Tiptap or Lexical decision by week 6).
- Implement core block set: paragraph, heading, image, gallery, embed.
- Add media upload service to object storage.
- Add media library browser with search/filter.
- Add image variants (thumbnail + responsive sizes).

### Exit criteria
- Editors can publish media-rich posts from admin.
- Media metadata can be updated and retrieved.

## Milestone 4 — Taxonomies + Comments + API v1 (Weeks 9–10)
**Goal:** Complete baseline CMS workflows and external access.

### Work items
- Categories/tags models and assignment flows.
- Comment submission and moderation queue.
- REST API v1 for content, taxonomies, media, comments.
- API auth via session + scoped token support.

### Exit criteria
- Public comment flow and moderation works end-to-end.
- API endpoints are documented and pass integration tests.

## Milestone 5 — Hardening + MVP Release (Weeks 11–12)
**Goal:** Stabilize and ship MVP.

### Work items
- Revisions/autosave minimum implementation.
- Health dashboard checks (DB/cache/storage/queue).
- Security hardening (rate limiting, CSRF, upload validation).
- E2E test coverage for critical paths.
- Production deployment runbook and rollback plan.

### Exit criteria
- P0 scope accepted in staging.
- No critical security defects.
- Release checklist completed.

## 3) Dependency Order

1. Foundation stack (framework, DB, auth)  
2. RBAC + admin shell  
3. Content model + rendering  
4. Editor + media  
5. Taxonomies/comments/API  
6. Hardening and release

## 4) Immediate Execution Backlog (Next 10 Working Days)

### Day 1–2
- Create Next.js app and module folders.
- Add Prisma, DB config, first migration.
- Add local docker compose for PostgreSQL + Redis.

### Day 3–4
- Implement user/role/capability schema + seeds.
- Add Auth.js login/session and admin route protection.

### Day 5–6
- Build admin shell layout and dashboard placeholder cards.
- Add audit log utility and middleware integration.

### Day 7–8
- Implement `content_types` and `content_items` tables.
- Add CRUD routes and admin forms for posts/pages.

### Day 9–10
- Add slug generation and content status transitions.
- Add baseline tests for role checks and content CRUD.

## 5) Definition of “Started” (Get to Work)

Engineering execution is considered started when all of the following are merged:
- Framework scaffold with running app
- Database schema and migration workflow
- Authentication and RBAC foundation
- First end-to-end content CRUD route (create and list posts)

## 6) Risks and Mitigations

- **Editor complexity risk:** Timebox block-editor choice; ship minimal block set first.
- **Permission drift risk:** Centralize capability checks in shared authz service.
- **Schema churn risk:** Freeze naming conventions before Milestone 2 migrations.
- **Scope creep risk:** Enforce P0-only rule through sprint planning and PR review checklist.

## 7) Tracking Cadence

- Weekly milestone review (scope, blockers, risk)
- Daily async standup (done/next/blockers)
- Friday release train to staging with test report

