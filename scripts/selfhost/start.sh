#!/bin/sh

# Starts the self-hosted application container after validating required
# runtime configuration and applying Prisma migrations when requested.

set -eu

node ./scripts/selfhost/validate-runtime.mjs

if [ "${RUN_MIGRATIONS:-1}" = "1" ]; then
  pnpm prisma migrate deploy
fi

exec pnpm start
