# Themes System

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Define how themes are bundled and activated.

## Current State

Theme scaffolding exists under `src/themes`, but activation is not implemented.

## Install/Deploy Model

- Themes are bundled in repo under `src/themes/<slug>`
- Activation state stored in `themes.active`
- Admin can activate one theme at a time
- Updates require redeploy

