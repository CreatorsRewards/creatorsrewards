import { ReactNode } from "react";
import {
  BrandBottomNav,
  BrandSidebar,
} from "../components/brand/BrandNav";

export default function BrandLayout({ children }: { children: ReactNode }) {
  return (
    // Swap bg-[#171212] for your dark token if you have one
    <div className="min-h-screen bg-[#171212] text-white">
      <BrandSidebar />

      <div className="lg:pl-64">
        {/* Bottom padding keeps content clear of the mobile tab bar */}
        <main className="mx-auto max-w-6xl px-5 pb-28 pt-6 lg:px-10 lg:pb-10 lg:pt-10">
          {children}
        </main>
      </div>

      <BrandBottomNav />
    </div>
  );
}