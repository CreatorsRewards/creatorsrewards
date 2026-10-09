"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CircleDollarSign,
  GitPullRequest,
  HelpCircle,
  Home,
  LayoutGrid,
  MessagesSquare,
  Settings,
  ShieldCheck,
  SquarePen,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Add, remove or reorder items here. Nothing else needs to change.
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/admin", icon: Home },
  { label: "Verification", href: "/admin/verification", icon: ShieldCheck },
  { label: "Applications", href: "/admin/applications", icon: LayoutGrid },
  { label: "Campaigns", href: "/admin/campaigns", icon: Trophy },
  { label: "Submissions", href: "/admin/submissions", icon: GitPullRequest },
  { label: "Payouts", href: "/admin/payouts", icon: CircleDollarSign },
  { label: "Creators", href: "/admin/creators", icon: SquarePen },
  { label: "Disputes", href: "/admin/disputes", icon: MessagesSquare },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

// "/admin" must match exactly, otherwise Home would be active on every page.
// Other items match their own route and anything nested under it.
const isActive = (pathname: string, href: string) =>
  href === "/admin"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-stone-900 px-4 py-6">
      {/* Brand */}
      <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
        {/* Swap for your real logo, e.g. <Image src="/logo.svg" ... /> */}
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-rose-500">
          Cr
        </span>
        <span className="text-sm font-bold text-white">
          Creators<span className="text-rose-400">Rewards</span>
        </span>
      </Link>

      <nav className="space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-rose-400/10 text-rose-400"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-100"
              }`}
            >
              {active && (
                <span className="absolute -left-4 bottom-1 top-1 w-1 rounded-r bg-rose-400" />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}