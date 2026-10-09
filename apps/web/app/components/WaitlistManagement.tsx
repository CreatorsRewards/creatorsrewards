"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  UserCheck,
  X,
  Loader2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Config & types                                                            */
/* -------------------------------------------------------------------------- */

const API_URL = `${process.env.NEST_API_URL ?? "http://localhost:4000"}/api`;
const CATEGORIES = ["Creator", "Brand", "Partner", "Other"];
const UNCATEGORIZED = "Uncategorized";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  category?: string | null;
  notes?: string | null;
  createdAt?: string;
}

interface FormValues {
  name: string;
  email: string;
  category: string; // "" = uncategorized
  notes: string;
}

type ModalState =
  | { type: "add" }
  | { type: "edit"; entry: WaitlistEntry }
  | { type: "view"; entry: WaitlistEntry }
  | { type: "delete"; entry: WaitlistEntry }
  | { type: "convert"; entry: WaitlistEntry }
  | null;

/* -------------------------------------------------------------------------- */
/*  API helper                                                                */
/* -------------------------------------------------------------------------- */

async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // TODO: attach your admin auth token here, e.g.
      // Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = Array.isArray(body.message)
        ? body.message.join(", ")
        : (body.message ?? message);
    } catch {
      /* response had no JSON body */
    }
    throw new Error(message);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

