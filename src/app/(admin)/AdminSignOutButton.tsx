"use client";

/**
 * Sign-out button for the admin shell.
 */
import { signOut } from "next-auth/react";

export default function AdminSignOutButton() {
  return (
    <button
      className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
    >
      Sign out
    </button>
  );
}
