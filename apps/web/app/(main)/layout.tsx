import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
// import Footer from "@/components/layouts/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
