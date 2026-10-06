import { BRAND_CATEGORIES } from "./brand-categories";
import { CREATOR_LANES } from "./creator-lanes";
import { PLATFORM_STATS } from "./stats";
import type { LandingContent } from "./types";

// Static for now. Later this becomes one `getLandingContent()` that fetches
// from apps/api, and nothing else in the app has to change.
export const LANDING_CONTENT: LandingContent = {
  stats: PLATFORM_STATS,
  creatorLanes: CREATOR_LANES,
  brandCategories: BRAND_CATEGORIES,
};
