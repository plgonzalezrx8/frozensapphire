# 00 - Start Here

**Last Updated:** March 6, 2026
**Status:** Planned/backlog as of 2026-05-02

## Purpose

Provide a short onboarding path for contributors while delegating live planning state to Linear.

## Current State

The project has a working baseline: scaffolded Next.js app, Prisma schema, CI/testing harness, credentials auth, RBAC guards, and first content CRUD APIs/UI.

- Planning source: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
- Current Linear status: planned/backlog as of 2026-05-02, behind TheLivingOrthodoxSynaxarion, Strikepoint, and LunaLighthouse
- Resume focus: Milestone 1 hardening (auth, RBAC, and first content CRUD) only when Linear promotes the project back into an active lane
- Resume issue snapshot:
  - [BLU-39 — Stabilize auth and RBAC behavior](https://linear.app/blueforce-innovations/issue/BLU-39/stabilize-auth-and-rbac-behavior)
  - [BLU-40 — Expand content CRUD tests and edge-case coverage](https://linear.app/blueforce-innovations/issue/BLU-40/expand-content-crud-tests-and-edge-case-coverage)
  - [BLU-41 — Add auth and RBAC audit event coverage](https://linear.app/blueforce-innovations/issue/BLU-41/add-auth-and-rbac-audit-event-coverage)
- Current blocker: none active.

## Getting Started

1. Install dependencies: `pnpm install`
2. Copy environment file: `cp .env.example .env`
3. Start local services: `docker-compose up -d`
4. Generate Prisma client: `pnpm prisma:generate`
5. Apply migrations: `pnpm prisma:migrate`
6. Run dev server: `pnpm dev`

## What to Read Next

- Architecture: `DEV-DOCS/ARCHITECTURE.md`
- Coding standards: `DEV-DOCS/CODING-STANDARDS.md`
- Branch workflow: `DEV-DOCS/GIT-WORKFLOW.md`
- Requirements: `DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md`
- Roadmap intent: `DEV-DOCS/ROADMAP.md`
