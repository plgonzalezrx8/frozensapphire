"use client";

/**
 * Minimal content management UI backed by REST API endpoints.
 */
import { useMemo, useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "pending" | "scheduled" | "published";
  typeId: string;
}

interface ContentType {
  id: string;
  name: string;
  slug: string;
}

interface ContentManagerProps {
  /** Initial content list provided by the server component. */
  initialItems: ContentItem[];
  /** Initial content type list provided by the server component. */
  initialTypes: ContentType[];
}

const DEFAULT_STATUS: ContentItem["status"] = "draft";

export default function ContentManager({ initialItems, initialTypes }: ContentManagerProps) {
  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [types] = useState<ContentType[]>(initialTypes);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ContentItem["status"]>(DEFAULT_STATUS);
  const [typeId, setTypeId] = useState(initialTypes[0]?.id ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedTypeId = useMemo(() => typeId || types[0]?.id || "", [typeId, types]);

  async function createContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTypeId) {
      setErrorMessage("No content type available. Seed content types first.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    const response = await fetch("/api/v1/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeId: selectedTypeId,
        title,
        status,
        content: {
          type: "doc",
          content: [],
        },
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setErrorMessage(payload?.error?.message ?? "Failed to create content item.");
      setIsSaving(false);
      return;
    }

    setItems((previous) => [payload, ...previous]);
    setTitle("");
    setStatus(DEFAULT_STATUS);
    setIsSaving(false);
  }

  async function togglePublished(item: ContentItem) {
    const nextStatus = item.status === "published" ? "draft" : "published";
    const response = await fetch(`/api/v1/content/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setErrorMessage(payload?.error?.message ?? "Failed to update status.");
      return;
    }

    setItems((previous) =>
      previous.map((entry) => (entry.id === payload.id ? payload : entry)),
    );
  }

  async function deleteItem(item: ContentItem) {
    const response = await fetch(`/api/v1/content/${item.id}`, {
      method: "DELETE",
    });

    const payload = await response.json();

    if (!response.ok) {
      setErrorMessage(payload?.error?.message ?? "Failed to delete content.");
      return;
    }

    if (payload.deleted) {
      setItems((previous) => previous.filter((entry) => entry.id !== item.id));
    }
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Content</h2>
        <p className="text-sm text-slate-300">
          Create and manage content items using the REST API.
        </p>
      </header>

      <form
        className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:grid-cols-4"
        onSubmit={createContent}
      >
        <input
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          placeholder="Content title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <select
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          value={selectedTypeId}
          onChange={(event) => setTypeId(event.target.value)}
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          value={status}
          onChange={(event) => setStatus(event.target.value as ContentItem["status"])}
        >
          <option value="draft">draft</option>
          <option value="pending">pending</option>
          <option value="scheduled">scheduled</option>
          <option value="published">published</option>
        </select>
        <button
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-70"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? "Saving..." : "Create"}
        </button>
      </form>

      {errorMessage ? (
        <p className="rounded-lg border border-rose-700 bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4"
          >
            <div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {item.slug} · {item.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200"
                onClick={() => togglePublished(item)}
                type="button"
              >
                {item.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button
                className="rounded-lg border border-rose-700 px-3 py-2 text-xs font-semibold text-rose-300"
                onClick={() => deleteItem(item)}
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
