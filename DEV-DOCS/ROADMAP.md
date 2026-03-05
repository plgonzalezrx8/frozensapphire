# Roadmap

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Provide a milestone-based roadmap aligned with the TRD’s 16-week cadence.

## Current State

Foundation is complete and Milestone 1 is in progress:

- Completed: scaffold, Prisma baseline, API skeleton, CI/test harness.
- Completed: credentials auth baseline, middleware admin protection, RBAC guard foundation.
- In progress: first content CRUD vertical slice hardening and coverage expansion.
- Not started: editor/media/taxonomies/themes/plugins/import/export/privacy.

## Milestones (16-week cadence)

### Milestone 0 — Foundations (Week 1)
- Scaffold Next.js, Prisma, CI, dev tooling
- Health endpoints and baseline API stubs
**Status:** Complete

**Exit criteria**
- App runs locally
- Prisma migrations execute in dev

### Milestone 1 — Auth + RBAC + Admin Shell (Weeks 2–3)
- Auth.js credentials
- RBAC guards and audit logging
- Admin shell protected
**Status:** In Progress

### Milestone 2 — Content Core (Weeks 4–5)
- Content types and items CRUD
- Status workflow and slugs
- Public rendering for posts/pages
**Status:** Planned

### Milestone 3 — Editor + Media (Weeks 6–8)
- Tiptap block editor
- Media upload and variants
- Media library UI
**Status:** Planned

### Milestone 4 — Taxonomies + Menus + Settings + Themes (Weeks 9–10)
- Categories/tags
- Menus and theme activation
- Settings UI
**Status:** Planned

### Milestone 5 — Comments + REST API v1 (Weeks 11–12)
- Comment moderation
- REST API hardening and tokens
**Status:** Planned

### Milestone 6 — Import/Export + Privacy + Health (Weeks 13–14)
- JSON import/export
- Privacy request workflows
- Health dashboard checks
**Status:** Planned

### Milestone 7 — Plugins + Hooks (Weeks 15–16)
- Plugin lifecycle and hook registry
- Recovery mode
**Status:** Planned

### Milestone 8 — Hardening + Release (Post-MVP)
- CSRF/rate limiting
- Upload validation
- E2E and performance tests
**Status:** Planned
