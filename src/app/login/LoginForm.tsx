"use client";

/**
 * Client-side credentials form for logging into the admin area.
 */
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  /** Destination to redirect after successful login. */
  callbackUrl: string;
}

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    router.push(result.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-200">Email</span>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-200">Password</span>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {errorMessage ? (
        <p className="rounded-lg border border-rose-700 bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
