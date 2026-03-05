/**
 * Public layout wrapper for frontend routes.
 * Keeps public rendering concerns separate from the admin shell.
 */
import type { ReactNode } from "react";

interface PublicLayoutProps {
  /** Child routes rendered within the public layout. */
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">{children}</div>
    </main>
  );
}
