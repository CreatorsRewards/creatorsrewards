"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Calculator, Sparkles, Zap } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { ChoiceOption } from "@/components/ui/ChoiceOption";
import {
  calculateBrandEstimate,
  calculateCreatorPayout,
  formatNaira,
  formatNumber,
  formatViews,
} from "@/lib/calculator";
import type { CampaignData } from "@/hooks/useAuthFlow";
import type { CalculatorContent } from "@/lib/api/types";

export interface EarningsCalculatorProps {
  /** Rates and slider settings. Static in lib/api for now. */
  content: CalculatorContent;
  onStartCampaign: (details: CampaignData) => void;
  onJoinCreator: (laneName: string) => void;
}

type Role = "creator" | "brand";

const ROLES: readonly { value: Role; label: string }[] = [
  { value: "creator", label: "Creator / Clipper" },
  { value: "brand", label: "Brand Marketer" },
];

function BreakdownRow({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex justify-between text-xs font-medium">
      <dt className="text-cr-dark/70">{label}</dt>
      <dd className={`font-bold ${valueClassName}`}>{value}</dd>
    </div>
  );
}

export default function EarningsCalculator({
  content,
  onStartCampaign,
  onJoinCreator,
}: EarningsCalculatorProps) {
  const uid = useId();
  const { lanes, slider } = content;

  const [role, setRole] = useState<Role>("creator");
  const [laneId, setLaneId] = useState(lanes[0]?.id ?? "");
  const [views, setViews] = useState(slider.defaultViews);

  const [firstLane] = lanes;
  if (!firstLane) return null;

  const lane = lanes.find((l) => l.id === laneId) ?? firstLane;
  const payout = calculateCreatorPayout(lane, views);
  const brand = calculateBrandEstimate(lane, views);
  const isCreator = role === "creator";

  const headline = isCreator ? payout.total : brand.budget;

  const surface =
    "block px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors";

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="py-24 md:py-32 text-cr-dark relative overflow-hidden border-t border-cr-dark/10"
    >
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-cr-purple opacity-60 blur-3xl -z-10" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-cr-orange opacity-60 blur-3xl -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14 md:mb-16">
          <ViewportReveal
            scaleFrom={1}
            yOffset={12}
            duration={0.5}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cr-dark/10 bg-cr-orange text-xs font-bold uppercase tracking-wider shadow-xs">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Interactive Performance Simulator</span>
            </span>
          </ViewportReveal>

          <ViewportReveal
            scaleFrom={1}
            yOffset={16}
            duration={0.6}
            className="mb-6"
          >
            <h2
              id="calculator-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Simulate your earnings &amp;{" "}
              <span className="text-cr-pink">performance ROI.</span>
            </h2>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.1}>
            <p className="text-lg sm:text-xl text-cr-dark/85 font-normal leading-relaxed">
              Transparent math built for the African creator economy. Drag the
              slider to see realistic payouts and campaign cost savings.
            </p>
          </ViewportReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-5 sm:p-7 md:p-9 rounded-3xl bg-cr-blush border border-cr-dark/10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cr-dark/10 mb-6">
                <fieldset className="min-w-0">
                  <legend className="text-xs font-bold uppercase tracking-wider text-cr-dark/60">
                    I am exploring as a:
                  </legend>
                  <div className="flex items-center gap-2 mt-2">
                    {ROLES.map((option) => (
                      <ChoiceOption
                        key={option.value}
                        name={`${uid}-role`}
                        value={option.value}
                        checked={role === option.value}
                        onChange={() => setRole(option.value)}
                        surfaceClassName={`${surface} ${
                          role === option.value
                            ? "bg-cr-dark text-white border-cr-dark shadow-sm"
                            : "bg-white border-cr-dark/10"
                        }`}
                      >
                        {option.label}
                      </ChoiceOption>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cr-dark/60 sm:text-right">
                    Currency:
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-cr-dark/10 mt-2 text-xs font-bold">
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"
                    />
                    <span>₦ Naira (NGN)</span>
                  </div>
                </div>
              </div>

              <fieldset className="mb-8 min-w-0">
                <legend className="text-xs font-bold uppercase tracking-wider text-cr-dark/70 mb-3">
                  Select Content Lane
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {lanes.map((option) => (
                    <ChoiceOption
                      key={option.id}
                      name={`${uid}-lane`}
                      value={option.id}
                      checked={lane.id === option.id}
                      onChange={() => setLaneId(option.id)}
                      surfaceClassName={`block p-3 rounded-2xl text-left border transition-colors ${
                        lane.id === option.id
                          ? "bg-cr-orange/50 border-cr-pink shadow-xs"
                          : "bg-white border-cr-dark/10 hover:border-cr-dark/30"
                      }`}
                    >
                      <span className="block text-xs sm:text-sm font-bold">
                        {option.name}
                      </span>
                      <span className="block text-[11px] text-cr-dark/60 font-medium mt-0.5">
                        {option.tagline}
                      </span>
                    </ChoiceOption>
                  ))}
                </div>
              </fieldset>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor={`${uid}-views`}
                    className="text-xs font-bold uppercase tracking-wider text-cr-dark/70"
                  >
                    Estimated Campaign Views
                  </label>
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-bold text-cr-pink tracking-tight"
                  >
                    {formatViews(views)}
                  </span>
                </div>

                <input
                  id={`${uid}-views`}
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={views}
                  aria-valuetext={formatViews(views)}
                  onChange={(e) => setViews(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cr-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
                />

                <div
                  aria-hidden="true"
                  className="flex justify-between text-[11px] font-bold text-cr-dark/50 mt-2"
                >
                  {slider.marks.map((mark) => (
                    <span key={mark}>{mark}</span>
                  ))}
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-cr-dark/10 text-xs font-semibold text-cr-dark/80">
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                  />
                  <span>Escrow-guaranteed before work begins</span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-cr-pink shrink-0"
                  />
                  <span>No 90-day agency invoice delays</span>
                </li>
              </ul>
            </SpotlightCard>
          </div>

          {/* Result */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-5 sm:p-7 md:p-9 rounded-3xl bg-cr-blush border border-cr-dark/10 shadow-2xl">
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1.5 bg-cr-pink"
              />

              <div className="flex items-center justify-between gap-3 pb-4 border-b border-cr-dark/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cr-dark/70">
                  {isCreator
                    ? "Estimated Creator Takehome"
                    : "Recommended Campaign Budget"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 whitespace-nowrap">
                  Real-time calc
                </span>
              </div>

              <div className="my-6">
                <div className="text-xs font-semibold text-cr-dark/60 mb-1">
                  {isCreator
                    ? `Projected Total for ~${formatNumber(views)} views`
                    : `Estimated spend for ~${formatNumber(views)} verified views`}
                </div>
                {/* Plain text on purpose: the value changes on every slider
                    tick, and a count-up from zero each time would flicker. */}
                <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">
                  {formatNaira(headline)}
                </div>
              </div>

              <dl className="space-y-3 p-4 rounded-2xl bg-white border border-cr-dark/10 mb-6">
                {isCreator ? (
                  <>
                    <BreakdownRow
                      label="Base deliverable rate"
                      value={formatNaira(payout.baseFee)}
                    />
                    <BreakdownRow
                      label="Performance view bonus"
                      value={`+${formatNaira(payout.viewBonus)}`}
                      valueClassName="text-emerald-700"
                    />
                    <div className="pt-2 border-t border-cr-dark/10">
                      <BreakdownRow
                        label="Average payment time"
                        value={content.averagePaymentTime}
                        valueClassName="text-emerald-700"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <BreakdownRow
                      label="CreatorsRewards CPV"
                      value={`₦${lane.platformCpv}/view`}
                      valueClassName="text-emerald-700"
                    />
                    <BreakdownRow
                      label="Traditional Agency Cost"
                      value={formatNaira(brand.agencyCost)}
                      valueClassName="text-gray-500 line-through"
                    />
                    <div className="pt-2 border-t border-cr-dark/10">
                      <BreakdownRow
                        label="Performance Savings"
                        value={`${brand.savingsPercent}% More Efficient`}
                        valueClassName="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full"
                      />
                    </div>
                  </>
                )}
              </dl>

              <button
                id={
                  isCreator
                    ? "calc-join-creator-btn"
                    : "calc-start-campaign-btn"
                }
                type="button"
                onClick={() =>
                  isCreator
                    ? onJoinCreator(lane.name)
                    : onStartCampaign({
                        name: `${lane.name} Launch`,
                        type: lane.name,
                        budget: formatNaira(brand.budget),
                      })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-cr-pink hover:bg-cr-coral-hover shadow-lg shadow-cr-pink/25 motion-safe:hover:scale-[1.02] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
              >
                {isCreator ? (
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                <span className="truncate">
                  {isCreator
                    ? `Join & Claim This Lane (${lane.name})`
                    : "Fund Campaign with This Estimate"}
                </span>
                <ArrowRight
                  className="w-4 h-4 ml-1 shrink-0"
                  aria-hidden="true"
                />
              </button>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