/* -------------------------------------------------------------------------- */
/*  Small UI pieces                                                           */
/* -------------------------------------------------------------------------- */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function EntryForm({
  initial,
  submitLabel,
  busy,
  onSubmit,
  onCancel,
}: {
  initial?: WaitlistEntry;
  submitLabel: string;
  busy: boolean;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<FormValues>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    category: initial?.category ?? "",
    notes: initial?.notes ?? "",
  });

  const set =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Name
        <input
          className={`${inputClass} mt-1`}
          value={values.name}
          onChange={set("name")}
          placeholder="Full name"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Email
        <input
          type="email"
          className={`${inputClass} mt-1`}
          value={values.email}
          onChange={set("email")}
          placeholder="name@example.com"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Category
        <select
          className={`${inputClass} mt-1 bg-white`}
          value={values.category}
          onChange={set("category")}
        >
          <option value="">{UNCATEGORIZED}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Notes
        <textarea
          className={`${inputClass} mt-1`}
          rows={3}
          value={values.notes}
          onChange={set("notes")}
          placeholder="Where they came from, what they asked for…"
        />
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={busy || !values.name.trim() || !values.email.trim()}
          onClick={() => onSubmit(values)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

function ConfirmBody({
  message,
  confirmLabel,
  tone,
  busy,
  onConfirm,
  onCancel,
}: {
  message: React.ReactNode;
  confirmLabel: string;
  tone: "danger" | "primary";
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <p className="text-sm text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={busy}
          onClick={onConfirm}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${
            tone === "danger"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function WaitlistManagementPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");

  const [modal, setModal] = useState<ModalState>(null);
  const [busy, setBusy] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null);

  const notify = (text: string, error = false) => {
    setToast({ text, error });
    setTimeout(() => setToast(null), 3500);
  };

  const closeModal = useCallback(() => {
    setModal(null);
    setModalError(null);
  }, []);

  /* ---------------------------------- read --------------------------------- */

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api<WaitlistEntry[] | { data: WaitlistEntry[] }>(
        "/users/waitlist",
      );
      setEntries(Array.isArray(res) ? res : (res?.data ?? []));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load waitlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* --------------------------------- actions ------------------------------- */

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setModalError(null);
    try {
      await action();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const toPayload = (v: FormValues) => ({
    name: v.name.trim(),
    email: v.email.trim(),
    category: v.category || null,
    notes: v.notes.trim() || null,
  });

  const handleAdd = (values: FormValues) =>
    run(async () => {
      const created = await api<WaitlistEntry>("/users/waitlist", {
        method: "POST",
        body: JSON.stringify(toPayload(values)),
      });
      setEntries((prev) => [created, ...prev]);
      closeModal();
      notify(`${created.name} added to the waitlist`);
    });

  const handleUpdate = (entry: WaitlistEntry, values: FormValues) =>
    run(async () => {
      const updated = await api<WaitlistEntry>(`/users/waitlist/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify(toPayload(values)),
      });
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, ...updated } : e)),
      );
      closeModal();
      notify("Changes saved");
    });

  // Inline categorize: optimistic update, roll back on failure
  const handleCategorize = async (entry: WaitlistEntry, category: string) => {
    const previous = entry.category ?? null;
    const next = category || null;
    setEntries((prev) =>
      prev.map((e) => (e.id === entry.id ? { ...e, category: next } : e)),
    );
    try {
      await api(`/users/waitlist/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify({ category: next }),
      });
    } catch (err) {
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, category: previous } : e)),
      );
      notify(err instanceof Error ? err.message : "Could not update category", true);
    }
  };

  const handleDelete = (entry: WaitlistEntry) =>
    run(async () => {
      await api(`/users/waitlist/${entry.id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      closeModal();
      notify(`${entry.name} removed from the waitlist`);
    });

  const handleConvert = (entry: WaitlistEntry) =>
    run(async () => {
      await api(`/users/waitlist/${entry.id}/convert`, { method: "POST" });
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      closeModal();
      notify(`${entry.name} is now a user`);
    });

  /* -------------------------------- filtering ------------------------------ */

  const tabs = useMemo(() => ["All", ...CATEGORIES, UNCATEGORIZED], []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: entries.length };
    for (const e of entries) {
      const key = e.category || UNCATEGORIZED;
      map[key] = (map[key] ?? 0) + 1;
    }
    return map;
  }, [entries]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const cat = e.category || UNCATEGORIZED;
      if (activeTab !== "All" && cat !== activeTab) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
      );
    });
  }, [entries, activeTab, query]);

  /* ---------------------------------- view --------------------------------- */

  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {/* <h1 className="mb-2 text-3xl font-semibold">Waitlist</h1> */}
          <p className="text-gray-600">
            Review people waiting for access, sort them into categories, and
            turn them into users when they&apos;re ready.
          </p>
        </div>
        <button
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Add to waitlist
        </button>
      </header>

      {/* Filters & search */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-t-lg border border-b-0 border-gray-200 bg-white p-4 lg:flex-row">
        <div className="flex w-full space-x-1 overflow-x-auto rounded-lg bg-gray-100 p-1 lg:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              <span className="ml-1.5 text-xs text-gray-400">
                {counts[tab] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading waitlist…
          </div>
        ) : loadError ? (
          <div className="py-16 text-center">
            <p className="mb-3 text-sm text-red-600">{loadError}</p>
            <button
              onClick={load}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Try again
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            {entries.length === 0
              ? "No one is on the waitlist yet. Add the first person to get started."
              : "No one matches this filter."}
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4">Person</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.map((entry) => (
                <tr key={entry.id} className="group transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{entry.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={entry.category ?? ""}
                      onChange={(e) => handleCategorize(entry, e.target.value)}
                      aria-label={`Category for ${entry.name}`}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        entry.category
                          ? "border-blue-100 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-500"
                      }`}
                    >
                      <option value="">{UNCATEGORIZED}</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">{formatDate(entry.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                      <button
                        onClick={() => setModal({ type: "convert", entry })}
                        className="flex items-center gap-1 rounded px-2 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50"
                        title="Convert to user"
                      >
                        <UserCheck className="h-4 w-4" /> Convert
                      </button>
                      <button
                        onClick={() => setModal({ type: "view", entry })}
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setModal({ type: "edit", entry })}
                        className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setModal({ type: "delete", entry })}
                        className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && !loadError && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {visible.length} of {entries.length} on the waitlist
        </p>
      )}

      {/* Modals */}
      {modal?.type === "add" && (
        <Modal title="Add to waitlist" onClose={closeModal}>
          {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}
          <EntryForm
            submitLabel="Add to waitlist"
            busy={busy}
            onSubmit={handleAdd}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal title="Edit waitlist entry" onClose={closeModal}>
          {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}
          <EntryForm
            initial={modal.entry}
            submitLabel="Save changes"
            busy={busy}
            onSubmit={(v) => handleUpdate(modal.entry, v)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "view" && (
        <Modal title={modal.entry.name} onClose={closeModal}>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium text-gray-900">{modal.entry.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Category</dt>
              <dd className="font-medium text-gray-900">
                {modal.entry.category || UNCATEGORIZED}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Joined</dt>
              <dd className="font-medium text-gray-900">
                {formatDate(modal.entry.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Notes</dt>
              <dd className="whitespace-pre-wrap text-gray-900">
                {modal.entry.notes || "No notes"}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setModal({ type: "edit", entry: modal.entry })}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => setModal({ type: "convert", entry: modal.entry })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Convert to user
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete waitlist entry" onClose={closeModal}>
          {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}
          <ConfirmBody
            tone="danger"
            busy={busy}
            confirmLabel="Delete entry"
            message={
              <>
                This removes <strong>{modal.entry.name}</strong> (
                {modal.entry.email}) from the waitlist. This can&apos;t be undone.
              </>
            }
            onConfirm={() => handleDelete(modal.entry)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "convert" && (
        <Modal title="Convert to user" onClose={closeModal}>
          {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}
          <ConfirmBody
            tone="primary"
            busy={busy}
            confirmLabel="Convert to user"
            message={
              <>
                <strong>{modal.entry.name}</strong> ({modal.entry.email}) will
                get a user account and leave the waitlist.
              </>
            }
            onConfirm={() => handleConvert(modal.entry)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.error ? "bg-red-600" : "bg-gray-900"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}