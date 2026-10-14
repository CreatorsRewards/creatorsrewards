import { ReactNode } from "react";

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SUPPORT SIDEBAR PLACEHOLDER */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Support Hub</h2>
        <nav className="space-y-2">
          <a href="/support" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="/support/tickets" className="block p-2 rounded hover:bg-gray-100">My Tickets</a>
          <a href="/support/knowledge-base" className="block p-2 rounded hover:bg-gray-100">Knowledge Base</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}