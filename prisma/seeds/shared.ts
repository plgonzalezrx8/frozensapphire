/**
 * Shared seed utilities for development and CI test datasets.
 */
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const capabilities = [
  { key: "admin.access", description: "Access the admin area" },
  { key: "content.create", description: "Create content" },
  { key: "content.edit", description: "Edit content" },
  { key: "content.delete", description: "Delete content" },
  { key: "content.publish", description: "Publish content" },
  { key: "media.manage", description: "Manage media assets" },
  { key: "comments.moderate", description: "Moderate comments" },
  { key: "settings.manage", description: "Manage site settings" },
  { key: "users.manage", description: "Manage users and roles" },
];

const roles = [
  {
    name: "Administrator",
    description: "Full access to all CMS capabilities.",
    capabilities: capabilities.map((capability) => capability.key),
  },
  {
    name: "Editor",
    description: "Manage and publish all content.",
    capabilities: [
      "admin.access",
      "content.create",
      "content.edit",
      "content.delete",
      "content.publish",
      "media.manage",
      "comments.moderate",
    ],
  },
  {
    name: "Author",
    description: "Create and publish own content.",
    capabilities: ["admin.access", "content.create", "content.edit", "content.publish"],
  },
  {
    name: "Contributor",
    description: "Create content pending review.",
    capabilities: ["admin.access", "content.create", "content.edit"],
  },
  {
    name: "Subscriber",
    description: "Read-only access to published content.",
    capabilities: [],
  },
];

const contentTypes = [
  {
    name: "Post",
    slug: "post",
    schema: {
      title: "string",
      content: "json",
    },
  },
  {
    name: "Page",
    slug: "page",
    schema: {
      title: "string",
      content: "json",
    },
  },
];

const baseUsers = [
  {
    email: "admin@frozensapphire.local",
    name: "Admin User",
    role: "Administrator",
  },
  {
    email: "editor@frozensapphire.local",
    name: "Editor User",
    role: "Editor",
  },
  {
    email: "author@frozensapphire.local",
    name: "Author One",
    role: "Author",
  },
  {
    email: "author2@frozensapphire.local",
    name: "Author Two",
    role: "Author",
  },
  {
    email: "contributor@frozensapphire.local",
    name: "Contributor User",
    role: "Contributor",
  },
  {
    email: "subscriber@frozensapphire.local",
    name: "Subscriber User",
    role: "Subscriber",
  },
];

/**
 * Deletes mutable CMS records so test seeds can start from deterministic state.
 * @param prisma - Prisma client used for database operations.
 */
export async function resetCmsData(prisma: PrismaClient): Promise<void> {
  await prisma.$transaction([
    prisma.commentEvent.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.contentTerm.deleteMany(),
    prisma.contentRevision.deleteMany(),
    prisma.contentAutosave.deleteMany(),
    prisma.contentItem.deleteMany(),
    prisma.term.deleteMany(),
    prisma.taxonomy.deleteMany(),
    prisma.menuItem.deleteMany(),
    prisma.menu.deleteMany(),
    prisma.themeSetting.deleteMany(),
    prisma.template.deleteMany(),
    prisma.theme.deleteMany(),
    prisma.pluginSetting.deleteMany(),
    prisma.plugin.deleteMany(),
    prisma.setting.deleteMany(),
    prisma.hookRegistry.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.userRole.deleteMany(),
    prisma.roleCapability.deleteMany(),
    prisma.authSession.deleteMany(),
    prisma.authAccount.deleteMany(),
    prisma.user.deleteMany(),
    prisma.role.deleteMany(),
    prisma.capability.deleteMany(),
  ]);
}

/**
 * Seeds roles, capabilities, users, settings, and baseline content metadata.
 * @param prisma - Prisma client used for database operations.
 * @param password - Default password used by seeded development users.
 */
