import type { WhyPillar } from "./types";

// Static for now. This is marketing copy, so it can stay a constant even after
// the backend exists, or move to a CMS later.
export const WHY_PILLARS: WhyPillar[] = [
  {
    id: "vetted",
    title: "Vetted, not wide open",
    description:
      "Every creator goes through a two-gate verification. Brands aren't gambling on bot traffic or inflated views.",
    badge: "Two-gate verification",
  },
  {
    id: "naira",
    title: "Built for how Africa gets paid",
    description:
      "Direct Naira settlements through Paystack straight into your bank account. No workarounds needed for international delays or conversions.",
    badge: "Direct Naira (NGN) Settlement",
  },
  {
    id: "network",
    title: "Every niche, one network",
    description:
      "Beauty, fintech, gaming, FMCG, startups. Creators and brands from across the continent, not one corner of it.",
    badge: "Pan-African",
  },
  {
    id: "performance",
    title: "Pay for what performs",
    description:
      "Set a budget, track views and deliverables, pay against results instead of a flat rate and a hope.",
    badge: "Escrow-backed",
  },
];
