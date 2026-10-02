"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AnimatedCounter,
  ClipPathReveal,
  SpotlightCard,
  TextRotator,
} from "../../animation/AnimatedComponents";
// import {
//   AnimatedCounter,
//   TextRotator,
//   SpotlightCard,
//   ClipPathReveal,
// } from "./AnimatedComponents";

export interface HeroProps {
  onStartCampaign: (details?: {
    name: string;
    type: string;
    budget: string;
  }) => void;
  onJoinCreator: () => void;
}

const CATEGORY_PILLS = [
  "Beauty & Skincare",
  "FMCG",
  "Startups & Apps",
  "Streamers & Artists",
  "Fintech",
] as const;

const SUB_TICKER_WORDS = [
  "Africa's performance creator platform",
  "TikTok UGC & Viral Soundtracks",
  "Instagram Reels Storytellers",
  "High-Energy Video Clippers",
  "Instant Naira Bank Settlements",
] as const;

export const Hero: React.FC<HeroProps> = ({
  onStartCampaign,
  onJoinCreator,
}) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 80]);
  const yDecor1 = useTransform(scrollY, [0, 500], [0, -60]);
  const yDecor2 = useTransform(scrollY, [0, 500], [0, -100]);

  const [activePill, setActivePill] = useState<string | null>(null);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent text-[#1C1917]"
    >
      {/* Parallax Decorative Background Elements (Peach & Sky Blue) */}
      <motion.div
        style={{ y: yDecor1 }}
        className="absolute top-16 right-[-80px] w-96 h-96 rounded-full bg-[#FFDDBF] opacity-70 blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: yDecor2 }}
        className="absolute bottom-10 left-[-60px] w-80 h-80 rounded-full bg-[#BAE6FD] opacity-70 blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#FFDDBF] opacity-40 blur-2xl pointer-events-none -z-10"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 matcha-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Live Indicator Pill with Animated Rotating Text */}
            <ClipPathReveal
              delay={0.06}
              duration={0.65}
              as="div"
              wrapperClassName="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BAE6FD] text-[#1C1917] border border-[#1C1917]/10 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FB7185] animate-pulse" />
                <span>Live now ·</span>
                <TextRotator
                  words={[...SUB_TICKER_WORDS]}
                  interval={2600}
                  className="font-extrabold text-[#1C1917]"
                />
              </div>
            </ClipPathReveal>

            {/* Headline with Mask Reveal */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] sm:leading-[1.04] mb-6 text-[#1C1917]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              <ClipPathReveal
                delay={0.14}
                duration={0.85}
                as="span"
                className="text-[#1C1917]"
              >
                Create.
              </ClipPathReveal>{" "}
              <ClipPathReveal
                delay={0.28}
                duration={0.85}
                as="span"
                className="text-[#1C1917]"
              >
                Clip.
              </ClipPathReveal>{" "}
              <ClipPathReveal
                delay={0.42}
                duration={0.95}
                as="span"
                className="text-[#FB7185] block sm:inline-block"
              >
                Get Rewarded.
              </ClipPathReveal>
            </h1>

            {/* Paragraph Subtitle */}
            <ClipPathReveal
              delay={0.54}
              duration={0.8}
              as="div"
              wrapperClassName="mb-8"
            >
              <p className="text-lg sm:text-xl text-[#1C1917]/85 font-normal leading-relaxed max-w-xl">
                CreatorsRewards connects African UGC creators, clippers, and
                micro-influencers with brands who pay for results, not promises.
              </p>
            </ClipPathReveal>

            {/* Primary & Secondary CTAs */}
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
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#FB7185] hover:bg-[#F43F5E] shadow-lg shadow-[#FB7185]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FB7185]"
              >
                <span>Start a Campaign</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-join-creator-cta"
                type="button"
                onClick={onJoinCreator}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-[#1C1917] bg-[#FAFAF9] hover:bg-white border border-[#1C1917]/15 shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917]"
              >
                <Sparkles className="w-4 h-4 text-[#FB7185]" />
                <span>Join as a Creator</span>
              </button>
            </motion.div>

            {/* Sub-copy */}
            <ClipPathReveal
              delay={0.72}
              duration={0.65}
              as="div"
              wrapperClassName="mt-1 mb-8"
            >
              <div className="text-sm font-semibold text-[#1C1917]/75">
                Get paid to post, not just to create.
              </div>
            </ClipPathReveal>

            {/* Category Pills Header & Interactive Tags */}
            <div className="w-full pt-4 border-t border-[#1C1917]/10">
              <ClipPathReveal
                delay={0.8}
                duration={0.6}
                as="div"
                wrapperClassName="mb-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1917]/70 uppercase tracking-wider">
                    Built for every category of brand
                  </span>
                  {activePill && (
                    <span className="text-[11px] font-bold text-[#FB7185] animate-pulse">
                      Filtered by {activePill}
                    </span>
                  )}
                </div>
              </ClipPathReveal>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_PILLS.map((cat, idx) => (
                  <motion.button
                    key={cat}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.85 + idx * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setActivePill(activePill === cat ? null : cat)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FB7185] ${
                      activePill === cat
                        ? "bg-[#FB7185] text-white border-[#FB7185] shadow-xs"
                        : "bg-[#FAFAF9] text-[#1C1917] border-[#1C1917]/10 hover:border-[#FB7185] hover:text-[#FB7185]"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sample Creator Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Spotlight Dashboard Card */}
            <SpotlightCard className="rounded-3xl bg-[#FAFAF9] border border-[#1C1917]/10 p-6 sm:p-7 shadow-2xl relative z-10 text-[#1C1917]">
              {/* Card Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#1C1917]/10">
                <ClipPathReveal delay={0.35} duration={0.7} as="div">
                  <div
                    className="text-xl sm:text-2xl font-bold text-[#1C1917] flex items-center gap-2"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    <span>Good morning, Amara 👋</span>
                  </div>
                </ClipPathReveal>
                <ClipPathReveal delay={0.42} duration={0.65} as="span">
                  <span className="text-[11px] font-bold text-[#1C1917]/50 uppercase tracking-wider">
                    Sample creator dashboard
                  </span>
                </ClipPathReveal>
              </div>

              {/* Balance & Performance Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
                <div className="sm:col-span-2 p-4 rounded-2xl bg-[#D1FAE5]/50 border border-[#1C1917]/10 relative overflow-hidden">
                  <div className="text-xs font-bold text-[#1C1917]/70 mb-1">
                    Available balance
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="text-3xl font-extrabold text-[#1C1917] tracking-tight"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      <AnimatedCounter to={128450} prefix="₦" />
                    </span>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      +18.4% this month
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-4 rounded-2xl bg-[#D1FAE5]/50 border border-[#1C1917]/10">
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]/70">
                      Campaigns
                    </div>
                    <div
                      className="text-2xl font-bold text-[#1C1917] mt-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      <AnimatedCounter to={4} duration={0.8} />
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#1C1917]/10">
                    <div className="text-[11px] font-bold text-[#1C1917]/70">
                      Total views
                    </div>
                    <div
                      className="text-sm font-bold text-[#1C1917]"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      <AnimatedCounter
                        to={284600}
                        formatter={(n) => `${(n / 1000).toFixed(1)}K`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Campaign Feed Tracker */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() =>
                    onStartCampaign({
                      name: "Summer Campaign",
                      type: "UGC Creator",
                      budget: "₦350,000",
                    })
                  }
                  className="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#1C1917]/10 hover:border-[#FB7185] transition-all hover:translate-x-1 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FB7185]"
                  title="Click to view or launch brief"
                >
                  <div className="text-sm font-bold text-[#1C1917]">
                    Summer Campaign
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onStartCampaign({
                      name: "Product Launch",
                      type: "Clipper",
                      budget: "₦500,000",
                    })
                  }
                  className="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#1C1917]/10 hover:border-[#FB7185] transition-all hover:translate-x-1 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FB7185]"
                  title="Click to view or duplicate brief"
                >
                  <div className="text-sm font-bold text-[#1C1917]">
                    Product Launch
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                    Completed
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onStartCampaign({
                      name: "Brand Awareness",
                      type: "Micro Influencer",
                      budget: "₦750,000",
                    })
                  }
                  className="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#1C1917]/10 hover:border-[#FB7185] transition-all hover:translate-x-1 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FB7185]"
                  title="Click to view or launch brief"
                >
                  <div className="text-sm font-bold text-[#1C1917]">
                    Brand Awareness
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active
                  </span>
                </button>
              </div>
            </SpotlightCard>

            {/* Floating Approved Payout Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 sm:-bottom-6 left-3 sm:left-4 md:left-4 lg:-left-6 bg-[#FAFAF9] text-[#1C1917] p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#1C1917]/10 max-w-[210px] sm:max-w-[240px] z-20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-800">
                  Campaign approved
                </span>
              </div>
              <div
                className="text-xl sm:text-2xl font-extrabold text-[#1C1917]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                <AnimatedCounter to={32500} prefix="₦" />
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-[#1C1917]/70 mt-1">
                Skincare UGC · Round 2
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
