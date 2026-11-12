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

// Terms and the Creator Agreement remain landing-page placeholders until their
// content is ready.
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
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Creator Agreement", href: "/#how-it-works" },
    ],
  },
];
