# frozensapphire

**frozensapphire** is a modular CMS built on Next.js, inspired by the flexibility and extensibility of WordPress core.

## Quick start

1. `pnpm install`
2. `cp .env.example .env`
3. `docker-compose up -d`
4. `pnpm prisma:generate`
5. `pnpm prisma:migrate`
6. `pnpm dev`

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin shell.

## Authentication

After running seed (`pnpm prisma db seed`), demo users are available with password `ChangeMe123!`:

- `admin@frozensapphire.local`
- `editor@frozensapphire.local`
- `author@frozensapphire.local`
- `contributor@frozensapphire.local`

## Development notes

- Prisma and Argon2 require `pnpm approve-builds` to enable native build scripts.
- The REST API is mounted under `/api/v1`.
- Health endpoints: `/api/v1/health` and `/api/v1/health/report`.

## Testing

- Unit tests: `pnpm test:unit`
- Integration tests: `pnpm test:integration`
- Combined CI test run: `pnpm test:ci`
- Type checking: `pnpm typecheck`
- Linting: `pnpm lint`
- Comment policy check: `pnpm comments:check`

## Planning documents

The canonical planning docs now live under `DEV-DOCS/requirements/`:

- [WordPress Core vs Next.js CMS Implementation Matrix](DEV-DOCS/requirements/WP-PARITY-MATRIX.md)
- [Technical Requirements Document (TRD)](DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md)
- [Implementation Plan](DEV-DOCS/requirements/IMPLEMENTATION-PLAN.md)
- [MVP Execution Checklist](DEV-DOCS/requirements/MVP-CHECKLIST.md)

## DEV-DOCS

Developer documentation lives in `DEV-DOCS/`. Start here:

- [DEV-DOCS Overview](DEV-DOCS/README.md)

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
