/**
 * Central list of capability keys used by the RBAC system.
 */

export const CAPABILITIES = {
  ADMIN_ACCESS: "admin.access",
  CONTENT_CREATE: "content.create",
  CONTENT_EDIT: "content.edit",
  CONTENT_DELETE: "content.delete",
  CONTENT_PUBLISH: "content.publish",
  MEDIA_MANAGE: "media.manage",
  COMMENTS_MODERATE: "comments.moderate",
  SETTINGS_MANAGE: "settings.manage",
  USERS_MANAGE: "users.manage",
} as const;

export type CapabilityKey = (typeof CAPABILITIES)[keyof typeof CAPABILITIES];
