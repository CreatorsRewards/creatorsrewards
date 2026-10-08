/**
 * Shapes returned by apps/api that the landing page renders.
 * Keep these in sync with the API responses (or move them to a shared
 * workspace package once the API exists).
 */

/** Public numbers shown in the landing page StatsTicker. */
export interface PlatformStats {
  creatorCount: number;
}

/** One card in the "For creators" section. Icon and color are decided by the UI, keyed on `id`. */
export interface CreatorLane {
  id: string;
  title: string;
  ctaText: string;
  description: string;
  /** Display-ready payout text, e.g. "₦35,000 – ₦180,000 / video". */
  payoutTag: string;
  perk: string;
}

/** One card in the "For brands" section. Icon and color are decided by the UI, keyed on `id`. */
export interface BrandCategory {
  id: string;
  title: string;
  subtitle: string;
}

/** One step in a "How it works" column. The icon is decided by the UI, keyed on `id`. */
export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

/** Both columns of the "How it works" section. */
export interface HowItWorksContent {
  creatorSteps: ProcessStep[];
  brandSteps: ProcessStep[];
}

/** One stage in the showcase switcher. Icon and color are decided by the UI, keyed on `id`. */
export interface ShowcaseStage {
  id: string;
  title: string;
  description: string;
}

/** Sample figures for the "Live Analytics" card. */
export interface ShowcaseAnalytics {
  verifiedViews: number;
  growthLabel: string;
  platformsLabel: string;
  targetPercent: number;
  viewsLogged: string;
  goalLabel: string;
  avgCpv: string;
}

/** Sample content for the phone reel card. */
export interface ShowcaseReel {
  trend: string;
  soundLabel: string;
  creatorHandle: string;
  creatorLocation: string;
  caption: string;
  viewsLabel: string;
  bounty: string;
}

/** Sample figures for the payout card. */
export interface ShowcasePayout {
  amount: string;
  destination: string;
  rail: string;
  roas: string;
}

/** Everything the parallax showcase renders. All figures are illustrative samples. */
export interface ShowcaseContent {
  stages: ShowcaseStage[];
  floatingTags: { top: string; bottom: string };
  analytics: ShowcaseAnalytics;
  reel: ShowcaseReel;
  payout: ShowcasePayout;
}

/**
 * Pay rates for one lane in the earnings calculator. All money is in naira (₦).
 * The backend is the source of truth for these: what the calculator promises
 * must match what the platform actually pays.
 */
export interface CalculatorLane {
  id: string;
  name: string;
  tagline: string;
  /** Flat fee per deliverable. */
  baseFee: number;
  /** Creator view bonus per 1,000 views. */
  cpm: number;
  /** What a brand pays per view through CreatorsRewards. */
  platformCpv: number;
  /** What a traditional agency would charge per view. */
  agencyCpv: number;
}

/** Everything the earnings calculator renders. */
export interface CalculatorContent {
  lanes: CalculatorLane[];
  slider: {
    min: number;
    max: number;
    step: number;
    defaultViews: number;
    /** Three labels shown under the slider track. */
    marks: string[];
  };
  averagePaymentTime: string;
}

/** One pillar in the "Why CreatorsRewards" section. Icon and color are decided by the UI, keyed on `id`. */
export interface WhyPillar {
  id: string;
  title: string;
  description: string;
  /** Short label shown on the card, e.g. "Two-gate verification". */
  badge: string;
}

/** Defaults and rules for the "New Campaign" form. Money is whole naira (₦). */
export interface CampaignPreviewContent {
  defaultName: string;
  /** Creator types a brand can choose between. */
  creatorTypes: string[];
  budgetPresets: number[];
  defaultBudget: number;
  /** Smallest budget the platform accepts. The backend must enforce the same rule. */
  minBudget: number;
}

/** Everything the landing page needs from the backend, in one object. */
export interface LandingContent {
  stats: PlatformStats;
  creatorLanes: CreatorLane[];
  brandCategories: BrandCategory[];
  howItWorks: HowItWorksContent;
  showcase: ShowcaseContent;
  calculator: CalculatorContent;
  whyUs: WhyPillar[];
  // campaignPreview: CampaignPreviewContent;
}
