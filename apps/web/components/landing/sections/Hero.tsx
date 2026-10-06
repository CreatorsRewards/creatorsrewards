"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  ClipPathReveal,
  TextRotator,
} from "@/components/animation/AnimatedComponents";
import type { CampaignData } from "@/hooks/useAuthFlow";
import HeroDashboard from "./HeroDashboard";

export interface HeroProps {
  onStartCampaign: (details?: CampaignData) => void;
  onJoinCreator: () => void;
}

const CATEGORY_PILLS = [
  "Beauty & Skincare",
  "FMCG",
  "Startups & Apps",
  "Streamers & Artists",
  "Fintech",
] as const;

// Module-level so TextRotator gets the same array reference on every render.
// A new array per render would restart its interval timer.
const TICKER_WORDS: string[] = [
  "Africa's performance creator platform",
  "TikTok UGC & Viral Soundtracks",
  "Instagram Reels Storytellers",
  "High-Energy Video Clippers",
  "Instant Naira Bank Settlements",
];

/** Parallax blobs + grid. Owns the scroll hooks so Hero itself never re-renders on scroll. */
function HeroBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const yPeachTop = useTransform(scrollY, [0, 500], [0, -60]);
  const ySkyBottom = useTransform(scrollY, [0, 500], [0, -100]);
  const yPeachMid = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <motion.div
        style={reduceMotion ? undefined : { y: yPeachTop }}
        className="absolute top-16 right-[-80px] w-96 h-96 rounded-full bg-cr-purple opacity-70 blur-3xl -z-10"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: ySkyBottom }}
        className="absolute bottom-10 left-[-60px] w-80 h-80 rounded-full bg-cr-orange opacity-70 blur-3xl -z-10"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: yPeachMid }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-cr-purple opacity-40 blur-2xl -z-10"
      />
      <div className="absolute inset-0 matcha-grid opacity-60" />
    </div>
  );
}

/** Owns its own state so toggling a pill doesn't re-render the whole Hero. */
function CategoryPills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full pt-4 border-t border-cr-dark/10">
      <ClipPathReveal
        delay={0.8}
        duration={0.6}
        as="div"
        wrapperClassName="mb-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-cr-dark/70 uppercase tracking-wider">
            Built for every category of brand
          </span>
          <span aria-live="polite">
            {active && (
              <span className="text-[11px] font-bold text-cr-pink animate-pulse">
                Filtered by {active}
              </span>
            )}
          </span>
        </div>
      </ClipPathReveal>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_PILLS.map((category, idx) => {
          const isActive = active === category;

          return (
            <motion.button
              key={category}
              type="button"
              aria-pressed={isActive}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.85 + idx * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(isActive ? null : category)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cr-pink ${
                isActive
                  ? "bg-cr-pink text-white border-cr-pink shadow-xs"
                  : "bg-cr-blush text-cr-dark border-cr-dark/10 hover:border-cr-pink hover:text-cr-pink"
              }`}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero({ onStartCampaign, onJoinCreator }: HeroProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-cr-dark"
    >
      <HeroBackdrop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left column: copy, CTAs, category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <ClipPathReveal
              delay={0.06}
              duration={0.65}
              as="div"
              wrapperClassName="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cr-orange text-cr-dark border border-cr-dark/10 text-xs font-bold shadow-xs">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-cr-pink animate-pulse"
                />
                <span>Live now ·</span>
                <TextRotator
                  words={TICKER_WORDS}
                  interval={2600}
                  className="font-extrabold"
                />
              </div>
            </ClipPathReveal>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] sm:leading-[1.04] mb-6"
            >
              <ClipPathReveal delay={0.14} duration={0.85} as="span">
                Create.
              </ClipPathReveal>{" "}
              <ClipPathReveal delay={0.28} duration={0.85} as="span">
                Clip.
              </ClipPathReveal>{" "}
              <ClipPathReveal
                delay={0.42}
                duration={0.95}
                as="span"
                className="text-cr-pink block sm:inline-block"
              >
                Get Rewarded.
              </ClipPathReveal>
            </h1>

            <ClipPathReveal
              delay={0.54}
              duration={0.8}
              as="div"
              wrapperClassName="mb-8"
            >
              <p className="text-lg sm:text-xl text-cr-dark/85 font-normal leading-relaxed max-w-xl">
                CreatorsRewards connects African UGC creators, clippers, and
                micro-influencers with brands who pay for results, not promises.
              </p>
            </ClipPathReveal>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-4"
            >
              <button
                id="hero-start-campaign-cta"
                type="button"
                onClick={() => onStartCampaign()}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-cr-pink hover:bg-cr-coral-hover shadow-lg shadow-cr-pink/25 motion-safe:hover:scale-105 motion-safe:active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
              >
                <span>Start a Campaign</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-join-creator-cta"
                type="button"
                onClick={() => onJoinCreator()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-cr-dark bg-cr-blush hover:bg-white border border-cr-dark/15 shadow-sm motion-safe:hover:scale-105 motion-safe:active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-dark"
              >
                <Sparkles className="w-4 h-4 text-cr-pink" />
                <span>Join as a Creator</span>
              </button>
            </motion.div>

            <ClipPathReveal
              delay={0.72}
              duration={0.65}
              as="div"
              wrapperClassName="mt-1 mb-8"
            >
              <div className="text-sm font-semibold text-cr-dark/75">
                Get paid to post, not just to create.
              </div>
            </ClipPathReveal>

            <CategoryPills />
          </motion.div>

          {/* Right column: sample creator dashboard */}
          <HeroDashboard
            className="lg:col-span-5"
            onStartCampaign={onStartCampaign}
          />
        </div>
      </div>
    </section>
  );
}
