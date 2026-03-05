/**
 * In-process hook registry for plugins (actions and filters).
 * For MVP, hooks are executed synchronously in-process.
 */

export type HookHandler<TPayload = unknown> = (payload: TPayload) => TPayload | void;

interface HookRegistrationOptions {
  /** Optional plugin slug for tracking and removal. */
  plugin?: string;
}

interface HookEntry {
  /** Optional plugin slug owning this hook. */
  plugin?: string;
  /** Registered hook handler. */
  handler: HookHandler;
}

const actions = new Map<string, HookEntry[]>();
const filters = new Map<string, HookEntry[]>();

/**
 * Registers an action handler for a named hook.
 */
export function addAction<TPayload>(
  name: string,
  handler: HookHandler<TPayload>,
  options?: HookRegistrationOptions,
) {
  const existing = actions.get(name) ?? [];
  existing.push({ handler: handler as HookHandler, plugin: options?.plugin });
  actions.set(name, existing);
}

/**
 * Dispatches an action hook to all registered handlers.
 */
export function doAction<TPayload>(name: string, payload: TPayload) {
  const handlers = actions.get(name) ?? [];

  for (const entry of handlers) {
    entry.handler(payload);
  }
}

/**
 * Registers a filter handler for a named hook.
 */
export function addFilter<TPayload>(
  name: string,
  handler: HookHandler<TPayload>,
  options?: HookRegistrationOptions,
) {
  const existing = filters.get(name) ?? [];
  existing.push({ handler: handler as HookHandler, plugin: options?.plugin });
  filters.set(name, existing);
}

/**
 * Applies filter handlers to a payload in order.
 */
export function applyFilters<TPayload>(name: string, payload: TPayload): TPayload {
  const handlers = filters.get(name) ?? [];
  let nextPayload = payload;

  for (const entry of handlers) {
    const result = entry.handler(nextPayload);

    if (result !== undefined) {
      nextPayload = result as TPayload;
    }
  }

  return nextPayload;
}

/**
 * Removes all hooks registered by a plugin slug.
 */
export function removePluginHooks(pluginSlug: string) {
  for (const [name, entries] of actions) {
    actions.set(
      name,
      entries.filter((entry) => entry.plugin !== pluginSlug),
    );
  }

  for (const [name, entries] of filters) {
    filters.set(
      name,
      entries.filter((entry) => entry.plugin !== pluginSlug),
    );
  }
}
