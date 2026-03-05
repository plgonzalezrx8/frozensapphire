/**
 * Public homepage placeholder.
 * This will be replaced by theme-driven rendering once templates are wired.
 */
import Link from "next/link";

export default function PublicHomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          frozensapphire
        </p>
        <h1 className="text-4xl font-semibold leading-tight">
          A modern CMS with WordPress-core parity on Next.js.
        </h1>
        <p className="text-lg text-slate-600">
          This is a temporary public homepage. Theme templates will take over
          once the active theme is configured.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          href="/admin"
        >
          Open Admin
        </Link>
        <Link
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700"
          href="/api/v1/health"
        >
          API Health
        </Link>
      </div>
    </section>
  );
}
