/**
 * Admin dashboard placeholder for frozensapphire.
 * Widgets will be populated once services are implemented.
 */

const dashboardCards = [
  {
    title: "Content",
    description: "Create and manage posts, pages, and custom types.",
  },
  {
    title: "Media Library",
    description: "Upload and organize media assets.",
  },
  {
    title: "Site Health",
    description: "Review system checks and background jobs.",
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Dashboard</h2>
        <p className="text-sm text-slate-300">
          Welcome to frozensapphire. This dashboard will surface publishing
          workflows, system health, and moderation queues.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
          >
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="text-sm text-slate-300">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
