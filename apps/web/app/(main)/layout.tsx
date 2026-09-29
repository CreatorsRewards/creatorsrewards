import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
