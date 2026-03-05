# Architecture

**Last Updated:** March 5, 2026  
**Status:** Draft

## Purpose

Describe the technical architecture and runtime model.

## Current State

Next.js App Router scaffold exists with Prisma schema and REST stubs. Deployment assumptions are containerized Node with Postgres, Redis, and S3-compatible storage.

## Tech Stack

- Next.js App Router + TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible storage (MinIO locally)
- Auth.js for authentication (planned)

## Rendering Model

- Server Components for read-heavy views
- Route handlers for REST v1 API
- Client Components only for interactive admin UI

## Key Runtime Services

- Postgres: relational store
- Redis: queue + cache
- Object storage: media binaries

