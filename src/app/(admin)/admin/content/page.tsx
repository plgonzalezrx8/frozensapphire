/**
 * Admin content management page.
 */
import ContentManager from "@/app/(admin)/admin/content/ContentManager";
import { prisma } from "@/lib/db";

export default async function AdminContentPage() {
  const [initialItems, initialTypes] = await Promise.all([
    prisma.contentItem.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        typeId: true,
      },
    }),
    prisma.contentType.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
  ]);

  return <ContentManager initialItems={initialItems} initialTypes={initialTypes} />;
}
