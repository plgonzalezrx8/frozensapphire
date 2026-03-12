# Implementation Plan

**Last Updated:** March 11, 2026
**Status:** In Progress

> Linear is the single source of truth for live planning state: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac). This file preserves milestone definitions, exit criteria, and delivery strategy.

## Purpose

Describe milestone delivery, sequencing, and exit criteria for the MVP build.

## Current State

Plan is approved; implementation is in progress and incomplete.

## Project: frozensapphire (Next.js CMS)

This document translates the TRD and parity matrix into an execution plan with locked decisions and milestone delivery targets.

## 1) Locked Decisions

- **Editor:** Tiptap
- **API:** REST v1 only (no GraphQL in MVP)
- **Tenancy:** Single-tenant schema for MVP
- **Scope:** Follow TRD MVP scope (includes import/export, privacy tools, and site health)
- **Plugins:** In-process hooks for MVP; sandbox later
- **Distribution:** Self-hosted package, not a hosted SaaS
- **Install paths:** Docker-first plus manual Node deployment
- **Auth:** Local Auth.js credentials/session auth
- **Infra contract:** Generic Postgres, Redis, and S3-compatible storage

## 2) Delivery Strategy

- Build in **vertical slices** (auth → content → media → publishing → comments) to keep milestones shippable.
- Keep MVP scope aligned to **P0 parity targets** plus TRD MVP items.
- Defer P1/P2 unless they unblock P0 delivery.
- Use worktree lanes to isolate parallel delivery for platform, content, editor/media, site structure, discussion/API, and ops/release.

## 3) Milestones and Exit Criteria

### Milestone 0 — Foundation
**Goal:** Establish baseline engineering platform.

**Work items**
- Next.js App Router scaffold with TypeScript and Tailwind.
- Prisma + PostgreSQL base schema and migrations.
- Redis + MinIO local stack via docker-compose.
- Health endpoint (`/api/v1/health`).
- CI pipeline for lint/typecheck/tests.
- Self-hosted packaging baseline (Docker/manual install documentation and runtime contract).

**Exit criteria**
- App runs locally and responds to `/api/v1/health`.
- Prisma migrations execute successfully in dev.
- A new user can start the stack with documented self-hosting instructions.

### Milestone 1 — Auth, RBAC, Audit, Admin Shell
**Goal:** Secure admin access and role-based authorization.

**Work items**
- Users/roles/capabilities schema and seed.
- Auth.js credentials flow (email/password).
- RBAC middleware and guard helpers.
- Audit log service.
- Admin layout + dashboard shell.

**Exit criteria**
- Admin shell reachable with role checks enforced.
- Unauthorized access returns 403 and logs audit entry.

### Milestone 2 — Content Core
**Goal:** Create/manage posts, pages, and custom content types.

**Work items**
- `content_types` and `content_items` CRUD.
- Status workflow (draft/pending/scheduled/published).
- Slug generation and uniqueness rules.
- Public rendering routes for posts/pages.
- Reading settings (static front page vs latest posts).

**Exit criteria**
- Content can be created, edited, published, and rendered publicly.
- Slug/permalink behavior deterministic and tested.

### Milestone 3 — Editor + Media
**Goal:** Usable authoring experience with media support.

**Work items**
- Tiptap block editor integration.
- Core blocks (paragraph, heading, image, gallery, embed).
- Media upload service and metadata editing.
- Media library grid with search/filter.
- Image variants worker (thumbnail + responsive sizes).

**Exit criteria**
- Editors can publish media-rich posts.
- Media metadata can be updated and retrieved.

### Milestone 4 — Taxonomies, Menus, Settings, Themes
**Goal:** Finish site structure and theming base.

**Work items**
- Taxonomies/terms with assignment flow.
- Menu management + theme menu locations.
- Settings UI (general/reading/writing/media/discussion/permalinks).
- Theme activation and template rendering.

**Exit criteria**
- Taxonomies and menus affect public rendering.
- Settings changes applied immediately or within documented cache window.

### Milestone 5 — Comments + REST API v1
**Goal:** Complete baseline CMS workflows and external access.

**Work items**
- Comment submission + moderation flow.
- REST API v1 for core entities.
- Scoped API tokens with revocation.

**Exit criteria**
- Public comment flow and moderation works end-to-end.
- API endpoints documented and pass integration tests.

### Milestone 6 — Import/Export + Privacy + Health
**Goal:** Deliver operational tooling required by TRD MVP scope.

**Work items**
- JSON export job and downloadable artifact.
- JSON import job with idempotency.
- Privacy request workflow (export/erase).
- Health dashboard checks (DB/cache/storage/queue).

**Exit criteria**
- Import/export flows complete with progress reporting.
- Health dashboard reflects system checks.

### Milestone 7 — Plugins + Hooks (MVP Beta)
**Goal:** Provide extension points.

**Work items**
- Plugin registry and lifecycle (install/activate/deactivate/uninstall).
- Hook registry with typed action/filter contracts.
- Recovery mode for plugin failures.

**Exit criteria**
- Plugins can register hooks without breaking core flows.

### Milestone 8 — Hardening + Release
**Goal:** Stabilize and ship MVP.

**Work items**
- CSRF protection for session mutations.
- Rate limiting for login/comments/token endpoints.
- Upload validation and scanning stubs.
- E2E coverage for publish flow/media/moderation.
- Performance baseline tests.
- Release checklist + staging runbook.

**Exit criteria**
- P0 scope accepted in staging.
- No critical security defects.
- Release checklist complete.

## 4) Immediate Execution Backlog (Next 10 Working Days)

### Day 1–2
- Scaffold Next.js app + module folders.
- Add Prisma schema and migration pipeline.
- Add docker-compose for Postgres + Redis + MinIO.

### Day 3–4
- Implement user/role/capability schema + seeds.
- Add Auth.js login/session and admin protection.

### Day 5–6
- Build admin shell layout and dashboard placeholders.
- Add audit log utility and middleware integration.

### Day 7–8
- Implement `content_types` and `content_items` CRUD.
- Add admin forms for posts/pages.

### Day 9–10
- Add slug generation + status transitions.
- Add baseline tests for role checks and content CRUD.

## 5) Definition of “Started”

Engineering execution is considered started when all of the following are merged:
- Framework scaffold with running app
- Database schema and migration workflow
- Authentication and RBAC foundation
- First end-to-end content CRUD route (create and list posts)

## 6) Risks and Mitigations

- **Editor complexity risk:** Timebox block-editor work; ship minimal block set first.
- **Permission drift risk:** Centralize capability checks in shared authz service.
- **Schema churn risk:** Freeze naming conventions before Milestone 2 migrations.
- **Scope creep risk:** Enforce P0-only rule in sprint planning and PR review.

## 7) Tracking Cadence

- Weekly milestone review (scope, blockers, risk)
- Daily async standup (done/next/blockers)
- Friday release train to staging with test report
