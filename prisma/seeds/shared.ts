/**
 * Shared seed helpers for local, integration, and E2E database states.
 */
import argon2 from "argon2";
import type { PrismaClient } from "@prisma/client";

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
    capabilities: [
      "admin.access",
      "content.create",
      "content.edit",
      "content.publish",
    ],
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

/**
 * Deletes mutable CMS records so deterministic seeds can rebuild state.
 * @param prisma - Prisma client used for database operations.
 */
export async function resetSeedData(prisma: PrismaClient): Promise<void> {
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
    prisma.template.deleteMany(),
    prisma.themeSetting.deleteMany(),
    prisma.theme.deleteMany(),
    prisma.pluginSetting.deleteMany(),
    prisma.plugin.deleteMany(),
    prisma.setting.deleteMany(),
    prisma.hookRegistry.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.userRole.deleteMany(),
    prisma.roleCapability.deleteMany(),
    prisma.authAccount.deleteMany(),
    prisma.authSession.deleteMany(),
    prisma.user.deleteMany(),
    prisma.contentType.deleteMany(),
    prisma.role.deleteMany(),
    prisma.capability.deleteMany(),
  ]);
}

/**
 * Seeds reusable core records required by the CMS runtime.
 * @param prisma - Prisma client used for database operations.
 * @param password - Default password used for seeded users.
 */
export async function seedCoreData(
  prisma: PrismaClient,
  password: string,
): Promise<void> {
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

  const passwordHash = await argon2.hash(password);

  for (const userEntry of baseUsers) {
    const user = await prisma.user.upsert({
      where: { email: userEntry.email },
      update: {
        name: userEntry.name,
        passwordHash,
      },
      create: {
        email: userEntry.email,
        name: userEntry.name,
        passwordHash,
      },
    });

    const role = await prisma.role.findUnique({
      where: { name: userEntry.role },
    });

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
}

/**
 * Seeds baseline public content and extension records for local installs.
 * @param prisma - Prisma client used for database operations.
 */
export async function seedSampleContent(prisma: PrismaClient): Promise<void> {
  const author = await prisma.user.findUnique({
    where: { email: "author@frozensapphire.local" },
  });
  const postType = await prisma.contentType.findUnique({
    where: { slug: "post" },
  });

  if (!author || !postType) {
    return;
  }

  await prisma.theme.upsert({
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

  await prisma.plugin.upsert({
    where: { slug: "hello-world" },
    update: {
      name: "Hello World",
      version: "0.1.0",
      status: "inactive",
    },
    create: {
      slug: "hello-world",
      name: "Hello World",
      version: "0.1.0",
      status: "inactive",
    },
  });

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
                text: "This seeded post confirms the public render path is alive.",
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
                text: "This seeded post confirms the public render path is alive.",
              },
            ],
          },
        ],
      },
      publishedAt: new Date(),
    },
  });
}
