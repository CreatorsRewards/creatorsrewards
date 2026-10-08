"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { BarChart3, Coins, Send, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { WhyPillar } from "@/lib/api/types";

export interface WhyCreatorsRewardsProps {
  /** Static in lib/api for now; marketing copy that could also live in a CMS. */
  pillars: readonly WhyPillar[];
}

const MD_QUERY = "(min-width: 768px)";

const BADGE_BASE =
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border";
const GREEN_BADGE = `${BADGE_BASE} bg-cr-yellow text-emerald-900 border-emerald-300`;
const NEUTRAL_BADGE = `${BADGE_BASE} bg-white text-cr-dark/70 border-cr-dark/10`;

// Look and feel is a UI concern, so it stays here, keyed by the pillar id.
interface PillarStyle {
  icon: LucideIcon;
  accentClassName: string;
  badgeClassName: string;
  /** Shows a small pulsing "live" dot inside the badge. */
  livePulse?: boolean;
}

const PILLAR_STYLES: Record<string, PillarStyle | undefined> = {
  vetted: {
    icon: ShieldCheck,
    accentClassName: "bg-cr-purple",
    badgeClassName: GREEN_BADGE,
  },
  naira: {
    icon: Coins,
    accentClassName: "bg-cr-orange",
    badgeClassName: GREEN_BADGE,
    livePulse: true,
  },
  network: {
    icon: BarChart3,
    accentClassName: "bg-cr-yellow",
    badgeClassName: NEUTRAL_BADGE,
  },
  performance: {
    icon: Send,
    accentClassName: "bg-cr-purple",
    badgeClassName: NEUTRAL_BADGE,
  },
};

// Used when the API returns a pillar id this UI doesn't know yet.
const DEFAULT_PILLAR_STYLE: PillarStyle = {
  icon: Sparkles,
  accentClassName: "bg-cr-orange",
  badgeClassName: NEUTRAL_BADGE,
};

interface PillarCardProps {
  pillar: WhyPillar;
  index: number;
  /** Scroll-linked vertical offset. Omit to disable parallax. */
  y?: MotionValue<number>;
}

function PillarCard({ pillar, index, y }: PillarCardProps) {
  const {
    icon: Icon,
    accentClassName,
    badgeClassName,
    livePulse,
  } = PILLAR_STYLES[pillar.id] ?? DEFAULT_PILLAR_STYLE;

  return (
    // Parallax on the <li>, reveal on the inner wrapper, so they never fight over `y`.
    <motion.li style={y ? { y } : undefined} className="h-full">
      <ViewportReveal
        scaleFrom={1}
        yOffset={20}
        duration={0.5}
        delay={Math.min(index, 6) * 0.1}
        className="h-full"
      >
        <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 p-6 sm:p-7 md:p-8 lg:p-10 shadow-lg flex flex-col justify-between h-full">
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 sm:mb-8">
            <div
              aria-hidden="true"
              className={`w-12 h-12 rounded-2xl ${accentClassName} border border-cr-dark/10 flex items-center justify-center shadow-xs shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className={badgeClassName}>
              {livePulse && (
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"
                />
              )}
              {pillar.badge}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold group-hover/spotlight:text-cr-pink mb-3 tracking-tight transition-colors">
              {pillar.title}
            </h3>
            <p className="text-cr-dark/80 text-base sm:text-lg leading-relaxed font-normal">
              {pillar.description}
            </p>
          </div>
        </SpotlightCard>
      </ViewportReveal>
    </motion.li>
  );
}

export default function WhyCreatorsRewards({
  pillars,
}: WhyCreatorsRewardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMd = useMediaQuery(MD_QUERY);
  const parallaxEnabled = isMd && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yCol0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const columnOffsets = [yCol0, yCol1];

  if (pillars.length === 0) return null;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      aria-labelledby="why-us-heading"
      className="py-20 sm:py-24 md:py-32 text-cr-dark relative overflow-hidden border-t border-cr-dark/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <ViewportReveal
            scaleFrom={1}
            yOffset={12}
            duration={0.5}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cr-dark/10 bg-cr-orange text-xs font-bold uppercase tracking-wider">
              Why CreatorsRewards
            </span>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.1}>
            <h2
              id="why-us-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Built for how the African creator economy{" "}
              <span className="text-cr-pink">actually works.</span>
            </h2>
          </ViewportReveal>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {pillars.map((pillar, idx) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={idx}
              y={
                parallaxEnabled
                  ? columnOffsets[idx % columnOffsets.length]
                  : undefined
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
