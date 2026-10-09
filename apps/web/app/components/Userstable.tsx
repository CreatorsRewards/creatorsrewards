"use client";

import React, { useMemo } from "react";
import { Edit2, Trash2, Ban, Shield, Building, Users } from "lucide-react";
import { ActionMenu, type MenuItem } from "./shared";

export type UserRole = "Creator" | "Brand" | "Admin";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  joinDate: string;
}

// TODO: replace with GET /users once the response shape is settled.
const DUMMY_USERS: UserRow[] = [
  { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", role: "Creator", status: "Active", joinDate: "Oct 12, 2023" },
  { id: 2, name: "Nike Official", email: "partners@nike.com", role: "Brand", status: "Active", joinDate: "Nov 05, 2023" },
  { id: 3, name: "Mike Ross", email: "mike.r@example.com", role: "Creator", status: "Pending KYC", joinDate: "Jan 14, 2024" },
  { id: 4, name: "System Admin", email: "admin@platform.com", role: "Admin", status: "Active", joinDate: "Jan 01, 2023" },
  { id: 5, name: "TechGear", email: "hello@techgear.io", role: "Brand", status: "Suspended", joinDate: "Dec 22, 2023" },
];

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  Creator: <Users className="h-4 w-4 text-blue-500" />,
  Brand: <Building className="h-4 w-4 text-purple-500" />,
  Admin: <Shield className="h-4 w-4 text-gray-700" />,
};

const menuFor = (_user: UserRow): MenuItem[] => [
  {
    label: "Edit user",
    icon: <Edit2 className="h-4 w-4 text-gray-400" />,
    onClick: () => {
      /* TODO */
    },
  },
  {
    label: "Suspend",
    icon: <Ban className="h-4 w-4 text-gray-400" />,
    onClick: () => {
      /* TODO */
    },
  },
  {
    label: "Delete",
    icon: <Trash2 className="h-4 w-4" />,
    danger: true,
    separatorBefore: true,
    onClick: () => {
      /* TODO */
    },
  },
];

/** Used by the All, Creators, Brands and Admins tabs. Pass `role` to filter. */
export default function UsersTable({
  role,
  search,
}: {
  role?: UserRole;
  search: string;
  refreshKey?: number; // re-fetch trigger once this uses the real API
}) {
  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DUMMY_USERS.filter(
      (u) =>
        (!role || u.role === role) &&
        (!q ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)),
    );
  }, [role, search]);

  return (
    <>
      <div className="overflow-x-auto rounded-b-lg border border-gray-200 bg-white shadow-sm">
        {rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            No users match your search.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {ROLE_ICONS[user.role]}
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Pending KYC"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      items={menuFor(user)}
                      label={`Actions for ${user.name}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {rows.length} {rows.length === 1 ? "user" : "users"}
      </p>
    </>
  );
}