/**
 * Public content renderer placeholder for posts/pages by slug.
 * This will hydrate content from the CMS once the content service is wired.
 */
import type { Metadata } from "next";

interface PublicContentPageProps {
  /** Dynamic route params provided by Next.js. */
  params: { slug: string };
}

export const metadata: Metadata = {
  title: "Content", 
  description: "CMS content placeholder page.",
};

export default function PublicContentPage({ params }: PublicContentPageProps) {
  return (
    <article className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Content Preview
      </p>
      <h1 className="text-3xl font-semibold text-slate-900">{params.slug}</h1>
      <p className="text-base text-slate-600">
        This page is a placeholder for the content renderer. Once content
        services are implemented, this will resolve published posts and pages by
        permalink.
      </p>
    </article>
  );
}
