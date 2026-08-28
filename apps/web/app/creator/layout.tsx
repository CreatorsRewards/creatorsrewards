import { ReactNode } from "react";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* CREATOR SIDEBAR PLACEHOLDER */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Creator Hub</h2>
        <nav className="space-y-2">
          <a href="/creator" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="/creator/uploads" className="block p-2 rounded hover:bg-gray-100">My Videos</a>
          <a href="/creator/analytics" className="block p-2 rounded hover:bg-gray-100">Analytics</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}