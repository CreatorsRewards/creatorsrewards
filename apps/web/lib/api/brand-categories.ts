import type { BrandCategory } from "./types";

// Static for now. When apps/api has a brand-categories route, this becomes a fetch.
export const BRAND_CATEGORIES: BrandCategory[] = [
  {
    id: "beauty",
    title: "Beauty & Skincare",
    subtitle: "UGC + micro influencers",
  },
  { id: "fmcg", title: "FMCG", subtitle: "UGC at scale" },
  {
    id: "startups",
    title: "Startups & Apps",
    subtitle: "Storytellers who explain",
  },
  {
    id: "streamers",
    title: "Streamers & Artists",
    subtitle: "Clippers for reach",
  },
  { id: "fintech", title: "Fintech", subtitle: "Trust-building creators" },
  { id: "travel", title: "Travel & Lifestyle", subtitle: "Nano influencers" },
];
