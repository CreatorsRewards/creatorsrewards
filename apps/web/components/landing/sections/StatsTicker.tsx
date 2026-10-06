"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { CreditCard, Users, Zap } from "lucide-react";
import {
  AnimatedCounter,
  SpotlightCard,
} from "@/components/animation/AnimatedComponents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { PlatformStats } from "@/lib/api/types";

export interface StatsTickerProps {
  /** Fetched on the server in page.tsx; falls back to static numbers there. */
  stats: PlatformStats;
}

const MD_QUERY = "(min-width: 768px)";

interface StatCardProps {
  /** Scroll-linked vertical offset. Omit to disable parallax. */
  y?: MotionValue<number>;
  delay?: number;
  /** Full Tailwind background class for the icon tile, e.g. "bg-cr-purple". */
  iconClassName: string;
  icon: ReactNode;
  children: ReactNode;
}

/**
 * Parallax lives on the <li> and the entry reveal on the inner div, so the two
 * animations never fight over the same `y` property.
 */
function StatCard({
  y,
  delay = 0,
  iconClassName,
  icon,
  children,
}: StatCardProps) {
  return (
    <motion.li style={y ? { y } : undefined} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="h-full"
      >
        <SpotlightCard className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-3xl bg-cr-blush border border-cr-dark/10 shadow-md h-full">
          <div
            aria-hidden="true"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-cr-dark/10 flex items-center justify-center shrink-0 shadow-xs ${iconClassName}`}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">{children}</div>
        </SpotlightCard>
      </motion.div>
    </motion.li>
  );
}

export default function StatsTicker({ stats }: StatsTickerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMd = useMediaQuery(MD_QUERY);
  const parallaxEnabled = isMd && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="stats-ticker"
      ref={sectionRef}
      aria-label="Platform highlights"
      className="relative py-8 sm:py-10 md:py-12 text-cr-dark border-y border-cr-dark/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 lg:gap-8 items-stretch">
          {/* Creators: the only number that comes from the API */}
          <StatCard
            y={parallaxEnabled ? y1 : undefined}
            iconClassName="bg-cr-purple"
            icon={<Users className="w-5 h-5" />}
          >
            <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              <AnimatedCounter to={stats.creatorCount} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm text-cr-dark/80 font-medium leading-snug mt-0.5">
              fast-growing creators across every niche
            </div>
          </StatCard>

          {/* Live campaigns */}
          <StatCard
            y={parallaxEnabled ? y2 : undefined}
            delay={0.1}
            iconClassName="bg-cr-orange"
            icon={<Zap className="w-5 h-5" />}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span
                aria-hidden="true"
                className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0"
              >
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-cr-pink opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-cr-pink" />
              </span>
              <span className="font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight truncate">
                Live campaigns
              </span>
            </div>
            <div className="text-xs sm:text-sm text-cr-dark/80 font-medium leading-snug">
              Running across TikTok, Reels &amp; Shorts
            </div>
          </StatCard>

          {/* Payouts */}
          <StatCard
            y={parallaxEnabled ? y3 : undefined}
            delay={0.2}
            iconClassName="bg-cr-yellow"
            icon={<CreditCard className="w-5 h-5" />}
          >
            <div className="font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-snug">
              Direct Naira (NGN) Payouts
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold bg-cr-yellow text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                ₦ Instant Bank Settlement
              </span>
            </div>
          </StatCard>
        </ul>
      </div>
    </section>
  );
}
