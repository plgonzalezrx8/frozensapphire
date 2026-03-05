# frozensapphire

**frozensapphire** is a modular CMS built on Next.js, inspired by the flexibility and extensibility of WordPress core.

## Quick start

1. `pnpm install`
2. `cp .env.example .env`
3. `docker-compose up -d`
4. `pnpm prisma:generate`
5. `pnpm prisma:migrate`
6. `pnpm seed:dev`
7. `pnpm dev`

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin shell.

## Authentication

After running seed (`pnpm seed:dev`), demo users are available with password `ChangeMe123!`:

- `admin@frozensapphire.local`
- `editor@frozensapphire.local`
- `author@frozensapphire.local`
- `author2@frozensapphire.local`
- `contributor@frozensapphire.local`

## Development notes

- Prisma and Argon2 require `pnpm approve-builds` to enable native build scripts.
- The REST API is mounted under `/api/v1`.
- Health endpoints: `/api/v1/health` and `/api/v1/health/report`.

## Testing

- Unit tests: `pnpm test:unit`
- Integration tests: `pnpm test:integration`
- End-to-end tests: `pnpm test:e2e`
- Combined CI test run: `pnpm test:ci` (unit + integration)
- Type checking: `pnpm typecheck`
- Linting: `pnpm lint`
- Comment policy check: `pnpm comments:check`

## Seed Profiles

- Development seed: `pnpm seed:dev`
- Integration test seed: `pnpm seed:test`
- E2E test seed: `pnpm seed:e2e`

## Infisical in CI and Local

CI and deploy workflows load secrets from Infisical using OIDC in GitHub Actions.

- CI workflow: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/ci.yml`
- Deploy workflow: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/deploy.yml`

Local usage pattern:

1. `infisical login`
2. `infisical run --env=dev -- pnpm test:integration`
3. `infisical run --env=dev -- pnpm test:e2e`

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
2. Make feature-complete commits only (implementation + tests + required comments/JSDoc + docs updates).
3. Open PR into `development` for testing/validation.
4. Merge `development` into `master` for releases.
5. Delete merged short-lived branches.
