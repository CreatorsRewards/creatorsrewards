"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  AnimatedCounter,
  SpotlightCard,
} from "@/components/animation/AnimatedComponents";
import type { ShowcaseAnalytics } from "@/lib/api/types";

const formatMillions = (n: number) => `${(n / 1_000_000).toFixed(2)}M`;

export function AnalyticsCard({
  data,
  active,
}: {
  data: ShowcaseAnalytics;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true });

  return (
    <SpotlightCard
      className={`p-5 sm:p-6 rounded-3xl bg-cr-blush border shadow-xl backdrop-blur-md ${
        active ? "border-sky-600 ring-2 ring-cr-orange" : "border-cr-dark/10"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-3 h-3 rounded-full bg-emerald-500 motion-safe:animate-pulse"
          />
          <span className="text-xs font-extrabold">Live Analytics</span>
        </div>
        <span className="text-[11px] font-bold text-cr-dark/70 bg-cr-orange px-2.5 py-0.5 rounded-full">
          {data.platformsLabel}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-cr-dark/70">
            Verified Viral Views
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight flex items-baseline gap-2">
            <AnimatedCounter
              to={data.verifiedViews}
              decimals={2}
              formatter={formatMillions}
            />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {data.growthLabel}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-cr-dark/10 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span>Campaign Target</span>
            <span className="text-emerald-700">
              {data.targetPercent}% Reached
            </span>
          </div>
          <div
            ref={barRef}
            role="progressbar"
            aria-label="Campaign target reached"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={data.targetPercent}
            className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden"
          >
            <motion.div
              animate={{
                width: barInView ? `${data.targetPercent}%` : "10%",
              }}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                ease: "easeOut",
              }}
              className="h-full bg-linear-to-r from-cr-pink to-emerald-400 rounded-full"
            />
          </div>
          <div className="flex justify-between text-[11px] text-cr-dark/60 font-medium">
            <span>{data.viewsLogged}</span>
            <span>{data.goalLabel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-cr-dark/10 text-xs text-cr-dark/70 font-medium">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
            <span>Avg. CPV: {data.avgCpv}</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-cr-yellow px-2 py-0.5 rounded-full border border-emerald-300">
            Escrow Active
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
