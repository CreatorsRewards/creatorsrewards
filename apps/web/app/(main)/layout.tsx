import type { ReactNode } from "react";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import { CREATOR_LANES } from "@/lib/api/creator-lanes";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider creatorLanes={CREATOR_LANES}>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  );
}
