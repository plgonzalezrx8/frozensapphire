# Registry Boot Sync

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Describe boot-time syncing for plugin and theme registries.

## Current State

Registry files are planned, but boot sync is not yet implemented.

## Boot Flow (Planned)

1. Load registry arrays (build-time imports)
2. Upsert metadata into `plugins` and `themes` tables
3. Register hooks for active plugins
4. Default to first theme if none active
5. Recovery mode bypasses plugin registration (`CMS_RECOVERY_MODE=1`)

