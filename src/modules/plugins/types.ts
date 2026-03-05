/**
 * Shared types for plugin registry and runtime hooks.
 */
import type { HookHandler } from "@/modules/plugins/hooks";

export interface PluginManifest {
  /** Display name for the plugin. */
  name: string;
  /** Unique slug for the plugin. */
  slug: string;
  /** Version string for the plugin. */
  version: string;
  /** Optional author attribution. */
  author?: string;
  /** Optional description for admin UI. */
  description?: string;
  /** Entry point file name, informational only. */
  entry?: string;
}

export interface PluginContext {
  /** Plugin slug used for hook scoping. */
  pluginSlug: string;
  /** Register an action hook scoped to this plugin. */
  addAction: (name: string, handler: HookHandler) => void;
  /** Register a filter hook scoped to this plugin. */
  addFilter: (name: string, handler: HookHandler) => void;
}

export interface PluginModule {
  /** Called when the plugin is activated and registered. */
  register: (context: PluginContext) => void | Promise<void>;
}

export interface PluginDescriptor {
  /** Plugin manifest metadata. */
  manifest: PluginManifest;
  /** Lazy import for the plugin entry module. */
  entry: () => Promise<PluginModule>;
}
