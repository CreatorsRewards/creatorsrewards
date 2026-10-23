import { Calculator, Layers, ShieldCheck, Sparkles, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  /** One-line description, shown in the mobile menu. */
  desc: string;
  /** A section on the landing page. The leading "/" makes it work from any page, e.g. /about. */
  href: string;
  icon: LucideIcon;
  accentClassName: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  {
    label: "Creators",
    desc: "UGC, Clippers & Influencer lanes",
    href: "/#creators",
    icon: Video,
    accentClassName: "bg-cr-purple",
  },
  {
    label: "Brands",
    desc: "Escrow-backed creator campaigns",
    href: "/#brands",
    icon: Sparkles,
    accentClassName: "bg-cr-orange",
  },
  {
    label: "How it works",
    desc: "Three-step verified release pipeline",
    href: "/#how-it-works",
    icon: Layers,
    accentClassName: "bg-cr-yellow",
  },
  {
    label: "Calculator",
    desc: "Simulate instant Naira earnings",
    href: "/#calculator",
    icon: Calculator,
    accentClassName: "bg-cr-purple",
  },
  {
    label: "Why us",
    desc: "Vetted roster, escrow security & Naira payouts",
    href: "/#why-us",
    icon: ShieldCheck,
    accentClassName: "bg-cr-orange",
  },
];
