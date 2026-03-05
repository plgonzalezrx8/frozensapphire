# 00 - Start Here

**Last Updated:** March 5, 2026  
**Status:** In Progress

## Purpose

Provide a short onboarding path for contributors.

## Current State

The project has a working baseline: scaffolded Next.js app, Prisma schema, CI/testing harness, credentials auth, RBAC guards, and first content CRUD APIs/UI.

## Getting Started

1. Install dependencies: `pnpm install`
2. Copy environment file: `cp .env.example .env`
3. Start local services: `docker-compose up -d`
4. Generate Prisma client: `pnpm prisma:generate`
5. Apply migrations: `pnpm prisma:migrate`
6. Seed local data: `pnpm seed:dev`
7. Run dev server: `pnpm dev`

## What to Read Next

- Architecture: `DEV-DOCS/ARCHITECTURE.md`
- Coding standards: `DEV-DOCS/CODING-STANDARDS.md`
- Branch workflow: `DEV-DOCS/GIT-WORKFLOW.md`
- Requirements: `DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md`
- Roadmap: `DEV-DOCS/ROADMAP.md`
