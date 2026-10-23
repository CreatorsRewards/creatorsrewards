import { Coins, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Look and behavior of each stage is a UI concern, keyed by the stage id.
export type StageCta = "campaign" | "creator";

export interface StageStyle {
  icon: LucideIcon;
  accentClassName: string;
  cta: StageCta;
}

const STAGE_STYLES: Record<string, StageStyle | undefined> = {
  escrow: {
    icon: ShieldCheck,
    accentClassName: "bg-cr-orange",
    cta: "campaign",
  },
  clip: { icon: Sparkles, accentClassName: "bg-cr-purple", cta: "creator" },
  payout: { icon: Coins, accentClassName: "bg-cr-yellow", cta: "creator" },
};

// Used when the API returns a stage id this UI doesn't know yet.
const DEFAULT_STAGE_STYLE: StageStyle = {
  icon: Sparkles,
  accentClassName: "bg-cr-orange",
  cta: "creator",
};

export const getStageStyle = (stageId: string): StageStyle =>
  STAGE_STYLES[stageId] ?? DEFAULT_STAGE_STYLE;
