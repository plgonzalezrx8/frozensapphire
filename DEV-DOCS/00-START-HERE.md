# 00 - Start Here

**Last Updated:** March 12, 2026
**Status:** In Progress

## Purpose

Provide a short onboarding path for contributors while delegating live planning state to Linear.

## Current State

The project now has a stronger working baseline: scaffolded Next.js app, checked-in Prisma migrations, deterministic seed profiles, CI/testing harness, Playwright baseline, credentials auth, RBAC guards, first content CRUD APIs/UI, and a self-hosted distribution model.

- Planning source: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
- Current phase: Milestone 1 in progress (auth, RBAC, audit coverage, and content-core hardening)
- Primary active issue: [BLU-39 — Stabilize auth and RBAC behavior](https://linear.app/blueforce-innovations/issue/BLU-39/stabilize-auth-and-rbac-behavior)
- Immediate next issues:
  - [BLU-40 — Expand content CRUD tests and edge-case coverage](https://linear.app/blueforce-innovations/issue/BLU-40/expand-content-crud-tests-and-edge-case-coverage)
  - [BLU-41 — Add auth and RBAC audit event coverage](https://linear.app/blueforce-innovations/issue/BLU-41/add-auth-and-rbac-audit-event-coverage)
- Current blocker: none active. The main operational risk is keeping local Docker-backed services healthy enough to run the full E2E gate consistently.

## Getting Started

1. Install dependencies: `pnpm install`
2. Copy environment file: `cp .env.example .env`
3. Start local services: `docker compose up -d`
4. Generate Prisma client: `pnpm prisma:generate`
5. Apply migrations: `pnpm prisma:migrate`
6. Seed local data: `pnpm seed:dev`
7. Run dev server: `pnpm dev`

## What to Read Next

- Architecture: `DEV-DOCS/ARCHITECTURE.md`
- Coding standards: `DEV-DOCS/CODING-STANDARDS.md`
- Branch workflow: `DEV-DOCS/GIT-WORKFLOW.md`
- Self-hosting model: `DEV-DOCS/SELF-HOSTING.md`
- Worktree execution model: `DEV-DOCS/WORKTREE-LANES.md`
- Requirements: `DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md`
- Roadmap intent: `DEV-DOCS/ROADMAP.md`
