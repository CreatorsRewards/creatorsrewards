import type { CalculatorLane } from "@/lib/api/types";

/** What a creator earns for a given number of views. */
export function calculateCreatorPayout(lane: CalculatorLane, views: number) {
  const viewBonus = Math.round((views / 1000) * lane.cpm);

  return {
    baseFee: lane.baseFee,
    viewBonus,
    total: lane.baseFee + viewBonus,
  };
}

/** What a brand spends through the platform, versus a traditional agency. */
export function calculateBrandEstimate(lane: CalculatorLane, views: number) {
  const budget = Math.round(views * lane.platformCpv);
  const agencyCost = Math.round(views * lane.agencyCpv);
  const savingsPercent =
    agencyCost > 0 ? Math.round(((agencyCost - budget) / agencyCost) * 100) : 0;

  return { budget, agencyCost, savingsPercent };
}

// Formatting lives in ./currency; re-exported so existing imports keep working.
export { formatNaira, formatNumber } from "./currency";

export const formatViews = (views: number) =>
  views >= 1_000_000
    ? `${(views / 1_000_000).toFixed(1)}M views`
    : `${Math.round(views / 1000)}K views`;
