/**
 * REST v1 endpoint for content item detail operations.
 */
import { ZodError } from "zod";
import { getSessionUser } from "@/lib/auth/session";
import { jsonError, jsonOk } from "@/lib/api/responses";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import { updateContentInputSchema } from "@/modules/content/schemas";
import {
  ContentForbiddenError,
  ContentNotFoundError,
  ContentValidationError,
  deleteContentItem,
  getContentItemById,
  updateContentItem,
} from "@/modules/content/service";
import {
  requireAuthenticatedUser,
  requireCapability,
  toAuthorizationContext,
} from "@/modules/rbac/guards";

interface RouteContext {
  /** Dynamic route params from Next.js. */
  params: Promise<{ id: string }>;
}

/**
 * Returns a content item by id for authenticated admin users.
 */
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const user = await getSessionUser();
  const authenticationError = requireAuthenticatedUser(user);

  if (authenticationError) {
    return authenticationError;
  }
  if (!user) {
    return jsonError(401, {
      code: "unauthorized",
      message: "Authentication is required.",
    });
  }

  const context = toAuthorizationContext(user);
  const capabilityError = requireCapability(context, CAPABILITIES.ADMIN_ACCESS);

  if (capabilityError) {
    return capabilityError;
  }

  const contentItem = await getContentItemById(id);

  if (!contentItem) {
    return jsonError(404, {
      code: "not_found",
      message: "Content item not found.",
    });
  }

  return jsonOk(contentItem);
}

/**
 * Updates a content item by id for users with edit permissions.
 */
export async function PATCH(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const user = await getSessionUser();
  const authenticationError = requireAuthenticatedUser(user);

  if (authenticationError) {
    return authenticationError;
  }
  if (!user) {
    return jsonError(401, {
      code: "unauthorized",
      message: "Authentication is required.",
    });
  }

  const context = toAuthorizationContext(user);
  const capabilityError = requireCapability(context, CAPABILITIES.CONTENT_EDIT);

  if (capabilityError) {
    return capabilityError;
  }

  try {
    const body = await _request.json();
    const input = updateContentInputSchema.parse(body);
    const updated = await updateContentItem(id, input, context);
    return jsonOk(updated);
  } catch (error) {
    return mapContentError(error);
  }
}

/**
 * Deletes a content item by id for users with delete permissions.
 */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const user = await getSessionUser();
  const authenticationError = requireAuthenticatedUser(user);

  if (authenticationError) {
    return authenticationError;
  }
  if (!user) {
    return jsonError(401, {
      code: "unauthorized",
      message: "Authentication is required.",
    });
  }

  const context = toAuthorizationContext(user);
  const capabilityError = requireCapability(context, CAPABILITIES.CONTENT_DELETE);

  if (capabilityError) {
    return capabilityError;
  }

  try {
    await deleteContentItem(id, context);
    return jsonOk({ deleted: true });
  } catch (error) {
    return mapContentError(error);
  }
}

function mapContentError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError(400, {
      code: "validation_error",
      message: "Request payload failed validation.",
      details: error.issues,
    });
  }

  if (error instanceof ContentValidationError) {
    return jsonError(400, {
      code: "validation_error",
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof ContentForbiddenError) {
    return jsonError(403, {
      code: "forbidden",
      message: error.message,
    });
  }

  if (error instanceof ContentNotFoundError) {
    return jsonError(404, {
      code: "not_found",
      message: error.message,
    });
  }

  return jsonError(500, {
    code: "internal_error",
    message: "Unexpected error while processing content.",
  });
}
