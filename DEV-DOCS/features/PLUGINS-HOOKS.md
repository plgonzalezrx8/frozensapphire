# Plugins and Hooks

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Define plugin lifecycle and hook system.

## Current State

Hook registry exists in `src/modules/plugins/hooks.ts`. Plugin boot sync is planned.

## Install/Deploy Model

- Plugins are bundled in repo under `src/plugins/<slug>`
- Activation stored in `plugins.status`
- Admin can activate/deactivate
- Updates require redeploy

