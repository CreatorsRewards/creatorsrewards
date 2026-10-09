"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  Trash2,
  UserCheck,
  StickyNote,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  ActionMenu,
  Modal,
  api,
  formatDate,
  humanize,
  useToast,
  type MenuItem,
} from "./shared";

/* -------------------------------------------------------------------------- */
/*  Types (mirrors the waitlist payload from the API)                         */
/* -------------------------------------------------------------------------- */

export interface WaitlistEntry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  location_city: string | null;
  location_country: string | null;
  gender: string | null;
  primary_platform: string | null;
  instagram_handle: string | null;
  instagram_link: string | null;
  tiktok_handle: string | null;
  tiktok_link: string | null;
  youtube_handle: string | null;
  youtube_link: string | null;
  twitter_handle: string | null;
  twitter_link: string | null;
  facebook_handle: string | null;
  facebook_link: string | null;
  snapchat_handle: string | null;
  snapchat_link: string | null;
  creator_type: string | null;
  content_niches: string[] | null;
  content_formats: string[] | null;
  follower_range: string | null;
  bio: string | null;
  has_worked_with_brands: boolean | null;
  brand_count_estimate: number | null;
  preferred_deal_type: string[] | null;
  referral_source: string | null;
  referral_code: string | null;
  status: string;
  admin_notes: string | null;
  waitlist_position: number | null;
}

const PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
  "twitter",
  "facebook",
  "snapchat",
] as const;

const STATUSES = ["pending", "approved", "rejected"] as const;

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const PAGE_SIZES = [10, 25, 50];

const getHandle = (e: WaitlistEntry, platform: string) =>
  (e[`${platform}_handle` as keyof WaitlistEntry] as string | null) ?? null;

const getLink = (e: WaitlistEntry, platform: string) => {
  const raw = e[`${platform}_link` as keyof WaitlistEntry] as string | null;
  if (!raw) return null;
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};

type ModalState =
  | { type: "view"; entry: WaitlistEntry }
  | { type: "notes"; entry: WaitlistEntry }
  | { type: "convert"; entry: WaitlistEntry }
  | { type: "delete"; entry: WaitlistEntry }
  | null;

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {humanize(status)}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-900">{children || "—"}</dd>
    </div>
  );
}

function Chips({ values }: { values?: string[] | null }) {
  if (!values?.length) return <>—</>;
  return (
    <span className="flex flex-wrap gap-1">
      {values.map((v) => (
        <span
          key={v}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
        >
          {humanize(v)}
        </span>
      ))}
    </span>
  );
}

