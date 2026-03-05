# WordPress Core vs Next.js CMS Implementation Matrix

This matrix maps **WordPress core capabilities** to a proposed implementation approach for a Next.js-native CMS platform ("frozensapphire").

## Legend
- **Parity Target**
  - **P0** = Must-have for baseline parity with vanilla WordPress core
  - **P1** = Important parity depth after MVP
  - **P2** = Advanced/optional parity
- **Status**
  - **Planned** = Included in near-term roadmap
  - **Later** = Deferred phase

## 1) Content & Publishing

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Posts and Pages | `content_items` table with built-in types (`post`, `page`) and shared editor pipeline | P0 | Planned |
| Custom post types | `content_types` registry with schema-defined fields and admin scaffolding | P0 | Planned |
| Categories and tags | Native `taxonomies` (`category`, `tag`) with term assignment table | P0 | Planned |
| Custom taxonomies | Developer-defined taxonomy registration API | P1 | Planned |
| Draft, pending, scheduled, published | Workflow state machine + scheduled publish queue worker | P0 | Planned |
| Revisions and autosave | Immutable revision snapshots + autosave interval drafts | P1 | Planned |
| Slugs and permalinks | Global permalink settings + slug uniqueness rules per site/type | P0 | Planned |
| Static front page or latest posts | Reading settings + homepage resolver | P0 | Planned |
| Feeds (RSS/Atom) | Route handlers generating RSS/Atom for posts and taxonomies | P1 | Planned |

## 2) Media & Rich Content

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Media Library | `media_assets` model + admin grid/list browser | P0 | Planned |
| Upload and metadata (alt/caption) | Direct upload endpoint to object storage with metadata editing | P0 | Planned |
| Basic image handling | Server-side transforms (Sharp) for thumbnail and responsive variants | P1 | Planned |
| Galleries and embeds | Block editor nodes for gallery/audio/video/embed | P1 | Planned |
| Search/filter media | Indexed metadata and date/type filtering in admin | P1 | Planned |

## 3) Editor, Themes, and Presentation

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Block editor | Schema-driven block editor (Tiptap/Lexical) with block registry | P0 | Planned |
| Block patterns | Reusable pattern library backed by JSON templates | P1 | Planned |
| Theme system | Theme packages with template mapping and config manifest | P0 | Planned |
| Templates and template parts | Theme-level template and section composition (`header`, `footer`, etc.) | P1 | Planned |
| Global settings/styles (`theme.json` analog) | `theme.config.json` design tokens + style constraints | P1 | Planned |
| Menus | `menus` + `menu_items` with location mapping (main/footer) | P0 | Planned |
| Widgets/sidebars equivalent | Region-based dynamic block slots in layout templates | P1 | Planned |
| Site editor-like experience | Visual template editor for blocks and regions | P2 | Later |

## 4) Users, Permissions, and Admin

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Users and profiles | Auth.js + `users` profile model and preferences | P0 | Planned |
| Roles and capabilities | RBAC matrix (`roles`, `capabilities`, `role_capabilities`) | P0 | Planned |
| Admin dashboard | `/admin` shell with overview widgets and quick actions | P0 | Planned |
| Localization support | i18n routing and locale-aware admin/content labels | P1 | Planned |

## 5) Comments & Discussion

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Comment system | `comments` model tied to content items with threaded replies | P0 | Planned |
| Moderation queue | `pending/approved/spam/trash` states + moderator actions | P0 | Planned |
| Discussion settings | Per-site and per-content-type discussion policy settings | P1 | Planned |
| Pingbacks/trackbacks | Webmention-compatible optional module | P2 | Later |

## 6) Settings, URLs, and General Administration

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| General settings (title, timezone, URL, etc.) | Typed `settings` service and admin settings UI | P0 | Planned |
| Reading/writing/media/discussion settings | Domain settings modules with schema validation | P0 | Planned |
| Permalink settings | Configurable permalink builder and rewrite routes | P0 | Planned |

## 7) Import, Export, and Privacy

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Export tools (WXR equivalent) | JSON export + optional WordPress-compatible XML adapter | P1 | Planned |
| Import tools | Async import pipelines (WordPress XML + generic JSON/CSV) | P1 | Planned |
| Personal data export/erase | Privacy request workflow with approval and job processing | P1 | Planned |

## 8) Operations, Health, and Reliability

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Update flows | Versioned core/module/theme update manager | P2 | Later |
| Site Health | Health dashboard (DB, storage, queue, env, SSL checks) | P1 | Planned |
| Recovery mode for fatal errors | Guarded boot mode + plugin/theme isolation on failure | P1 | Planned |
| Application passwords | Scoped API tokens with revocation and last-used metadata | P1 | Planned |

## 9) Developer Platform & Extensibility

| WordPress Core Capability | Next.js CMS Implementation | Parity Target | Status |
|---|---|---:|---|
| Plugin system | Signed module lifecycle (`install`, `activate`, `deactivate`, `remove`) | P1 | Planned |
| Hooks (actions/filters) | Event bus + sync filters with typed payload contracts | P1 | Planned |
| REST API | Versioned REST endpoints (`/api/v1`) for core entities | P0 | Planned |
| Custom fields/metadata | Flexible JSON metadata and typed custom field definitions | P0 | Planned |
| Shortcode-like mechanism | Editor embed blocks and server-side macro transforms | P2 | Later |
| Multisite | Tenant-aware schema and site isolation in a single deployment | P2 | Later |

## 10) MVP Boundaries (Recommended)

To deliver a practical first release while preserving parity direction:

### In MVP (P0)
- Posts/pages/custom content types
- Taxonomies (category/tag)
- Media library (upload + metadata)
- Block editor base
- Roles/capabilities + auth
- Admin dashboard + settings
- Comments + moderation
- REST API
- Permalinks + reading settings

### Post-MVP (P1/P2)
- Full revisions/autosave depth
- Theme visual editing parity
- Plugin marketplace and advanced hook ecosystem
- WXR fidelity tooling
- Multisite

