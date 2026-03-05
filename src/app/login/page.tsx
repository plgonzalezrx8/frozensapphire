/**
 * Login page for admin access.
 */
import LoginForm from "@/app/login/LoginForm";

interface LoginPageProps {
  /** Search params from Next.js route context. */
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const callbackUrlParam = searchParams?.callbackUrl;
  const callbackUrl =
    typeof callbackUrlParam === "string" && callbackUrlParam.startsWith("/")
      ? callbackUrlParam
      : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <section className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Admin Sign In</h1>
          <p className="text-sm text-slate-300">
            Use your credentials to access the frozensapphire admin dashboard.
          </p>
        </header>
        <LoginForm callbackUrl={callbackUrl} />
      </section>
    </main>
  );
}
