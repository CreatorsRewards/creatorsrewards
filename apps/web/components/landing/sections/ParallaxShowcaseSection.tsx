"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Layers, Zap } from "lucide-react";
import { ViewportReveal } from "@/components/animation/AnimatedComponents";
import DynamicShowcaseBackdrop from "@/components/background/DynamicShowcaseBackdrop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ShowcaseContent } from "@/lib/api/types";
import { getStageStyle } from "./parallaxShowcase/stage-styles";
import { StageSlot } from "./parallaxShowcase/StageSlot";
import { AnalyticsCard } from "./parallaxShowcase/AnalyticsCard";
import { ReelCard } from "./parallaxShowcase/ReelCard";
import { PayoutCard } from "./parallaxShowcase/PayoutCard";
import { useShowcaseParallax } from "./parallaxShowcase/useShowcaseParallax";
// import { AnalyticsCard } from "./showcase/AnalyticsCard";
// import { PayoutCard } from "./showcase/PayoutCard";
// import { ReelCard } from "./showcase/ReelCard";
// import { getStageStyle } from "./showcase/stage-styles";
// import { StageSlot } from "./showcase/StageSlot";
// import { useShowcaseParallax } from "./showcase/useShowcaseParallax";

export interface ParallaxShowcaseSectionProps {
  /** Sample figures and copy. Static in lib/api for now. */
  content: ShowcaseContent;
  onStartCampaign: () => void;
  onJoinCreator: () => void;
}

const LG_QUERY = "(min-width: 1024px)";

export default function ParallaxShowcaseSection({
  content,
  onStartCampaign,
  onJoinCreator,
}: ParallaxShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isLg = useMediaQuery(LG_QUERY);
  const parallaxEnabled = isLg && !reduceMotion;
  const parallax = useShowcaseParallax(sectionRef);

  const { stages } = content;
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);

  const [firstStage] = stages;
  if (!firstStage) return null;

  const activeStage = stages.find((s) => s.id === activeId) ?? firstStage;
  const activeStyle = getStageStyle(activeStage.id);
  const ActiveIcon = activeStyle.icon;

  // Cards map to stages by position: analytics, reel, payout.
  const selectAt = (index: number) => {
    const stage = stages[index];
    if (stage) setActiveId(stage.id);
  };
  const isActiveAt = (index: number) => stages[index]?.id === activeStage.id;

  return (
    <section
      id="parallax-showcase"
      ref={sectionRef}
      aria-labelledby="showcase-heading"
      className="relative py-20 sm:py-24 md:py-28 lg:py-36 text-cr-dark overflow-hidden border-t border-cr-dark/10"
    >
      <DynamicShowcaseBackdrop />

      <div aria-hidden="true" className="pointer-events-none">
        <motion.div
          style={reduceMotion ? undefined : { y: parallax.glowY }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-linear-to-tr from-cr-purple/70 via-cr-orange/60 to-transparent opacity-80 blur-[130px] -z-10"
        />
        <div className="absolute inset-0 matcha-grid opacity-70" />
      </div>

      {/* Floating badges on their own parallax tracks (large screens only) */}
      <motion.div
        aria-hidden="true"
        style={parallaxEnabled ? { y: parallax.tagTopY } : undefined}
        className="hidden lg:flex items-center gap-2 absolute top-28 left-12 px-4 py-2 rounded-2xl bg-cr-blush border border-cr-dark/10 shadow-lg z-20"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cr-pink motion-safe:animate-ping" />
        <span className="text-xs font-bold tracking-tight">
          {content.floatingTags.top}
        </span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={parallaxEnabled ? { y: parallax.tagBottomY } : undefined}
        className="hidden lg:flex items-center gap-2 absolute bottom-28 right-16 px-4 py-2 rounded-2xl bg-cr-blush border border-cr-dark/10 shadow-lg z-20"
      >
        <Zap className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold tracking-tight">
          {content.floatingTags.bottom}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ViewportReveal
            scaleFrom={1}
            yOffset={12}
            duration={0.5}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cr-dark/10 bg-cr-orange text-xs font-bold uppercase tracking-wider shadow-xs">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Interactive Parallax Showcase</span>
            </span>
          </ViewportReveal>

          <ViewportReveal
            scaleFrom={1}
            yOffset={16}
            duration={0.6}
            className="mb-6"
          >
            <h2
              id="showcase-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]"
            >
              Watch the escrow engine{" "}
              <span className="text-cr-pink">move in real time.</span>
            </h2>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.1}>
            <p className="text-lg sm:text-xl text-cr-dark/85 font-normal leading-relaxed">
              Scroll to experience the live depth between brand budget locks,
              creator clip submissions, and verified payouts.
            </p>
          </ViewportReveal>

          <div
            role="group"
            aria-label="Showcase stages"
            className="flex flex-wrap items-center justify-center gap-2.5 mt-8"
          >
            {stages.map((stage) => {
              const { icon: Icon } = getStageStyle(stage.id);
              const isActive = stage.id === activeStage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(stage.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink ${
                    isActive
                      ? "bg-cr-dark text-white shadow-md motion-safe:scale-105"
                      : "bg-cr-blush hover:bg-white border border-cr-dark/10"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isActive ? "bg-cr-pink text-white" : "bg-cr-dark/10"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 items-center justify-items-center">
            <StageSlot
              active={isActiveAt(0)}
              onSelect={() => selectAt(0)}
              style={
                parallaxEnabled
                  ? { y: parallax.leftY, rotate: parallax.leftRotate }
                  : undefined
              }
              className="w-full max-w-[360px] sm:max-w-md lg:max-w-none order-2 md:order-1 lg:order-1"
            >
              <AnalyticsCard data={content.analytics} active={isActiveAt(0)} />
            </StageSlot>

            <StageSlot
              active={isActiveAt(1)}
              onSelect={() => selectAt(1)}
              style={
                parallaxEnabled
                  ? {
                      y: parallax.phoneY,
                      scale: parallax.phoneScale,
                      rotate: parallax.phoneRotate,
                    }
                  : undefined
              }
              className="w-full max-w-[310px] sm:max-w-[340px] md:max-w-[360px] order-1 md:order-3 md:col-span-2 lg:order-2 lg:col-span-1 relative z-20"
            >
              <ReelCard
                data={content.reel}
                active={isActiveAt(1)}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying((playing) => !playing)}
                onSubmitClip={() => onJoinCreator()}
              />
            </StageSlot>

            <StageSlot
              active={isActiveAt(2)}
              onSelect={() => selectAt(2)}
              style={
                parallaxEnabled
                  ? { y: parallax.rightY, rotate: parallax.rightRotate }
                  : undefined
              }
              className="w-full max-w-[360px] sm:max-w-md lg:max-w-none order-3 md:order-2 lg:order-3"
            >
              <PayoutCard data={content.payout} active={isActiveAt(2)} />
            </StageSlot>
          </div>
        </div>

        <div aria-live="polite" className="mt-12 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="p-6 rounded-3xl bg-cr-blush border border-cr-dark/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-cr-dark/10 ${activeStyle.accentClassName}`}
                >
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">
                    {activeStage.title}
                  </h3>
                  <p className="text-sm text-cr-dark/80 leading-relaxed font-normal">
                    {activeStage.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  activeStyle.cta === "campaign"
                    ? onStartCampaign()
                    : onJoinCreator()
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-cr-pink hover:bg-cr-coral-hover shadow-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
              >
                <span>
                  {activeStyle.cta === "campaign"
                    ? "Start a Campaign"
                    : "Join as Creator"}
                </span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
