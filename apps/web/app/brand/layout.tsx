import { ReactNode } from "react";

export default function BrandLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* BRAND SIDEBAR PLACEHOLDER */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Brand Hub</h2>
        <nav className="space-y-2">
          <a href="/brand" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="/brand/uploads" className="block p-2 rounded hover:bg-gray-100">My Videos</a>
          <a href="/brand/analytics" className="block p-2 rounded hover:bg-gray-100">Analytics</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}