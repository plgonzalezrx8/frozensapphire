# CI Troubleshooting

**Last Updated:** March 12, 2026
**Status:** In Progress

## Purpose

Common CI failures and remediation steps.

## Common Issues

- Prisma client generation fails → run `pnpm prisma:generate`
- Typecheck failures → run `pnpm typecheck`
- Test failures → run `pnpm test:ci`
- Build failures → run `pnpm build`
- Playwright failures → inspect `playwright-report` and `test-results` artifacts
- Local Playwright opens the wrong app → set `CI=1`, choose an unused `PORT`, and set matching `PLAYWRIGHT_BASE_URL` + `NEXTAUTH_URL` so Playwright does not reuse an unrelated local server
- Migration failures → run `pnpm exec prisma migrate deploy` against a clean local database
- Seed failures → run `pnpm seed:test` or `pnpm seed:e2e` locally
