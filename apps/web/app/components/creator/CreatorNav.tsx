"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  Trophy,
  User,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the mobile bottom tab bar (the sidebar shows everything) */
  bottomNav?: boolean;
}

// Add, remove or reorder items here. Nothing else needs to change.
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/creator", icon: LayoutDashboard, bottomNav: true },
  { label: "Campaigns", href: "/creator/campaigns", icon: Trophy, bottomNav: true },
  { label: "Earnings", href: "/creator/earnings", icon: Wallet, bottomNav: true },
  { label: "My Videos", href: "/creator/uploads", icon: Video },
  { label: "Analytics", href: "/creator/analytics", icon: BarChart3 },
  { label: "Profile", href: "/creator/profile", icon: User, bottomNav: true },
];

// "/creator" must match exactly, otherwise Dashboard would be active on every page
const isActive = (pathname: string, href: string) =>
  href === "/creator"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

/** Desktop (lg and up) */
export function CreatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-black/5 bg-white px-4 py-6 lg:flex">
      <Link href="/creator" className="mb-8 flex items-center gap-2 px-2">
        {/* Swap for your real logo, e.g. <Image src="/logo.svg" ... /> */}
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--cr-pink) text-lg font-extrabold text-white">
          Cr
        </span>
        <span className="text-sm font-bold text-stone-900">
          Creators<span className="text-(--cr-pink)">Rewards</span>
        </span>
      </Link>

      <nav className="space-y-1" aria-label="Creator navigation">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
                active
                  ? "bg-(--cr-pink)/10 text-(--cr-pink)"
                  : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

/** Mobile and tablet (below lg) */
export function CreatorBottomNav() {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.bottomNav);

  return (
    <nav
      aria-label="Creator navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium no-underline transition-colors ${
                  active ? "text-(--cr-pink)" : "text-stone-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}