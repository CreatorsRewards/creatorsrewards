import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ROUTES } from "@/lib/routes";

/**
 * Shell for the sign-in and sign-up pages: just the logo and the page.
 * No Navbar or Footer, so nothing pulls the visitor away mid-form.
 * (Fonts and global styles already come from the root layout.)
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-cr-dark">
      <header className="px-4 sm:px-6 lg:px-8 py-5">
        <Link
          href={ROUTES.home}
          aria-label="CreatorsRewards home"
          className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cr-pink"
        >
          <Logo size="md" />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
