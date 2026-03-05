/**
 * Seeds default roles and capabilities for frozensapphire.
 * Run via `pnpm prisma db seed` once Prisma seeding is configured.
 */
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    capabilities: capabilities.map((cap) => cap.key),
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

const defaultContentTypes = [
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

const demoUsers = [
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
    name: "Author User",
    role: "Author",
  },
  {
    email: "contributor@frozensapphire.local",
    name: "Contributor User",
    role: "Contributor",
  },
];

async function main() {
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
      create: { name: role.name, description: role.description },
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

  for (const contentType of defaultContentTypes) {
    await prisma.contentType.upsert({
      where: { slug: contentType.slug },
      update: {
        name: contentType.name,
        schema: contentType.schema,
      },
      create: contentType,
    });
  }

  const defaultPasswordHash = await argon2.hash("ChangeMe123!");

  for (const demoUser of demoUsers) {
    const user = await prisma.user.upsert({
      where: { email: demoUser.email },
      update: {
        name: demoUser.name,
        passwordHash: defaultPasswordHash,
      },
      create: {
        email: demoUser.email,
        name: demoUser.name,
        passwordHash: defaultPasswordHash,
      },
    });

    const role = await prisma.role.findUnique({
      where: { name: demoUser.role },
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
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
