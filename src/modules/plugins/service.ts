/**
 * Service helpers for plugin management.
 */
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { addAction, addFilter, removePluginHooks } from "@/modules/plugins/hooks";
import { ensurePluginsSynced, isRecoveryMode } from "@/modules/plugins/boot";
import { getPluginRegistry } from "@/modules/plugins/registry";

/**
 * Lists bundled plugins with database status.
 */
export async function listPlugins() {
  await ensurePluginsSynced();
  return prisma.plugin.findMany({ orderBy: { name: "asc" } });
}

/**
 * Activates a plugin by id and registers its hooks.
 */
export async function activatePlugin(id: string) {
  await ensurePluginsSynced();

  if (isRecoveryMode()) {
    throw new Error("Recovery mode enabled; plugin activation is disabled.");
  }

  const plugin = await prisma.plugin.findUnique({ where: { id } });

  if (!plugin) {
    return null;
  }

  const registry = getPluginRegistry();
  const descriptor = registry.find(
    (candidate) => candidate.manifest.slug === plugin.slug,
  );

  if (!descriptor) {
    throw new Error("Plugin is not bundled in the current build.");
  }

  const updated = await prisma.plugin.update({
    where: { id },
    data: { status: "active" },
  });

  try {
    const pluginModule = await descriptor.entry();
    await pluginModule.register({
      pluginSlug: updated.slug,
      addAction: (name, handler) =>
        addAction(name, handler, { plugin: updated.slug }),
      addFilter: (name, handler) =>
        addFilter(name, handler, { plugin: updated.slug }),
    });
  } catch (error) {
    logger.error({ error, plugin: updated.slug }, "Failed to register plugin");
  }

  return updated;
}

/**
 * Deactivates a plugin and removes its hooks from memory.
 */
export async function deactivatePlugin(id: string) {
  await ensurePluginsSynced();

  const plugin = await prisma.plugin.findUnique({ where: { id } });

  if (!plugin) {
    return null;
  }

  const updated = await prisma.plugin.update({
    where: { id },
    data: { status: "inactive" },
  });

  removePluginHooks(updated.slug);

  return updated;
}
