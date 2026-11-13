import { ReactNode } from "react";
import {
  CreatorBottomNav,
  CreatorSidebar,
} from "../components/creator/CreatorNav";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    // Swap bg-[#fbf7f2] for your cream token if you have one
    <div className="min-h-screen bg-[#fbf7f2]">
      <CreatorSidebar />

      <div className="lg:pl-64">
        {/* Bottom padding keeps content clear of the mobile tab bar */}
        <main className="mx-auto max-w-6xl px-5 pb-28 pt-6 lg:px-10 lg:pb-10 lg:pt-10">
          {children}
        </main>
      </div>

      <CreatorBottomNav />
    </div>
  );
}