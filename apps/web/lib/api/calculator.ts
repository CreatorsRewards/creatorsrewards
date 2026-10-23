import type { CalculatorContent } from "./types";

// Static for now. These rates are the numbers the calculator promises, so when
// apps/api exists they should come from there (one source of truth for what is
// shown and what is actually paid).
export const CALCULATOR_CONTENT: CalculatorContent = {
  lanes: [
    {
      id: "ugc",
      name: "UGC Creator",
      tagline: "Base + Views",
      baseFee: 45000,
      cpm: 220,
      platformCpv: 0.85,
      agencyCpv: 6.8,
    },
    {
      id: "clipper",
      name: "Clipper",
      tagline: "Pure Performance",
      baseFee: 15000,
      cpm: 290,
      platformCpv: 0.72,
      agencyCpv: 8.5,
    },
    {
      id: "influencer",
      name: "Micro & Nano Influencer",
      tagline: "Voice & Retainers",
      baseFee: 60000,
      cpm: 250,
      platformCpv: 0.95,
      agencyCpv: 9.2,
    },
  ],
  slider: {
    min: 20000,
    max: 1500000,
    step: 10000,
    defaultViews: 150000,
    marks: ["20K (Micro Brief)", "500K (Standard)", "1.5M+ (Viral Campaign)"],
  },
  averagePaymentTime: "Under 2 hours",
};
