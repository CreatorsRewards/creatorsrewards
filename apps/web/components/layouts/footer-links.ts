export type FooterItem =
  | { name: string; href: string }
  | { name: string; action: "creator" | "brand" };

export interface FooterColumn {
  title: string;
  items: readonly FooterItem[];
}

export const FOOTER_LINK_CLASSES =
  "text-sm text-cr-dark/70 hover:text-cr-pink transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink";

// TODO: "Platform" and "Legal" point at landing-page sections as placeholders.
// Terms, Privacy and the Creator Agreement need real pages (e.g. /terms,
// /privacy), which a payments platform is expected to have.
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Creators",
    items: [
      { name: "UGC Creators", action: "creator" },
      { name: "Clippers", action: "creator" },
      { name: "Micro-influencers", action: "creator" },
      { name: "How to get paid", action: "creator" },
    ],
  },
  {
    title: "Brands",
    items: [
      { name: "Start a campaign", action: "brand" },
      { name: "Creator categories", action: "brand" },
      { name: "Pricing & performance", action: "brand" },
      { name: "Enterprise", action: "brand" },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Verification", href: "#how-it-works" },
      { name: "Security & anti-fraud", href: "#why-us" },
      { name: "Naira rail", href: "#why-us" },
      { name: "Paystack settlements", href: "#why-us" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Terms of Service", href: "#why-us" },
      { name: "Privacy Policy", href: "#why-us" },
      { name: "Creator Agreement", href: "#how-it-works" },
    ],
  },
];
