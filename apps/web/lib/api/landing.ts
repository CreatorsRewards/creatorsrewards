import { BRAND_CATEGORIES } from "./brand-categories";
import { CALCULATOR_CONTENT } from "./calculator";
// import { CAMPAIGN_PREVIEW_CONTENT } from "./campaign-preview";
import { CREATOR_LANES } from "./creator-lanes";
import { HOW_IT_WORKS } from "./how-it-works";
import { SHOWCASE_CONTENT } from "./showcase";
import { PLATFORM_STATS } from "./stats";
import { WHY_PILLARS } from "./why-us";
import type { LandingContent } from "./types";

// Static for now. Later this becomes one `getLandingContent()` that fetches
// from apps/api, and nothing else in the app has to change.
export const LANDING_CONTENT: LandingContent = {
  stats: PLATFORM_STATS,
  creatorLanes: CREATOR_LANES,
  brandCategories: BRAND_CATEGORIES,
  howItWorks: HOW_IT_WORKS,
  showcase: SHOWCASE_CONTENT,
  calculator: CALCULATOR_CONTENT,
  whyUs: WHY_PILLARS,
  //   campaignPreview: CAMPAIGN_PREVIEW_CONTENT,
};
