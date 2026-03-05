/**
 * In-process hook registry for plugins (actions and filters).
 * For MVP, hooks are executed synchronously in-process.
 */

export type HookHandler<TPayload = unknown> = (payload: TPayload) => TPayload | void;

const actions = new Map<string, HookHandler[]>();
const filters = new Map<string, HookHandler[]>();

/**
 * Registers an action handler for a named hook.
 */
export function addAction<TPayload>(name: string, handler: HookHandler<TPayload>) {
  const existing = actions.get(name) ?? [];
  existing.push(handler as HookHandler);
  actions.set(name, existing);
}

/**
 * Dispatches an action hook to all registered handlers.
 */
export function doAction<TPayload>(name: string, payload: TPayload) {
  const handlers = actions.get(name) ?? [];

  for (const handler of handlers) {
    handler(payload);
  }
}

/**
 * Registers a filter handler for a named hook.
 */
export function addFilter<TPayload>(name: string, handler: HookHandler<TPayload>) {
  const existing = filters.get(name) ?? [];
  existing.push(handler as HookHandler);
  filters.set(name, existing);
}

/**
 * Applies filter handlers to a payload in order.
 */
export function applyFilters<TPayload>(name: string, payload: TPayload): TPayload {
  const handlers = filters.get(name) ?? [];
  let nextPayload = payload;

  for (const handler of handlers) {
    const result = handler(nextPayload);

    if (result !== undefined) {
      nextPayload = result as TPayload;
    }
  }

  return nextPayload;
}
