import type { CreatorLane } from "./types";

// Static for now. When apps/api has a creator-lanes route, this becomes a fetch.
export const CREATOR_LANES: CreatorLane[] = [
  {
    id: "ugc",
    title: "UGC Creator",
    ctaText: "Join As Creator",
    description:
      "Make original content for brands and get paid for what you deliver. No follower minimum, just good storytelling.",
    payoutTag: "₦35,000 – ₦180,000 / video",
    perk: "Scripting & authentic product reviews",
  },
  {
    id: "clipper",
    title: "Clipper",
    ctaText: "Join As Clipper",
    description:
      "Turn video clipping into income. Cut and repost existing content, earn based on the views and engagement it pulls in, not time spent.",
    payoutTag: "₦0.25 – ₦0.55 / verified view",
    perk: "Fast turnarounds & high volume scale",
  },
  {
    id: "influencer",
    title: "Micro & Nano Influencer",
    ctaText: "Join as influencer",
    description:
      "Small audience, real influence. Get matched with brands that want your voice, not your follower count.",
    payoutTag: "₦50,000 – ₦350,000 / campaign",
    perk: "Dedicated niche audience trust",
  },
];
