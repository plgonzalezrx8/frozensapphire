/**
 * Boot-time sync for plugin registry data.
 */
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { addAction, addFilter } from "@/modules/plugins/hooks";
import { getPluginRegistry } from "@/modules/plugins/registry";
import type { PluginDescriptor } from "@/modules/plugins/types";

const registeredPlugins = new Set<string>();
let syncPromise: Promise<void> | null = null;

/**
 * Returns true when CMS recovery mode is enabled.
 */
export function isRecoveryMode() {
  return process.env.CMS_RECOVERY_MODE === "1";
}

/**
 * Ensures the plugin registry has been synced to the database once.
 */
export async function ensurePluginsSynced() {
  if (!syncPromise) {
    syncPromise = syncPluginsFromRegistry();
  }

  await syncPromise;
}

/**
 * Resets plugin sync state for tests.
 */
export function resetPluginSyncForTests() {
  syncPromise = null;
  registeredPlugins.clear();
}

/**
 * Syncs bundled plugins into the database and registers active hooks.
 */
export async function syncPluginsFromRegistry() {
  const registry = getPluginRegistry();

  for (const descriptor of registry) {
    const { manifest } = descriptor;
    await prisma.plugin.upsert({
      where: { slug: manifest.slug },
      update: {
        name: manifest.name,
        version: manifest.version,
        manifest: manifest as unknown as Prisma.InputJsonValue,
      },
      create: {
        name: manifest.name,
        slug: manifest.slug,
        version: manifest.version,
        manifest: manifest as unknown as Prisma.InputJsonValue,
      },
    });
  }

  if (!isRecoveryMode()) {
    await registerActivePlugins(registry);
  }
}

async function registerActivePlugins(registry: PluginDescriptor[]) {
  const activePlugins = await prisma.plugin.findMany({
    where: { status: "active" },
  });

  for (const plugin of activePlugins) {
    const descriptor = registry.find(
      (candidate) => candidate.manifest.slug === plugin.slug,
    );

    if (!descriptor) {
      continue;
    }

    if (registeredPlugins.has(plugin.slug)) {
      continue;
    }

    try {
      const pluginModule = await descriptor.entry();
      await pluginModule.register({
        pluginSlug: plugin.slug,
        addAction: (name, handler) =>
          addAction(name, handler, { plugin: plugin.slug }),
        addFilter: (name, handler) =>
          addFilter(name, handler, { plugin: plugin.slug }),
      });
      registeredPlugins.add(plugin.slug);
    } catch (error) {
      logger.error({ error, plugin: plugin.slug }, "Failed to register plugin");
    }
  }
}
