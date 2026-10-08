import type { ShowcaseContent } from "./types";

// Static sample content for now. If the showcase later shows real platform
// numbers, this becomes a fetch and the component doesn't change.
export const SHOWCASE_CONTENT: ShowcaseContent = {
  stages: [
    {
      id: "escrow",
      title: "Brief Locked in Escrow",
      description:
        "Brand funds ₦750,000. 100% safeguarded until performance is logged.",
    },
    {
      id: "clip",
      title: "Creators Clip & Post",
      description:
        "48 verified UGC storytellers and clippers push high-energy short-form video.",
    },
    {
      id: "payout",
      title: "Instant Per-View Payout",
      description:
        "Verified views trigger algorithmic escrow releases directly to bank accounts in Naira.",
    },
  ],
  floatingTags: {
    top: "TikTok UGC · 1.8M Impressions",
    bottom: "Zero upfront agency retainer",
  },
  analytics: {
    verifiedViews: 1428500,
    growthLabel: "+24.8%",
    platformsLabel: "TikTok & Reels",
    targetPercent: 92,
    viewsLogged: "1.38M views logged",
    goalLabel: "1.50M goal",
    avgCpv: "₦0.82",
  },
  reel: {
    trend: "Trending #AfricaUGC",
    soundLabel: "Original UGC sound · @amara_ugc",
    creatorHandle: "@amara_ugc",
    creatorLocation: "Lagos",
    caption:
      "Testing the new hydrating serum for 7 days straight! Honest review and texture check. 🧴✨",
    viewsLabel: "482.4K views",
    bounty: "₦65,000",
  },
  payout: {
    amount: "₦85,000",
    destination: "Sent to GTBank · Account **8291",
    rail: "Paystack Instant Bank",
    roas: "7.8x Performance",
  },
};
