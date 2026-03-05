/**
 * REST v1 endpoint for content item collection operations.
 */
import { ZodError } from "zod";
import { getSessionUser } from "@/lib/auth/session";
import { jsonError, jsonList, jsonOk } from "@/lib/api/responses";
import { CAPABILITIES } from "@/modules/rbac/capabilities";
import {
  contentListQuerySchema,
  createContentInputSchema,
} from "@/modules/content/schemas";
import {
  ContentForbiddenError,
  ContentValidationError,
  createContentItem,
  listContentItems,
} from "@/modules/content/service";
import {
  requireAuthenticatedUser,
  requireCapability,
  toAuthorizationContext,
} from "@/modules/rbac/guards";

/**
 * Lists content items with pagination for authenticated admin users.
 */
export async function GET(request: Request) {
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

  try {
    const searchParams = new URL(request.url).searchParams;
    const query = contentListQuerySchema.parse({
      page: searchParams.get("page"),
      perPage: searchParams.get("perPage"),
      status: searchParams.get("status"),
    });
    const result = await listContentItems(query);
    return jsonList(result.data, result.meta);
  } catch (error) {
    return mapContentError(error);
  }
}

/**
 * Creates a content item for an authenticated author/editor/admin user.
 */
export async function POST(request: Request) {
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
  const capabilityError = requireCapability(context, CAPABILITIES.CONTENT_CREATE);

  if (capabilityError) {
    return capabilityError;
  }

  try {
    const body = await request.json();
    const input = createContentInputSchema.parse(body);
    const createdContent = await createContentItem(input, context);
    return jsonOk(createdContent, { status: 201 });
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

  return jsonError(500, {
    code: "internal_error",
    message: "Unexpected error while processing content.",
  });
}
