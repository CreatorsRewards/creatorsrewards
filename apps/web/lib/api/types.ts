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
