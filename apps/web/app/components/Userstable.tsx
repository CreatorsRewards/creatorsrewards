"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Ban,
  Building,
  CheckCircle2,
  Edit2,
  Eye,
  Loader2,
  Shield,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import {
  ACCOUNT_STATUS,
  ActionMenu,
  ConfirmBody,
  Modal,
  PAGE_SIZES,
  Pagination,
  USER_ROLES,
  api,
  formatDate,
  humanize,
  useToast,
  type MenuItem,
  type UserRole,
} from "./shared";

/* -------------------------------------------------------------------------- */
/*  Types (mirrors the Prisma User model)                                     */
/* -------------------------------------------------------------------------- */

export interface User {
  id: string;
  email: string | null;
  fullName: string | null;
  country: string | null;
  phone: string | null;
  role: UserRole;
  accountStatus: string;
  authProvider: string;
  failedVerificationAttempts: number;
  nairaBalance: number;
  usdtBalance: number;
  createdAt: string;
  updatedAt: string;
}

type ModalState =
  | { type: "view"; user: User }
  | { type: "edit"; user: User }
  | { type: "role"; user: User }
  | { type: "delete"; user: User }
  | null;

const ROLE_ICON: Record<UserRole, React.ReactNode> = {
  UGC_CREATOR: <Users className="h-4 w-4 text-blue-500" />,
  CLIPPER: <Users className="h-4 w-4 text-blue-500" />,
  BRAND: <Building className="h-4 w-4 text-purple-500" />,
  CUSTOMER_REP: <Shield className="h-4 w-4 text-gray-500" />,
  ADMIN: <Shield className="h-4 w-4 text-gray-700" />,
  SUPER_ADMIN: <Shield className="h-4 w-4 text-gray-900" />,
};

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING_VERIFICATION: "bg-yellow-100 text-yellow-700",
  SUSPENDED: "bg-red-100 text-red-700",
};

const INPUT =
  "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        STATUS_STYLE[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {humanize(status)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal bodies                                                              */
/* -------------------------------------------------------------------------- */

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}

function UserDetails({ user }: { user: User }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {user.fullName || "Unnamed user"}
          </p>
          <p className="text-sm text-gray-500">{user.email ?? "No email"}</p>
        </div>
        <StatusBadge status={user.accountStatus} />
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Detail label="Role" value={humanize(user.role)} />
        <Detail label="Sign-in method" value={humanize(user.authProvider)} />
        <Detail label="Phone" value={user.phone} />
        <Detail label="Country" value={user.country} />
        <Detail label="Naira balance" value={naira(user.nairaBalance)} />
        <Detail label="USDT balance" value={user.usdtBalance.toLocaleString()} />
        <Detail
          label="Failed verification attempts"
          value={String(user.failedVerificationAttempts)}
        />
        <Detail label="Joined" value={formatDate(user.createdAt)} />
        <Detail label="Last updated" value={formatDate(user.updatedAt)} />
      </dl>
    </div>
  );
}

