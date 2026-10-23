"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { Scissors, Sparkles, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { CreatorLane } from "@/lib/api/types";

export interface CreatorSectionProps {
  /** Fetched on the server in page.tsx; static fallback lives in lib/api. */
  lanes: readonly CreatorLane[];
  /** Receives the lane title, which `useAuthFlow` stores as the creator type. */
  onJoinCreator: (laneTitle: string) => void;
}

const MD_QUERY = "(min-width: 768px)";

// Look and feel is a UI concern, so it stays here, keyed by the lane id.
interface LaneStyle {
  icon: LucideIcon;
  accentClassName: string;
}

const LANE_STYLES: Record<string, LaneStyle | undefined> = {
  ugc: { icon: Video, accentClassName: "bg-cr-purple" },
  clipper: { icon: Scissors, accentClassName: "bg-cr-orange" },
  influencer: { icon: Sparkles, accentClassName: "bg-cr-yellow" },
};

// Used when the API returns a lane id this UI doesn't know yet.
const DEFAULT_LANE_STYLE: LaneStyle = {
  icon: Sparkles,
  accentClassName: "bg-cr-orange",
};

interface LaneCardProps {
  lane: CreatorLane;
  index: number;
  /** Last card of an odd list fills the second row on tablet. */
  spansTwoOnTablet: boolean;
  /** Scroll-linked vertical offset. Omit to disable parallax. */
  y?: MotionValue<number>;
  onJoin: (laneTitle: string) => void;
}

function LaneCard({ lane, index, spansTwoOnTablet, y, onJoin }: LaneCardProps) {
  const { icon: Icon, accentClassName } =
    LANE_STYLES[lane.id] ?? DEFAULT_LANE_STYLE;

  return (
    // Parallax on the <li>, reveal on the inner wrapper, so they never fight over `y`.
    <motion.li
      style={y ? { y } : undefined}
      className={`h-full ${spansTwoOnTablet ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      <ViewportReveal
        scaleFrom={1}
        yOffset={24}
        duration={0.6}
        delay={index * 0.15}
        className="h-full"
      >
        <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 p-5 sm:p-7 md:p-8 lg:p-9 shadow-lg flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 sm:mb-6 lg:mb-8">
              <div
                aria-hidden="true"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${accentClassName} border border-cr-dark/10 flex items-center justify-center shadow-xs shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold bg-cr-yellow px-2.5 py-1 sm:px-3 rounded-full border border-emerald-300 whitespace-nowrap">
                {lane.payoutTag}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold group-hover/spotlight:text-cr-pink mb-3 sm:mb-4 tracking-tight transition-colors">
              {lane.title}
            </h3>

            <p className="text-cr-dark/80 text-sm sm:text-base leading-relaxed font-normal mb-5 sm:mb-6">
              {lane.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-cr-dark/70 py-2 border-t border-cr-dark/10">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
              />
              <span className="truncate">{lane.perk}</span>
            </div>
          </div>

          <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-cr-dark/10 flex items-center justify-between gap-2">
            {/* A real button; its ::after stretches over the whole card so the
                card is clickable without turning the card into role="button". */}
            <button
              type="button"
              onClick={() => onJoin(lane.title)}
              className="font-bold text-sm sm:text-base group-hover/spotlight:text-cr-pink transition-colors cursor-pointer after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-cr-pink"
            >
              {lane.ctaText}
            </button>
            <span
              aria-hidden="true"
              className="text-sm sm:text-base font-bold group-hover/spotlight:text-cr-pink motion-safe:group-hover/spotlight:translate-x-1 transition-all"
            >
              →
            </span>
          </div>
        </SpotlightCard>
      </ViewportReveal>
    </motion.li>
  );
}

export default function CreatorSection({
  lanes,
  onJoinCreator,
}: CreatorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMd = useMediaQuery(MD_QUERY);
  const parallaxEnabled = isMd && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yCol0 = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const columnOffsets = [yCol0, yCol1, yCol2];

  if (lanes.length === 0) return null;

  const hasOddCount = lanes.length % 2 === 1;

  return (
    <section
      id="creators"
      ref={sectionRef}
      aria-labelledby="creators-heading"
      className="py-24 md:py-32 text-cr-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <ViewportReveal
            scaleFrom={1}
            yOffset={12}
            duration={0.5}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cr-dark/10 bg-cr-orange text-xs font-bold uppercase tracking-wider">
              For creators
            </span>
          </ViewportReveal>

          <ViewportReveal
            scaleFrom={1}
            yOffset={16}
            duration={0.6}
            delay={0.1}
            className="mb-6"
          >
            <h2
              id="creators-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Whatever kind of creator you are,{" "}
              <span className="text-cr-pink">there&apos;s a lane for you.</span>
            </h2>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.2}>
            <p className="text-lg sm:text-xl text-cr-dark/85 leading-relaxed font-normal">
              UGC creator, clipper, micro or nano influencer; it doesn&apos;t
              matter how many followers you have. If you talk about the products
              you use, the places you go, the apps you rely on, or the shows you
              can&apos;t stop watching, you qualify.
            </p>
          </ViewportReveal>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 items-stretch">
          {lanes.map((lane, idx) => (
            <LaneCard
              key={lane.id}
              lane={lane}
              index={idx}
              spansTwoOnTablet={hasOddCount && idx === lanes.length - 1}
              y={
                parallaxEnabled
                  ? columnOffsets[idx % columnOffsets.length]
                  : undefined
              }
              onJoin={onJoinCreator}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
