# Project Structure

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Explain the repo layout and module boundaries.

## Current State

The repo includes App Router routes, Prisma schema, and modules for hooks, health, and RBAC.

## Key Paths

- `src/app/(admin)` — Admin routes and layout
- `src/app/(public)` — Public routes and layout
- `src/app/api/v1` — REST v1 endpoints
- `src/lib` — Shared infrastructure (db, logger, queues)
- `src/modules` — Domain services and registries
- `src/plugins` — Bundled plugin packages
- `src/themes` — Bundled theme packages
- `prisma/schema.prisma` — Database schema
- `Dockerfile` — Self-hosted application image build
- `docker-compose.yml` — Local development service stack
- `docker-compose.selfhost.yml` — Packaged self-hosting stack
- `scripts/selfhost` — Runtime validation and container startup helpers
