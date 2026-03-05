# Git Workflow

**Last Updated:** March 5, 2026  
**Status:** Active

## Purpose

Define the required branch strategy and merge flow for sprint, feature, beta, and production work.

## Current State

The repository uses a two-branch long-lived model:

- `master`: production-ready branch.
- `development`: beta and release-candidate branch.

All other branches are short-lived and must be deleted after merge.

## Required Branch Model

1. Start new work from `development`.
2. Use short-lived branch names:
   - `feature/<short-description>`
   - `sprint/<short-description>`
3. Open PRs from short-lived branches into `development`.
4. Validate in `development`.
5. Promote by merging `development` into `master`.
6. Delete merged short-lived branches locally and remotely.

## CI/CD Gate Requirements

Merges into `development` and `master` require passing checks:

- `pnpm comments:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm test:e2e`
- `pnpm build`
- Commitlint PR check (`type(scope): summary`)

## Commit Convention and Discipline

Commit message format is mandatory:

- `type(scope): summary`

Allowed types:

- `feat`
- `fix`
- `refactor`
- `test`
- `docs`
- `chore`
- `ci`
- `security`

Allowed scopes:

- `auth`, `rbac`, `content`, `editor`, `media`, `taxonomy`, `settings`, `themes`, `plugins`, `comments`, `api`, `db`, `ci`, `docs`, `tests`, `seed`, `security`

Rules:

1. Every feature must end in a feature-complete commit before starting another feature.
2. Do not mix unrelated features in one commit.
3. Feature commits must include implementation, tests, and required comments/JSDoc.
4. Include docs updates when behavior or workflow changes.
5. No WIP commits on PR branches.

## Release Cadence Guidance

- `development` may contain in-flight, test-ready sprint work.
- `master` only accepts validated release candidates from `development`.
- Hotfixes should branch from `master`, then merge back to both `master` and `development`.

## References

- Root repository guidelines: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/README.md`
- CI workflow: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/.github/workflows/ci.yml`
- Coding and commenting rules: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/DEV-DOCS/CODING-STANDARDS.md`
- Testing and quality gates: `/Users/pedrogonzalez/CascadeProjects/frozensapphire/DEV-DOCS/TESTING-PERFORMANCE.md`
