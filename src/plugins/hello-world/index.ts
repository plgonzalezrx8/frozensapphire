/**
 * Example plugin implementation.
 */
import type { PluginContext } from "@/modules/plugins/types";

/**
 * Registers hooks for the Hello World plugin.
 */
export async function register({ addAction, pluginSlug }: PluginContext) {
  addAction(
    "system.boot",
    () => {
      // Placeholder side-effect for plugin boot.
      console.log(`[${pluginSlug}] booted`);
    },
  );
}
