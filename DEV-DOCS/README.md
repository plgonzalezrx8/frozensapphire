# DEV-DOCS - Developer Documentation (frozensapphire)

**Last Updated:** March 6, 2026
**Status:** Planned/backlog as of 2026-05-02

Linear is the single source of truth for frozensapphire planning:

- Project board: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
- Canonical planning state: milestones, issue status, next work, and backlog
- Current Linear status: planned/backlog behind TheLivingOrthodoxSynaxarion, Strikepoint, and LunaLighthouse

This folder remains the canonical home for frozensapphire development documentation, requirements, architecture, standards, and work-log history.

## Folder Structure

```text
DEV-DOCS/
├── README.md
├── 00-START-HERE.md
├── 01-task-list.md
├── GIT-WORKFLOW.md
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
6. Planning source: [frozensapphire in Linear](https://linear.app/blueforce-innovations/project/frozensapphire-b19d7f40e3ac)
7. Roadmap intent and current repo-local snapshot: `DEV-DOCS/ROADMAP.md` and `DEV-DOCS/DEVELOPMENT-STATUS.md`

## Current State Snapshot

- App scaffolded with Next.js App Router and Prisma.
- Auth baseline implemented with credentials login and middleware-protected admin routes.
- RBAC capability checks are enforced for protected content APIs.
- Initial content CRUD vertical slice is implemented and tested.
- CI gates now include comment policy, lint, typecheck, unit tests, integration tests, and build.

## Documentation Standards

All DEV-DOCS files include:
- Last Updated date
- Status (Draft/In Progress/Stable)
- Purpose section
- Current State section
- References to relevant code paths
