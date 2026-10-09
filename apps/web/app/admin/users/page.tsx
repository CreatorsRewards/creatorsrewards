"use client";

import React, { useCallback, useState } from "react";
import { Search, Plus, RefreshCw } from "lucide-react";
import UsersTable from "../../components/Userstable";
import WaitlistTab from "../../components/Waitlisttab";
import CreateUserModal from "../../components/Createusermodal";
import { useToast, type UserRole } from "../../components/shared";

const TABS = ["All", "Creators", "Brands", "Admins", "Waitlist"] as const;
type Tab = (typeof TABS)[number];

// Which roles each user tab shows. "All" has no filter.
const TAB_ROLES: Record<Exclude<Tab, "Waitlist">, UserRole[] | undefined> = {
  All: undefined,
  Creators: ["UGC_CREATOR", "CLIPPER"],
  Brands: ["BRAND"],
  Admins: ["SUPER_ADMIN", "ADMIN", "CUSTOMER_REP"],
};

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { notify, toastNode } = useToast();

  // The active tab reports its loading state so the refresh icon can spin
  const handleLoadingChange = useCallback(
    (loading: boolean) => setRefreshing(loading),
    [],
  );

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header: refresh + the single, global create action */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">User Management</h1>
          <p className="text-gray-600">
            View, edit, and manage system access for all accounts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={refreshing}
            title="Refresh"
            aria-label="Refresh"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add New User
          </button>
        </div>
      </header>

      {/* Shared tabs + search */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-t-lg border border-b-0 border-gray-200 bg-white p-4 sm:flex-row">
        <div className="flex w-full space-x-1 overflow-x-auto rounded-lg bg-gray-100 p-1 sm:w-auto">
          {TABS.map((tab) => (
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
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or phone..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Each tab owns its table; the parent owns create, refresh and search */}
      {activeTab === "Waitlist" ? (
        <WaitlistTab
          search={search}
          refreshKey={refreshKey}
          onLoadingChange={handleLoadingChange}
        />
      ) : (
        <UsersTable
          key={activeTab}
          roles={TAB_ROLES[activeTab]}
          search={search}
          refreshKey={refreshKey}
          onLoadingChange={handleLoadingChange}
        />
      )}

      {creating && (
        <CreateUserModal
          onClose={() => setCreating(false)}
          onCreated={(name) => {
            setCreating(false);
            setRefreshKey((k) => k + 1);
            notify(`${name} was added`);
          }}
        />
      )}

      {toastNode}
    </div>
  );
}