function EditForm({
  user,
  busy,
  onSave,
  onCancel,
}: {
  user: User;
  busy: boolean;
  onSave: (v: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
  }) => void;
  onCancel: () => void;
}) {
  const [v, setV] = useState({
    fullName: user.fullName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    country: user.country ?? "",
  });
  const set =
    (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setV((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Full name
        <input className={INPUT} value={v.fullName} onChange={set("fullName")} />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Email
        <input
          type="email"
          className={INPUT}
          value={v.email}
          onChange={set("email")}
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Phone
          <input className={INPUT} value={v.phone} onChange={set("phone")} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Country
          <input className={INPUT} value={v.country} onChange={set("country")} />
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={busy || !v.email.trim()}
          onClick={() => onSave(v)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </button>
      </div>
    </div>
  );
}

function RoleForm({
  user,
  busy,
  onSave,
  onCancel,
}: {
  user: User;
  busy: boolean;
  onSave: (role: UserRole) => void;
  onCancel: () => void;
}) {
  const [role, setRole] = useState<UserRole>(user.role);
  const grantsAdmin =
    (role === "ADMIN" || role === "SUPER_ADMIN") && role !== user.role;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Role for {user.fullName || user.email}
        <select
          className={`${INPUT} bg-white`}
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>
              {humanize(r)}
            </option>
          ))}
        </select>
      </label>
      {grantsAdmin && (
        <p className="rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
          This gives {humanize(role)} access to admin tools. Only continue if
          you trust this person.
        </p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={busy || role === user.role}
          onClick={() => onSave(role)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Update role
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tab                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Used by the All, Creators, Brands and Admins tabs.
 * Pass `roles` to restrict the table to those roles.
 */
export default function UsersTable({
  roles,
  search,
  refreshKey = 0,
  onLoadingChange,
}: {
  roles?: UserRole[];
  search: string;
  refreshKey?: number;
  onLoadingChange?: (loading: boolean) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
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
      const res = await api<User[] | { data: User[] }>("/users");
      const list = Array.isArray(res) ? res : (res?.data ?? []);
      setUsers(
        [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

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

  const patchLocal = (id: string, patch: Partial<User>) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const saveEdit = (
    user: User,
    v: { fullName: string; email: string; phone: string; country: string },
  ) =>
    run(async () => {
      const updated = await api<User>(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          fullName: v.fullName.trim() || null,
          email: v.email.trim(),
          phone: v.phone.trim() || null,
          country: v.country.trim() || null,
        }),
      });
      patchLocal(user.id, updated);
      closeModal();
      notify("Changes saved");
    });

  const saveRole = (user: User, role: UserRole) =>
    run(async () => {
      const updated = await api<User>(`/users/${user.id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      patchLocal(user.id, { role: updated?.role ?? role });
      closeModal();
      notify(`${user.fullName || user.email} is now ${humanize(role)}`);
    });

  // Optimistic status toggle, rolled back if the request fails
  const setStatus = async (user: User, accountStatus: string) => {
    const previous = user.accountStatus;
    patchLocal(user.id, { accountStatus });
    try {
      await api(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ accountStatus }),
      });
      notify(`${user.fullName || user.email} is now ${humanize(accountStatus)}`);
    } catch (err) {
      patchLocal(user.id, { accountStatus: previous });
      notify(
        err instanceof Error ? err.message : "Could not update status",
        true,
      );
    }
  };

  const remove = (user: User) =>
    run(async () => {
      await api(`/users/${user.id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      closeModal();
      notify(`${user.fullName || user.email} was deleted`);
    });

  const menuFor = (user: User): MenuItem[] => {
    const suspended = user.accountStatus === ACCOUNT_STATUS.SUSPENDED;
    return [
      {
        label: "View details",
        icon: <Eye className="h-4 w-4 text-gray-400" />,
        onClick: () => setModal({ type: "view", user }),
      },
      {
        label: "Edit user",
        icon: <Edit2 className="h-4 w-4 text-gray-400" />,
        onClick: () => setModal({ type: "edit", user }),
      },
      {
        label: "Change role",
        icon: <UserCog className="h-4 w-4 text-gray-400" />,
        onClick: () => setModal({ type: "role", user }),
      },
      suspended
        ? {
            label: "Reactivate",
            icon: <CheckCircle2 className="h-4 w-4 text-gray-400" />,
            separatorBefore: true,
            onClick: () => setStatus(user, ACCOUNT_STATUS.ACTIVE),
          }
        : {
            label: "Suspend",
            icon: <Ban className="h-4 w-4 text-gray-400" />,
            separatorBefore: true,
            onClick: () => setStatus(user, ACCOUNT_STATUS.SUSPENDED),
          },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        danger: true,
        onClick: () => setModal({ type: "delete", user }),
      },
    ];
  };

  /* ---------------------------- filter + paginate -------------------------- */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        (!roles || roles.includes(u.role)) &&
        (!q ||
          (u.fullName ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q) ||
          (u.phone ?? "").toLowerCase().includes(q)),
    );
  }, [users, roles, search]);

  useEffect(() => setPage(1), [search, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  /* ---------------------------------- view --------------------------------- */

  return (
    <>
      <div className="overflow-x-auto rounded-b-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading users…
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
            {users.length === 0
              ? "No users yet."
              : "No users match your search."}
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {user.fullName || "Unnamed user"}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {user.email ?? "No email"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {ROLE_ICON[user.role]}
                      <span>{humanize(user.role)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.accountStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <p>{user.phone ?? "—"}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {user.country ?? ""}
                    </p>
                  </td>
                  <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      items={menuFor(user)}
                      label={`Actions for ${user.fullName || user.email}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && !loadError && (
        <Pagination
          page={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          noun="users"
          onPage={setPage}
          onPageSize={setPageSize}
        />
      )}

      {/* Modals */}
      {modal?.type === "view" && (
        <Modal title="User details" size="lg" onClose={closeModal}>
          <UserDetails user={modal.user} />
          <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              onClick={() => setModal({ type: "role", user: modal.user })}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Change role
            </button>
            <button
              onClick={() => setModal({ type: "edit", user: modal.user })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit user
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal title="Edit user" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <EditForm
            user={modal.user}
            busy={busy}
            onSave={(v) => saveEdit(modal.user, v)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "role" && (
        <Modal title="Change role" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <RoleForm
            user={modal.user}
            busy={busy}
            onSave={(r) => saveRole(modal.user, r)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete user" onClose={closeModal}>
          {modalError && (
            <p className="mb-3 text-sm text-red-600">{modalError}</p>
          )}
          <ConfirmBody
            tone="danger"
            busy={busy}
            confirmLabel="Delete user"
            message={
              <>
                <p>
                  This permanently deletes{" "}
                  <strong>{modal.user.fullName || modal.user.email}</strong>.
                  This can&apos;t be undone.
                </p>
                <p className="mt-2">
                  If they have applications, submissions or transactions the
                  delete will be blocked. Suspend the account instead.
                </p>
              </>
            }
            onConfirm={() => remove(modal.user)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {toastNode}
    </>
  );
}