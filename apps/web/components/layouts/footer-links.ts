import { signInHref, signUpHref } from "@/lib/routes";

export interface FooterItem {
  name: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: readonly FooterItem[];
}

export const FOOTER_LINK_CLASSES =
  "text-sm text-cr-dark/70 hover:text-cr-pink transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink";

const CREATOR_SIGN_UP = signUpHref({ role: "creator" });
const START_CAMPAIGN = signInHref({ intent: "campaign" });

// TODO: "Platform" and "Legal" point at landing-page sections as placeholders.
// Terms, Privacy and the Creator Agreement need real pages (e.g. /terms,
// /privacy), which a payments platform is expected to have.
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Creators",
    items: [
      { name: "UGC Creators", href: CREATOR_SIGN_UP },
      { name: "Clippers", href: CREATOR_SIGN_UP },
      { name: "Micro-influencers", href: CREATOR_SIGN_UP },
      { name: "How to get paid", href: CREATOR_SIGN_UP },
    ],
  },
  {
    title: "Brands",
    items: [
      { name: "Start a campaign", href: START_CAMPAIGN },
      { name: "Creator categories", href: START_CAMPAIGN },
      { name: "Pricing & performance", href: START_CAMPAIGN },
      { name: "Enterprise", href: START_CAMPAIGN },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Verification", href: "/#how-it-works" },
      { name: "Security & anti-fraud", href: "/#why-us" },
      { name: "Naira rail", href: "/#why-us" },
      { name: "Paystack settlements", href: "/#why-us" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Terms of Service", href: "/#why-us" },
      { name: "Privacy Policy", href: "/#why-us" },
      { name: "Creator Agreement", href: "/#how-it-works" },
    ],
  },
];
