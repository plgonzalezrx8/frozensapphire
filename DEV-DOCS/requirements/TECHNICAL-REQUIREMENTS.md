# Technical Requirements Document (TRD)

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Define the functional and non-functional requirements for the frozensapphire CMS.

## Current State

Requirements are approved; implementation is incomplete and resumes when Linear promotes frozensapphire back into an active lane.

## Project: frozensapphire (Next.js CMS with WordPress-core-like capabilities)

## 1. Objective
Build a modular CMS in Next.js that delivers baseline parity with **vanilla WordPress core** capabilities for content publishing, media management, administration, extensibility, and operations.

## 2. Scope

### 2.1 In Scope (Release 1 / MVP)
- Content types: posts, pages, custom content types
- Taxonomies: categories, tags
- Block-based editor (core block set)
- Media library and uploads
- Publishing workflows (draft/pending/scheduled/published)
- User auth + role/capability permissions
- Commenting + moderation
- Admin dashboard + core settings
- REST API v1
- Basic import/export (JSON)
- Health dashboard baseline checks

### 2.2 Out of Scope (MVP)
- Full multisite management UX
- Theme marketplace
- Full WordPress XML fidelity for all edge cases
- Enterprise workflow automation (multi-step approval chains)

## 3. Non-Functional Requirements
- **Performance**: P95 admin read endpoints under 300ms for datasets <= 100k content records (indexed queries)
- **Scalability**: Horizontally scalable stateless app tier
- **Availability**: 99.9% monthly target for managed deployment
- **Security**: OWASP ASVS-aligned controls for authz, session management, and input validation
- **Auditability**: Sensitive actions logged with actor, timestamp, and resource
- **Accessibility**: Admin UI WCAG 2.1 AA baseline
- **Localization**: i18n-ready admin and content locale fields

## 4. System Architecture Requirements

### 4.1 Runtime and Framework
- Next.js (App Router) + TypeScript
- Server components for read-heavy admin/public views
- Route handlers for REST endpoints

### 4.2 Data and Persistence
- PostgreSQL as primary relational store
- Prisma ORM and migrations
- Redis for queue and cache needs
- S3-compatible object store for media binaries

### 4.3 Async Processing
- Queue workers for scheduled publish, import/export jobs, privacy requests, and media transforms

### 4.4 Observability
- Structured logs, request tracing, error tracking
- Health check endpoints and periodic synthetic checks

## 5. Functional Requirements and Acceptance Criteria

## FR-1 Content Model
**Requirement:** The system shall support posts, pages, and user-defined content types.

**Acceptance criteria:**
- Admin can create/edit/delete content types with slug and field schema.
- Content item creation enforces schema validation.
- Public rendering resolves content by permalink and status.

## FR-2 Editorial Workflow
**Requirement:** The system shall support draft, pending review, scheduled, and published states.

**Acceptance criteria:**
- Author can save draft; editor can move to pending/published per permissions.
- Scheduled content auto-publishes within 60 seconds of target time.
- State transitions are recorded in audit logs.

## FR-3 Revisions and Autosave
**Requirement:** The system shall retain revision history and autosaved snapshots.

**Acceptance criteria:**
- Every publish action creates immutable revision.
- Autosave captures editor state at configurable intervals.
- Editor can preview and restore a prior revision.

## FR-4 Taxonomies
**Requirement:** The system shall support categories, tags, and extensible taxonomies.

**Acceptance criteria:**
- Admin can create terms and assign them to content.
- Content filters by one or more taxonomy terms in admin and API.
- Term archive pages resolve correctly on public site.

## FR-5 Media Library
**Requirement:** The system shall provide media upload, metadata, and retrieval workflows.

**Acceptance criteria:**
- Upload supports image/audio/video/document types per policy.
- Metadata fields include alt text, caption, title.
- Admin media browser supports search, date filter, and type filter.

## FR-6 Block Editor
**Requirement:** The system shall include a block-based editor with extensible block registry.

**Acceptance criteria:**
- Authors can add, reorder, and configure core blocks (text, image, gallery, embed).
- Stored block payload validates against schema.
- Unknown/disabled blocks render safe fallback UI.

## FR-7 Themes and Templates
**Requirement:** The platform shall support installable themes with templates and global style configuration.

**Acceptance criteria:**
- Admin can activate one theme at a time.
- Theme defines templates for index/single/page/archive.
- Global style tokens are loaded and applied without code changes.

## FR-8 Menus and Navigation
**Requirement:** The system shall support menu creation and placement in registered locations.

**Acceptance criteria:**
- Admin can create nested menu items.
- Theme exposes named menu locations.
- Frontend renders assigned menu with deterministic order.

## FR-9 Users, Roles, and Capabilities
**Requirement:** The system shall enforce capability-based authorization.

**Acceptance criteria:**
- Built-in roles exist (Administrator, Editor, Author, Contributor, Subscriber).
- Restricted actions return 403 and do not mutate data.
- Role changes take effect on next authorized request.

