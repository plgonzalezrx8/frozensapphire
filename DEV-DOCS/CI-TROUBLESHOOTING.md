# CI Troubleshooting

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Common CI failures and remediation steps.

## Common Issues

- Prisma client generation fails → run `pnpm prisma:generate`
- Typecheck failures → run `pnpm typecheck`
- Test failures → run `pnpm test:ci`
- Build failures → run `pnpm build`
- Playwright failures → inspect `playwright-report` and `test-results` artifacts
- Migration failures → run `pnpm exec prisma migrate deploy` against a clean local database
- Seed failures → run `pnpm seed:test` or `pnpm seed:e2e` locally
