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

## Development notes

- Prisma and Argon2 require `pnpm approve-builds` to enable native build scripts.
- The REST API is mounted under `/api/v1`.
- Health endpoints: `/api/v1/health` and `/api/v1/health/report`.

## Testing

- Unit/integration tests: `pnpm test`
- CI test run with coverage: `pnpm test:ci`
- Type checking: `pnpm typecheck`
- Linting: `pnpm lint`

## Planning documents

- [WordPress Core vs Next.js CMS Implementation Matrix](docs/wordpress-core-parity-matrix.md)
- [Technical Requirements Document (TRD)](docs/technical-requirements-document.md)
- [Implementation Plan](docs/implementation-plan.md)
- [MVP Execution Checklist](docs/mvp-execution-checklist.md)
