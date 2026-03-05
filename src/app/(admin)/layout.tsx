/**
 * Admin layout for frozensapphire CMS.
 * Provides consistent navigation and styling for admin routes.
 */
import type { ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  /** Child routes rendered within the admin layout. */
  children: ReactNode;
}

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-6 py-10">
        <aside className="w-56 shrink-0 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              frozensapphire
            </p>
            <h1 className="text-2xl font-semibold">Admin</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 rounded-3xl bg-white/5 p-8 shadow-xl shadow-black/20">
          {children}
        </main>
      </div>
    </div>
  );
}
