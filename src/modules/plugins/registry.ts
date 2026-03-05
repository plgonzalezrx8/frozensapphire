/**
 * Build-time registry for bundled plugins.
 * Avoids dynamic filesystem scanning in production.
 */
import type { PluginDescriptor } from "@/modules/plugins/types";
import helloWorldManifest from "@/plugins/hello-world/plugin.json";

const registry: PluginDescriptor[] = [
  {
    manifest: helloWorldManifest,
    entry: () => import("@/plugins/hello-world"),
  },
];

/**
 * Returns the bundled plugin registry.
 */
export function getPluginRegistry() {
  return registry;
}
