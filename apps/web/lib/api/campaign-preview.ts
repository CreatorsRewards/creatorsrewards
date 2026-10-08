import type { CampaignPreviewContent } from "./types";

// Static for now. The form's defaults and its minimum budget are business
// rules, so when apps/api exists they should come from there.
export const CAMPAIGN_PREVIEW_CONTENT: CampaignPreviewContent = {
  defaultName: "Summer Product Launch",
  creatorTypes: ["UGC Creator", "Clipper", "Micro Influencer"],
  budgetPresets: [250000, 500000, 1200000, 3500000],
  defaultBudget: 500000,
  // TODO: placeholder. Confirm the real minimum with the business / backend.
  minBudget: 50000,
};
