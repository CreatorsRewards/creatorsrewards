import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ADMIN SIDEBAR PLACEHOLDER */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Hub</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="/admin/users" className="block p-2 rounded hover:bg-gray-100">User Management</a>
          <a href="/admin/settings" className="block p-2 rounded hover:bg-gray-100">Settings</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}