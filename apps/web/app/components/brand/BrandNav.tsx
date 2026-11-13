"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  TrendingUp,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Add, remove or reorder items here. The sidebar and the mobile tab bar both
// read this list. Keep it to 5 items or fewer so the tab bar stays readable.
const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/brand", icon: LayoutDashboard },
  { label: "Campaigns", href: "/brand/campaigns", icon: Trophy },
  { label: "Analytics", href: "/brand/analytics", icon: TrendingUp },
  { label: "Creators", href: "/brand/creators", icon: Users },
  { label: "Profile", href: "/brand/profile", icon: User },
];

// "/brand" must match exactly, otherwise Overview would be active on every page
const isActive = (pathname: string, href: string) =>
  href === "/brand"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

/** Desktop (lg and up) */
export function BrandSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/5 bg-[#1d1717] px-4 py-6 lg:flex">
      <Link href="/brand" className="mb-8 flex items-center gap-2 px-2">
        {/* Swap for your real logo, e.g. <Image src="/logo.svg" ... /> */}
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-(--cr-pink)">
          Cr
        </span>
        <span className="text-sm font-bold text-white">
          Creators<span className="text-(--cr-pink)">Rewards</span>
        </span>
      </Link>

      <nav className="space-y-1" aria-label="Brand navigation">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
                active
                  ? "bg-(--cr-pink)/15 text-(--cr-pink)"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-100"
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
export function BrandBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Brand navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-[#1d1717]/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium no-underline transition-colors ${
                  active ? "text-(--cr-pink)" : "text-stone-500"
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