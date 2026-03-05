# CI Troubleshooting

**Last Updated:** March 5, 2026  
**Status:** In Progress

## Purpose

Document common CI failures and the shortest remediation path.

## Current State

CI now includes static checks, unit, integration, and Playwright E2E jobs, with Infisical OIDC secret loading and Neon per-PR DB branches.

## Workflow References

- CI: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/ci.yml`
- CodeQL: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/codeql.yml`
- Deploy: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/deploy.yml`

## Common Failures and Fixes

### 1. Missing Infisical or Neon configuration

Symptom:
- `validate-required-env.mjs` fails early.

Fix:
1. Confirm GitHub repo secrets: `INFISICAL_IDENTITY_ID`, `NEON_API_KEY`, `NEON_PROJECT_ID`.
2. Confirm repo variables: `INFISICAL_PROJECT_SLUG`, optional env-slug overrides.
3. Re-run workflow.

### 2. Infisical OIDC auth fails

Symptom:
- `Infisical/secrets-action` fails with auth or access errors.

Fix:
1. Verify GitHub workflow has `id-token: write` permission.
2. Verify Infisical identity trust policy includes this repo.
3. Verify identity has access to preview/prod env slug used in workflow.

### 3. Neon branch creation or teardown fails

Symptom:
- `neondatabase/create-branch-action` or `delete-branch-action` fails.

Fix:
1. Validate `NEON_API_KEY` and `NEON_PROJECT_ID`.
2. Validate base branch exists (`NEON_BASE_BRANCH`, default `master`).
3. If cleanup failed, delete stale branch manually in Neon console.

### 4. Prisma migration deployment fails

Symptom:
- `prisma migrate deploy` exits non-zero.

Fix:
1. Confirm migration files exist under `/Users/pedrogonzalez/CascadeProjects/frozensapphire/prisma/migrations`.
2. Regenerate migration from schema change and commit it.
3. Validate migration against clean DB locally.

### 5. Seed job fails

Symptom:
- `pnpm seed:test` or `pnpm seed:e2e` fails.

Fix:
1. Run seed script locally against test DB.
2. Check model/table naming and relation delete ordering in seed reset helpers.
3. Ensure required auth users/content types are still seeded.

### 6. Playwright E2E fails

Symptom:
- Browser tests fail in `e2e-tests` job.

Fix:
1. Download artifacts: `playwright-report` and `playwright-test-results`.
2. Inspect failing trace for selectors, redirects, or auth/session issues.
3. Reproduce locally with:
   - `pnpm build`
   - `pnpm seed:e2e`
   - `pnpm test:e2e`

### 7. Commit message policy fails

Symptom:
- Commitlint job fails on PR.

Fix:
1. Amend commit message to Conventional Commit format `type(scope): summary`.
2. Use allowed types/scopes from `/Users/pedrogonzalez/CascadeProjects/frozensapphire/commitlint.config.cjs`.

## Local Preflight Command Set

Run before pushing:
- `pnpm comments:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm build`
