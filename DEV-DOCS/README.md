# DEV-DOCS - Developer Documentation (frozensapphire)

**Last Updated:** March 6, 2026
**Status:** In Progress

Linear is the single source of truth for frozensapphire planning:

- Project board: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
- Canonical planning state: milestones, issue status, next work, and backlog

This folder remains the canonical home for frozensapphire development documentation, requirements, architecture, standards, and work-log history.

## Folder Structure

```text
DEV-DOCS/
├── README.md
├── 00-START-HERE.md
├── 01-task-list.md
├── GIT-WORKFLOW.md
├── SELF-HOSTING.md
├── WORKTREE-LANES.md
├── ARCHITECTURE.md
├── CODING-STANDARDS.md
├── SECURITY-GUIDELINES.md
├── TESTING-PERFORMANCE.md
├── CI-TROUBLESHOOTING.md
├── DEVELOPMENT-STATUS.md
├── ROADMAP.md
├── project-structure.md
├── NEW-FILES-GUIDE.md
├── work-log.md
├── requirements/
│   ├── TECHNICAL-REQUIREMENTS.md
│   ├── WP-PARITY-MATRIX.md
│   ├── IMPLEMENTATION-PLAN.md
│   └── MVP-CHECKLIST.md
├── features/
│   ├── CONTENT-MODEL.md
│   ├── EDITOR-BLOCKS.md
│   ├── MEDIA-LIBRARY.md
│   ├── THEMES-SYSTEM.md
│   ├── PLUGINS-HOOKS.md
│   ├── COMMENTS-MODERATION.md
│   ├── REST-API.md
│   ├── IMPORT-EXPORT.md
│   ├── PRIVACY-TOOLS.md
│   └── SETTINGS-PERMALINKS.md
└── implementation/
    ├── CRUD-PATTERNS.md
    ├── API-ERRORS.md
    ├── QUEUE-JOBS.md
    └── REGISTRY-BOOT-SYNC.md
```

## Quick Start for Developers

1. Start here: `DEV-DOCS/00-START-HERE.md`
2. Architecture overview: `DEV-DOCS/ARCHITECTURE.md`
3. Coding and commenting standards: `DEV-DOCS/CODING-STANDARDS.md`
4. Requirements and scope: `DEV-DOCS/requirements/TECHNICAL-REQUIREMENTS.md`
5. Branching and release workflow: `DEV-DOCS/GIT-WORKFLOW.md`
6. Self-hosting model: `DEV-DOCS/SELF-HOSTING.md`
7. Worktree lane map: `DEV-DOCS/WORKTREE-LANES.md`
8. Planning source: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
9. Roadmap intent and current repo-local snapshot: `DEV-DOCS/ROADMAP.md` and `DEV-DOCS/DEVELOPMENT-STATUS.md`

## Current State Snapshot

- App scaffolded with Next.js App Router and Prisma.
- Auth baseline implemented with credentials login and middleware-protected admin routes.
- RBAC capability checks are enforced for protected content APIs.
- Initial content CRUD vertical slice is implemented and tested.
- CI gates now include comment policy, lint, typecheck, unit tests, integration tests, and build.
- Self-hosted product packaging and worktree-lane delivery model are now the authoritative execution direction.

## Documentation Standards

All DEV-DOCS files include:
- Last Updated date
- Status (Draft/In Progress/Stable)
- Purpose section
- Current State section
- References to relevant code paths
