import { ReactNode } from "react";
import AdminSidebar from "../components/admin/Adminsidebar"; 

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}