## FR-10 Comments and Moderation
**Requirement:** The platform shall allow comments with moderation controls.

**Acceptance criteria:**
- Public users can submit comments where enabled.
- Moderators can approve/reject/spam/trash comments.
- Only approved comments appear publicly by default.

## FR-11 Settings Management
**Requirement:** The system shall provide site-level settings for general, reading, writing, media, discussion, and permalinks.

**Acceptance criteria:**
- Settings changes are validated and versioned.
- Invalid config cannot be persisted.
- Public behavior updates immediately after save (or documented cache interval).

## FR-12 REST API v1
**Requirement:** The system shall expose versioned JSON REST endpoints for core entities.

**Acceptance criteria:**
- Endpoints for content, taxonomies, media, users (role-limited), comments, menus, settings.
- Supports pagination, filtering, and standardized errors.
- API authentication supports session and scoped tokens.

## FR-13 Import/Export
**Requirement:** The system shall support asynchronous import/export operations.

**Acceptance criteria:**
- Export generates downloadable package with content + metadata.
- Import job surfaces progress, warnings, and failures.
- Idempotency key prevents accidental duplicate imports.

## FR-14 Privacy Tools
**Requirement:** The system shall support personal data export and erasure workflows.

**Acceptance criteria:**
- Admin can create privacy requests tied to verified identity.
- Export request produces machine-readable archive.
- Erasure request redacts/removes personal data while preserving legal logs.

## FR-15 Site Health and Recovery
**Requirement:** The system shall expose health checks and safe-recovery behavior on extension failures.

**Acceptance criteria:**
- Health dashboard reports status for DB, cache, object storage, queue.
- Failed plugin initialization can be bypassed via recovery mode.
- Critical errors create structured incident logs.

## FR-16 Extensibility (Plugins and Hooks)
**Requirement:** The platform shall provide extension points similar to actions/filters.

**Acceptance criteria:**
- Extensions can register event handlers and value filters.
- Hook contracts are versioned and typed.
- Extension lifecycle supports install, activate, deactivate, uninstall.

## 6. Security Requirements
- CSRF protection for cookie-authenticated mutations
- Rate limiting for login, comment submission, token endpoints
- Password hashing via Argon2/bcrypt with configurable cost
- Secrets managed via environment vault
- Token scopes and revocation list for API access
- File upload scanning and MIME validation

## 7. Data Model Requirements (Minimum)
- `users`, `roles`, `capabilities`, `role_capabilities`
- `content_types`, `content_items`, `content_revisions`
- `taxonomies`, `terms`, `content_terms`
- `media_assets`, `media_variants`
- `comments`, `comment_events`
- `themes`, `theme_settings`, `templates`
- `menus`, `menu_items`
- `plugins`, `plugin_settings`, `hook_registry`
- `settings`, `audit_logs`, `health_reports`
- `import_jobs`, `export_jobs`, `privacy_requests`

## 8. Testing Requirements
- Unit tests for domain services and validation logic
- Integration tests for API and permission boundaries
- E2E tests for admin critical paths (publish flow, media upload, moderation)
- Contract tests for plugin/hook API stability
- Performance tests for content listing and search endpoints

## 9. Delivery Plan

### Milestone A (Weeks 1–4)
- Platform scaffold, auth, RBAC baseline
- Content model core + CRUD APIs
- Admin shell and navigation

### Milestone B (Weeks 5–8)
- Block editor v1 + media library
- Taxonomies, permalinks, reading settings
- Public rendering for posts/pages/archives

### Milestone C (Weeks 9–12)
- Comments/moderation
- Revisions/autosave
- REST API hardening and docs
- Health dashboard v1

### Milestone D (Weeks 13–16)
- Theme/template system
- Import/export and privacy tools
- Plugin/hook system beta

## 10. Tooling Requirements
- **Language/Framework:** TypeScript, Next.js
- **Data:** PostgreSQL, Prisma
- **Cache/Queue:** Redis, BullMQ
- **Storage:** S3-compatible bucket + CDN
- **Auth:** Auth.js + RBAC engine
- **Editor:** Tiptap or Lexical
- **Validation:** Zod
- **Testing:** Vitest, Playwright, Supertest
- **Observability:** OpenTelemetry, Sentry, Pino
- **CI/CD:** GitHub Actions (lint, test, build, security scan)

## 11. Open Decisions
- Tiptap vs Lexical final selection for block architecture
- REST-only vs REST + GraphQL support in core
- Single-tenant-first vs tenant-ready schema from day 1
- Plugin isolation strategy (in-process vs sandboxed worker)

## 12. Definition of Done (Release Candidate)
- All P0 requirements accepted in staging
- No critical/high security findings open
- API docs and admin docs published
- Backup/restore runbook validated
- Upgrade and rollback procedures validated
