import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ADMIN SIDEBAR PLACEHOLDER */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Hub</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 rounded hover:bg-gray-100">Home</a>
          <a href="/admin/verification" className="block p-2 rounded hover:bg-gray-100">Verification</a>
          <a href="/admin/applications" className="block p-2 rounded hover:bg-gray-100">Applications</a>
          <a href="/admin/campaigns" className="block p-2 rounded hover:bg-gray-100">Campaigns</a>
          <a href="/admin/submissions" className="block p-2 rounded hover:bg-gray-100">Submissions</a>
          <a href="/admin/payouts" className="block p-2 rounded hover:bg-gray-100">Payouts</a>
          <a href="/admin/creators" className="block p-2 rounded hover:bg-gray-100">Creators</a>
          <a href="/admin/disputes" className="block p-2 rounded hover:bg-gray-100">Disputes</a>
          <a href="/admin/faqs" className="block p-2 rounded hover:bg-gray-100">FAQs</a>
          <a href="/admin/careers" className="block p-2 rounded hover:bg-gray-100">Careers</a>
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