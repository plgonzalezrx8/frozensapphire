# frozensapphire

**frozensapphire** is a modular CMS built on Next.js, inspired by the flexibility and extensibility of WordPress core.

`frozensapphire` is being built as a self-hosted, distributable package. Customers should be able to run it on their own infrastructure the way they run WordPress today.

## Quick start

1. `pnpm install`
2. `cp .env.example .env`
3. `docker compose up -d`
4. `pnpm prisma:generate`
5. `pnpm prisma:migrate`
6. `pnpm seed:dev`
7. `pnpm dev`

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin shell.

## Self-hosting model

The MVP product model is self-hosted, not SaaS:

- Docker-first install via `docker compose`
- Manual Node deployment with documented prerequisites
- Generic `Postgres`, `Redis`, and `S3-compatible` storage
- Local `Auth.js` credentials/session auth backed by Prisma

Hosted services such as Vercel, Neon, and Infisical may still be used for internal development convenience, but they are not product requirements.

## Authentication

After running `pnpm seed:dev`, demo users are available with password `ChangeMe123!`:

- `admin@frozensapphire.local`
- `editor@frozensapphire.local`
- `author@frozensapphire.local`
- `author2@frozensapphire.local`
- `contributor@frozensapphire.local`

## Development notes

- Prisma and Argon2 require `pnpm approve-builds` to enable native build scripts.
- The REST API is mounted under `/api/v1`.
- Health endpoints: `/api/v1/health` and `/api/v1/health/report`.

## Self-hosted install paths

Docker-first install:

1. `cp .env.example .env`
2. Update secrets and infrastructure URLs in `.env`
3. `pnpm docker:build`
4. `pnpm docker:selfhost:up`

Manual Node deployment:

1. Install Node 20+, pnpm, Postgres, Redis, and S3-compatible storage
2. Configure the variables documented in `.env.example`
3. `pnpm install --frozen-lockfile`
4. `pnpm prisma:generate`
5. `pnpm prisma migrate deploy`
6. `pnpm seed:dev`
7. `pnpm build && pnpm start`

## Testing

- Unit tests: `pnpm test:unit`
- Integration tests: `pnpm test:integration`
- End-to-end tests: `pnpm test:e2e`
- Local E2E on a busy machine: `CI=1 PORT=4010 PLAYWRIGHT_BASE_URL=http://127.0.0.1:4010 NEXTAUTH_URL=http://127.0.0.1:4010 pnpm test:e2e`
- Combined CI test run: `pnpm test:ci`
- Type checking: `pnpm typecheck`
- Linting: `pnpm lint`
- Comment policy check: `pnpm comments:check`
- Commit policy check: `pnpm commitlint`

## Planning documents

Linear is now the single source of truth for live planning state:

- [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)

Strategy and requirements references remain under `DEV-DOCS/requirements/`:

- [WordPress Core vs Next.js CMS Implementation Matrix](DEV-DOCS/requirements/WP-PARITY-MATRIX.md)
- [Technical Requirements Document (TRD)](DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md)
- [Implementation Plan](DEV-DOCS/requirements/IMPLEMENTATION-PLAN.md)
- [MVP Execution Checklist](DEV-DOCS/requirements/MVP-CHECKLIST.md)

## DEV-DOCS

Developer documentation lives in `DEV-DOCS/`. Start here:

- [DEV-DOCS Overview](DEV-DOCS/README.md)
- [Self-Hosting Model](DEV-DOCS/SELF-HOSTING.md)
- [Worktree Lane Map](DEV-DOCS/WORKTREE-LANES.md)

## Git Branching Strategy

Long-lived branches are:

- `master`: production-ready branch.
- `development`: beta/release-candidate branch.

Short-lived branches are required for sprint and feature work, for example:

- `feature/<name>`
- `sprint/<name>`

Workflow:

1. Branch from `development`.
2. Open PR into `development` for testing/validation.
3. Merge `development` into `master` for releases.
4. Delete merged short-lived branches.