export async function seedCoreData(prisma: PrismaClient, password: string): Promise<void> {
  for (const capability of capabilities) {
    await prisma.capability.upsert({
      where: { key: capability.key },
      update: { description: capability.description },
      create: capability,
    });
  }

  for (const role of roles) {
    const createdRole = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: {
        name: role.name,
        description: role.description,
      },
    });

    for (const capabilityKey of role.capabilities) {
      const capability = await prisma.capability.findUnique({
        where: { key: capabilityKey },
      });

      if (!capability) {
        continue;
      }

      await prisma.roleCapability.upsert({
        where: {
          roleId_capabilityId: {
            roleId: createdRole.id,
            capabilityId: capability.id,
          },
        },
        update: {},
        create: {
          roleId: createdRole.id,
          capabilityId: capability.id,
        },
      });
    }
  }

  for (const contentType of contentTypes) {
    await prisma.contentType.upsert({
      where: { slug: contentType.slug },
      update: {
        name: contentType.name,
        schema: contentType.schema,
      },
      create: contentType,
    });
  }

  const defaultPasswordHash = await argon2.hash(password);

  for (const userEntry of baseUsers) {
    const user = await prisma.user.upsert({
      where: { email: userEntry.email },
      update: {
        name: userEntry.name,
        passwordHash: defaultPasswordHash,
      },
      create: {
        email: userEntry.email,
        name: userEntry.name,
        passwordHash: defaultPasswordHash,
      },
    });

    const role = await prisma.role.findUnique({ where: { name: userEntry.role } });

    if (!role) {
      continue;
    }

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: role.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        roleId: role.id,
      },
    });
  }

  await prisma.taxonomy.upsert({
    where: { slug: "category" },
    update: { name: "Categories" },
    create: { slug: "category", name: "Categories" },
  });

  const categoryTaxonomy = await prisma.taxonomy.findUnique({ where: { slug: "category" } });

  if (categoryTaxonomy) {
    await prisma.term.upsert({
      where: {
        taxonomyId_slug: {
          taxonomyId: categoryTaxonomy.id,
          slug: "general",
        },
      },
      update: {
        name: "General",
        description: "Default seeded category.",
      },
      create: {
        taxonomyId: categoryTaxonomy.id,
        slug: "general",
        name: "General",
        description: "Default seeded category.",
      },
    });
  }

  await prisma.setting.upsert({
    where: { key: "general.site_title" },
    update: { value: "frozensapphire", version: 1 },
    create: { key: "general.site_title", value: "frozensapphire", version: 1 },
  });

  await prisma.setting.upsert({
    where: { key: "reading.homepage_mode" },
    update: { value: "latest_posts", version: 1 },
    create: { key: "reading.homepage_mode", value: "latest_posts", version: 1 },
  });

  const theme = await prisma.theme.upsert({
    where: { slug: "aurora" },
    update: {
      name: "Aurora",
      version: "0.1.0",
      active: true,
    },
    create: {
      slug: "aurora",
      name: "Aurora",
      version: "0.1.0",
      active: true,
    },
  });

  await prisma.template.upsert({
    where: {
      themeId_slug: {
        themeId: theme.id,
        slug: "index",
      },
    },
    update: { name: "Index" },
    create: {
      themeId: theme.id,
      slug: "index",
      name: "Index",
    },
  });

  await prisma.plugin.upsert({
    where: { slug: "hello-world" },
    update: {
      name: "Hello World",
      version: "0.1.0",
      status: "inactive",
      manifest: {
        slug: "hello-world",
        version: "0.1.0",
      },
    },
    create: {
      slug: "hello-world",
      name: "Hello World",
      version: "0.1.0",
      status: "inactive",
      manifest: {
        slug: "hello-world",
        version: "0.1.0",
      },
    },
  });
}

/**
 * Seeds baseline content that allows local and e2e workflows to run immediately.
 * @param prisma - Prisma client used for database operations.
 */
export async function seedSampleContent(prisma: PrismaClient): Promise<void> {
  const author = await prisma.user.findUnique({ where: { email: "author@frozensapphire.local" } });
  const postType = await prisma.contentType.findUnique({ where: { slug: "post" } });

  if (!author || !postType) {
    return;
  }

  await prisma.contentItem.upsert({
    where: {
      typeId_slug: {
        typeId: postType.id,
        slug: "welcome-to-frozensapphire",
      },
    },
    update: {
      title: "Welcome to frozensapphire",
      status: "published",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This seeded post verifies that rendering and listing work out of the box.",
              },
            ],
          },
        ],
      },
      publishedAt: new Date(),
    },
    create: {
      typeId: postType.id,
      authorId: author.id,
      title: "Welcome to frozensapphire",
      slug: "welcome-to-frozensapphire",
      status: "published",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This seeded post verifies that rendering and listing work out of the box.",
              },
            ],
          },
        ],
      },
      publishedAt: new Date(),
    },
  });
}
