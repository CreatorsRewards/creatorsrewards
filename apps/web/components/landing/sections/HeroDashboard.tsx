"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  AnimatedCounter,
  ClipPathReveal,
  SpotlightCard,
} from "@/components/animation/AnimatedComponents";
import type { CampaignData } from "@/hooks/useAuthFlow";

type CampaignStatus = "Active" | "Completed";

interface DashboardCampaign extends CampaignData {
  status: CampaignStatus;
}

const DASHBOARD_CAMPAIGNS: DashboardCampaign[] = [
  {
    name: "Summer Campaign",
    type: "UGC Creator",
    budget: "₦350,000",
    status: "Active",
  },
  {
    name: "Product Launch",
    type: "Clipper",
    budget: "₦500,000",
    status: "Completed",
  },
  {
    name: "Brand Awareness",
    type: "Micro Influencer",
    budget: "₦750,000",
    status: "Active",
  },
];

const STATUS_STYLES: Record<CampaignStatus, string> = {
  Active: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Completed: "bg-gray-100 text-gray-600 border-gray-200",
};

// Module-level so the counter always receives the same function reference.
const formatViews = (n: number) => `${(n / 1000).toFixed(1)}K`;

interface HeroDashboardProps {
  onStartCampaign: (details: CampaignData) => void;
  className?: string;
}

export default function HeroDashboard({
  onStartCampaign,
  className = "",
}: HeroDashboardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={`relative ${className}`}
    >
      <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 p-6 sm:p-7 shadow-2xl relative z-10 text-cr-dark">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-cr-dark/10">
          <ClipPathReveal delay={0.35} duration={0.7} as="div">
            <div className="font-display text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span>Good morning, Amara 👋</span>
            </div>
          </ClipPathReveal>
          <ClipPathReveal delay={0.42} duration={0.65} as="span">
            <span className="text-[11px] font-bold text-cr-dark/50 uppercase tracking-wider">
              Sample creator dashboard
            </span>
          </ClipPathReveal>
        </div>

        {/* Balance & performance highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
          <div className="sm:col-span-2 p-4 rounded-2xl bg-cr-yellow/50 border border-cr-dark/10 relative overflow-hidden">
            <div className="text-xs font-bold text-cr-dark/70 mb-1">
              Available balance
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl font-bold tracking-tight">
                <AnimatedCounter to={128450} prefix="₦" />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                +18.4% this month
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 rounded-2xl bg-cr-yellow/50 border border-cr-dark/10">
            <div>
              <div className="text-xs font-bold text-cr-dark/70">Campaigns</div>
              <div className="font-display text-2xl font-bold mt-0.5">
                <AnimatedCounter to={4} duration={0.8} />
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-cr-dark/10">
              <div className="text-[11px] font-bold text-cr-dark/70">
                Total views
              </div>
              <div className="font-display text-sm font-bold">
                <AnimatedCounter to={284600} formatter={formatViews} />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign list */}
        <ul className="space-y-2.5">
          {DASHBOARD_CAMPAIGNS.map(({ status, ...details }) => (
            <li key={details.name}>
              <button
                type="button"
                onClick={() => onStartCampaign(details)}
                title={
                  status === "Completed"
                    ? "Click to view or duplicate brief"
                    : "Click to view or launch brief"
                }
                className="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-white border border-cr-dark/10 hover:border-cr-pink transition-all motion-safe:hover:translate-x-1 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-cr-pink"
              >
                <span className="text-sm font-bold">{details.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${STATUS_STYLES[status]}`}
                >
                  {status}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </SpotlightCard>

      {/* Floating approved-payout card */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 sm:-bottom-6 left-3 sm:left-4 lg:-left-6 bg-cr-blush text-cr-dark p-3.5 sm:p-4 rounded-2xl shadow-xl border border-cr-dark/10 max-w-[210px] sm:max-w-[240px] z-20"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            aria-hidden="true"
            className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
          />
          <span className="text-xs font-bold text-emerald-800">
            Campaign approved
          </span>
        </div>
        <div className="font-display text-xl sm:text-2xl font-bold">
          <AnimatedCounter to={32500} prefix="₦" />
        </div>
        <div className="text-[11px] sm:text-xs font-medium text-cr-dark/70 mt-1">
          Skincare UGC · Round 2
        </div>
      </motion.div>
    </motion.div>
  );
}
