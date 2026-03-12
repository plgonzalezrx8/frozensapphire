# Self-Hosting Model

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Define the official MVP distribution and hosting model for `frozensapphire`.

## Current State

The repo currently runs as a local developer app with Docker-backed supporting services. The product direction is now locked to a self-hosted distribution model, so packaging, docs, migrations, seeds, and runtime checks must assume customer-controlled infrastructure.

## Product Model

`frozensapphire` is a distributable package, not a hosted SaaS.

Supported install paths for MVP:

1. Docker-first installation using a packaged compose flow.
2. Manual Node deployment using documented prerequisites and environment variables.

Required customer infrastructure:

- PostgreSQL
- Redis
- S3-compatible object storage

Product auth model:

- `Auth.js` credentials/session auth
- Prisma-backed local users and roles

Not product requirements:

- Vercel
- Neon Auth
- Infisical
- Vendor-specific managed infrastructure

## Runtime Configuration Contract

The product runtime must support the following environment variables:

- `DATABASE_URL`
- `REDIS_URL`
- `S3_ENDPOINT`
- `S3_BUCKET`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

Optional product variables may be added later, but the MVP packaging and docs must treat the list above as the minimum runtime contract.

## Packaging Requirements

- Checked-in Prisma migrations
- Deterministic seed profiles for dev, integration, and E2E
- Docker image and compose-based local install
- Manual deployment instructions
- Upgrade and rollback notes
- Health checks that identify missing or invalid runtime dependencies

## Install Paths

Docker-first:

1. Copy `.env.example` to `.env`
2. Set production secrets and infrastructure endpoints
3. Build the image
4. Start the self-hosted compose stack
5. Verify `/api/v1/health`

Manual Node deployment:

1. Provision Node 20+, Postgres, Redis, and S3-compatible storage
2. Export the documented runtime environment variables
3. Install dependencies and generate Prisma client
4. Run `prisma migrate deploy`
5. Run `pnpm seed:dev` or an environment-specific seed profile
6. Build and start the application

## References

- [README.md](/Users/pedrogonzalez/CascadeProjects/frozensapphire-worktrees/wt-platform-dist/README.md)
- [ARCHITECTURE.md](/Users/pedrogonzalez/CascadeProjects/frozensapphire-worktrees/wt-platform-dist/DEV-DOCS/ARCHITECTURE.md)
- [IMPLEMENTATION-PLAN.md](/Users/pedrogonzalez/CascadeProjects/frozensapphire-worktrees/wt-platform-dist/DEV-DOCS/requirements/IMPLEMENTATION-PLAN.md)
