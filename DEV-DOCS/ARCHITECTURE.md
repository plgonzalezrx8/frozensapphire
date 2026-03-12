# Architecture

**Last Updated:** March 11, 2026
**Status:** In Progress

## Purpose

Describe the technical architecture and runtime model.

## Current State

Next.js App Router scaffold exists with Prisma schema and partial REST implementation. The product runtime is now explicitly self-hosted, with support for Docker-first packaging and manual Node deployment on generic infrastructure.

## Tech Stack

- Next.js App Router + TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible storage (MinIO locally)
- Auth.js credentials/session auth

## Rendering Model

- Server Components for read-heavy views
- Route handlers for REST v1 API
- Client Components only for interactive admin UI

## Key Runtime Services

- Postgres: relational store
- Redis: queue + cache
- Object storage: media binaries

## Distribution Model

The product must ship as a self-hosted package:

- Docker-first installation for the default path
- Manual Node deployment as a supported alternative
- No hard dependency on hosted vendors

Internal CI may use hosted tooling, but product runtime assumptions must stay generic.