function EntryDetails({ entry }: { entry: WaitlistEntry }) {
  const socials = PLATFORMS.filter((p) => getHandle(entry, p));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {entry.full_name}
          </p>
          <p className="text-sm text-gray-500">{entry.email}</p>
        </div>
        <div className="text-right">
          <StatusBadge status={entry.status} />
          {entry.waitlist_position != null && (
            <p className="mt-1 text-xs text-gray-500">
              Position #{entry.waitlist_position}
            </p>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Phone">{entry.phone}</Field>
        <Field label="Location">
          {[entry.location_city, entry.location_country]
            .filter(Boolean)
            .join(", ")}
        </Field>
        <Field label="Gender">{humanize(entry.gender)}</Field>
        <Field label="Joined">{formatDate(entry.created_at)}</Field>
        <Field label="Creator type">{humanize(entry.creator_type)}</Field>
        <Field label="Followers">{entry.follower_range}</Field>
        <Field label="Primary platform">
          {humanize(entry.primary_platform)}
        </Field>
        <Field label="Preferred deals">
          <Chips values={entry.preferred_deal_type} />
        </Field>
        <div className="col-span-2">
          <Field label="Content niches">
            <Chips values={entry.content_niches} />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Content formats">
            <Chips values={entry.content_formats} />
          </Field>
        </div>
      </dl>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Social accounts</p>
        {socials.length === 0 ? (
          <p className="text-sm text-gray-500">No accounts provided.</p>
        ) : (
          <ul className="space-y-1.5 text-sm">
            {socials.map((p) => {
              const link = getLink(entry, p);
              const handle = getHandle(entry, p);
              return (
                <li key={p} className="flex items-center gap-2">
                  <span className="w-20 text-gray-500">{humanize(p)}</span>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @{handle}
                    </a>
                  ) : (
                    <span className="text-gray-900">@{handle}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Worked with brands">
          {entry.has_worked_with_brands == null
            ? null
            : entry.has_worked_with_brands
              ? entry.brand_count_estimate != null
                ? `Yes (about ${entry.brand_count_estimate})`
                : "Yes"
              : "No"}
        </Field>
        <Field label="Heard about us via">
          {humanize(entry.referral_source)}
          {entry.referral_code ? ` (${entry.referral_code})` : ""}
        </Field>
        <div className="col-span-2">
          <Field label="Bio">
            <span className="whitespace-pre-wrap">{entry.bio}</span>
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Admin notes">
            <span className="whitespace-pre-wrap">{entry.admin_notes}</span>
          </Field>
        </div>
      </dl>
    </div>
  );
}

function NotesForm({
  entry,
  busy,
  onSave,
  onCancel,
}: {
  entry: WaitlistEntry;
  busy: boolean;
  onSave: (notes: string) => void;
  onCancel: () => void;
}) {
  const [notes, setNotes] = useState(entry.admin_notes ?? "");
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Notes about {entry.full_name}
        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal only. Applicants never see this."
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={busy}
          onClick={() => onSave(notes)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Save notes
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
/*  Tab                                                                       */
/* -------------------------------------------------------------------------- */

export default function WaitlistTab({
  search,
  refreshKey = 0,
}: {
  search: string;
  refreshKey?: number;
}) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [modal, setModal] = useState<ModalState>(null);
  const [busy, setBusy] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const { notify, toastNode } = useToast();

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
      const list = Array.isArray(res) ? res : (res?.data ?? []);
      setEntries(
        [...list].sort(
          (a, b) => (a.waitlist_position ?? 1e9) - (b.waitlist_position ?? 1e9),
        ),
      );
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Could not load the waitlist",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

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

  const patchLocal = (id: string, patch: Partial<WaitlistEntry>) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  // Optimistic status change, rolled back if the request fails
  const updateStatus = async (entry: WaitlistEntry, status: string) => {
    const previous = entry.status;
    patchLocal(entry.id, { status });
    try {
      await api(`/users/waitlist/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      notify(`${entry.full_name} marked as ${status}`);
    } catch (err) {
      patchLocal(entry.id, { status: previous });
      notify(
        err instanceof Error ? err.message : "Could not update status",
        true,
      );
    }
  };

  const saveNotes = (entry: WaitlistEntry, notes: string) =>
    run(async () => {
      const value = notes.trim() || null;
      await api(`/users/waitlist/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify({ admin_notes: value }),
      });
      patchLocal(entry.id, { admin_notes: value });
      closeModal();
      notify("Notes saved");
    });

  const convert = (entry: WaitlistEntry) =>
    run(async () => {
      await api(`/users/waitlist/${entry.id}/convert`, { method: "POST" });
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      closeModal();
      notify(`${entry.full_name} is now a user`);
    });

  const remove = (entry: WaitlistEntry) =>
    run(async () => {
      await api(`/users/waitlist/${entry.id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      closeModal();
      notify(`${entry.full_name} removed from the waitlist`);
    });

  const menuFor = (entry: WaitlistEntry): MenuItem[] => [
    {
      label: "View details",
      icon: <Eye className="h-4 w-4 text-gray-400" />,
      onClick: () => setModal({ type: "view", entry }),
    },
    {
      label: "Convert to user",
      icon: <UserCheck className="h-4 w-4 text-gray-400" />,
      onClick: () => setModal({ type: "convert", entry }),
    },
    {
      label: "Edit notes",
      icon: <StickyNote className="h-4 w-4 text-gray-400" />,
      onClick: () => setModal({ type: "notes", entry }),
    },
    {
      label: "Mark as approved",
      icon: <CheckCircle2 className="h-4 w-4 text-gray-400" />,
      hidden: entry.status === "approved",
      separatorBefore: true,
      onClick: () => updateStatus(entry, "approved"),
    },
    {
      label: "Mark as rejected",
      icon: <XCircle className="h-4 w-4 text-gray-400" />,
      hidden: entry.status === "rejected",
      onClick: () => updateStatus(entry, "rejected"),
    },
    {
      label: "Mark as pending",
      icon: <Clock className="h-4 w-4 text-gray-400" />,
      hidden: entry.status === "pending",
      onClick: () => updateStatus(entry, "pending"),
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      danger: true,
      separatorBefore: true,
      onClick: () => setModal({ type: "delete", entry }),
    },
  ];

  /* ---------------------------- filter + paginate -------------------------- */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      [
        e.full_name,
        e.email,
        e.phone,
        e.location_city,
        e.location_country,
        e.creator_type,
        ...PLATFORMS.map((p) => getHandle(e, p)),
      ].some((v) => v?.toLowerCase().includes(q)),
    );
  }, [entries, search]);

  useEffect(() => setPage(1), [search, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  /* ---------------------------------- view --------------------------------- */

  return (
    <>
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
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            {entries.length === 0
              ? "No one has joined the waitlist yet."
              : "No one matches your search."}
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Creator</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((e) => {
                const handle = e.primary_platform
                  ? getHandle(e, e.primary_platform)
                  : null;
                const niches = e.content_niches ?? [];
                return (
                  <tr key={e.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{e.full_name}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{e.email}</p>
                      {e.phone && (
                        <p className="text-xs text-gray-500">{e.phone}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{humanize(e.creator_type)}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {niches.slice(0, 2).join(", ")}
                        {niches.length > 2 && ` +${niches.length - 2}`}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">
                        {humanize(e.primary_platform)}
                        {handle && (
                          <span className="text-gray-500"> @{handle}</span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {e.follower_range ?? "—"} followers
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {[e.location_city, e.location_country]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p>{formatDate(e.created_at)}</p>
                      {e.waitlist_position != null && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          #{e.waitlist_position} in line
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionMenu
                        items={menuFor(e)}
                        label={`Actions for ${e.full_name}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && !loadError && filtered.length > 0 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
          <p>
            Showing {start + 1} to {Math.min(start + pageSize, filtered.length)}{" "}
            of {filtered.length} on the waitlist
          </p>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              Rows
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded border border-gray-200 bg-white px-2 py-1 text-sm"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded border border-gray-200 px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="rounded border border-gray-200 px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modal?.type === "view" && (
        <Modal title="Waitlist applicant" size="lg" onClose={closeModal}>
          <EntryDetails entry={modal.entry} />
          <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              onClick={() => setModal({ type: "notes", entry: modal.entry })}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit notes
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

      {modal?.type === "notes" && (
        <Modal title="Admin notes" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <NotesForm
            entry={modal.entry}
            busy={busy}
            onSave={(n) => saveNotes(modal.entry, n)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "convert" && (
        <Modal title="Convert to user" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <ConfirmBody
            tone="primary"
            busy={busy}
            confirmLabel="Convert to user"
            message={
              <>
                <strong>{modal.entry.full_name}</strong> ({modal.entry.email})
                will get a user account and leave the waitlist.
              </>
            }
            onConfirm={() => convert(modal.entry)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete waitlist entry" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <ConfirmBody
            tone="danger"
            busy={busy}
            confirmLabel="Delete entry"
            message={
              <>
                This removes <strong>{modal.entry.full_name}</strong> (
                {modal.entry.email}) from the waitlist. This can&apos;t be
                undone.
              </>
            }
            onConfirm={() => remove(modal.entry)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {toastNode}
    </>
  );
}