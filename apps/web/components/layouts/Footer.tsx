import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS, FOOTER_LINK_CLASSES } from "./footer-links";

/** A server component: no JavaScript is sent to the browser for it. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cr-blush text-cr-dark border-t border-cr-dark/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-cr-dark/10">
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-base text-cr-dark/75 max-w-sm leading-relaxed font-normal">
              Create. Clip. Earn. Africa&apos;s performance creator platform.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-4">
                  {column.title}
                </h2>
                <ul className="space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.name}>
                      {item.href.startsWith("/#") ? (
                        // Section anchors on the landing page: a plain link works from any page.
                        <a href={item.href} className={FOOTER_LINK_CLASSES}>
                          {item.name}
                        </a>
                      ) : (
                        <Link href={item.href} className={FOOTER_LINK_CLASSES}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cr-dark/60">
          <div>© {year} CreatorsRewards. All rights reserved.</div>
          <div>Made for African creators and the brands that back them.</div>
        </div>
      </div>
    </footer>
  );
}
