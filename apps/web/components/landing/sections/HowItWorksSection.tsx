"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import {
  Banknote,
  CheckCheck,
  FileSearch,
  Sliders,
  Sparkles,
  TrendingUp,
  UploadCloud,
  UserCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { HowItWorksContent, ProcessStep } from "@/lib/api/types";

export interface HowItWorksSectionProps {
  /** Fetched on the server in page.tsx; static fallback lives in lib/api. */
  content: HowItWorksContent;
  onStartCampaign: () => void;
  onJoinCreator: () => void;
}

const LG_QUERY = "(min-width: 1024px)";

// Icons are a UI concern, so they stay here, keyed by the step id.
const STEP_ICONS: Record<string, LucideIcon | undefined> = {
  signup: UserCheck,
  browse: FileSearch,
  submit: UploadCloud,
  payout: Banknote,
  brief: Sliders,
  match: Users,
  approve: CheckCheck,
  pay: TrendingUp,
};

interface ProcessCardProps {
  heading: string;
  /** Full Tailwind background classes, e.g. "bg-cr-pink". */
  dotClassName: string;
  iconClassName: string;
  steps: readonly ProcessStep[];
  onSelect: () => void;
  enterFrom: "left" | "right";
  delay?: number;
  /** Scroll-linked vertical offset. Omit to disable parallax. */
  y?: MotionValue<number>;
}

function ProcessCard({
  heading,
  dotClassName,
  iconClassName,
  steps,
  onSelect,
  enterFrom,
  delay = 0,
  y,
}: ProcessCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    // Parallax (y) on the outer wrapper, slide-in (x) on the inner one.
    <motion.div style={y ? { y } : undefined} className="h-full">
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, x: enterFrom === "left" ? -20 : 20 }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="h-full"
      >
        <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 p-6 sm:p-8 lg:p-10 shadow-xl h-full">
          <h3 className="font-display text-2xl font-bold mb-6 sm:mb-8 pb-4 border-b border-cr-dark/10 flex items-center justify-between">
            <span>{heading}</span>
            <span
              aria-hidden="true"
              className={`w-2.5 h-2.5 rounded-full ${dotClassName}`}
            />
          </h3>

          <ol className="space-y-4 sm:space-y-6">
            {steps.map((step) => {
              const Icon = STEP_ICONS[step.id] ?? Sparkles;

              return (
                <li
                  key={step.id}
                  className="group/step relative flex items-start gap-4 sm:gap-5 p-3 sm:p-3.5 rounded-2xl transition-colors duration-200 hover:bg-cr-yellow/40"
                >
                  <div
                    aria-hidden="true"
                    className={`w-10 h-10 rounded-xl border border-cr-dark/10 flex items-center justify-center shrink-0 shadow-xs ${iconClassName}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    {/* The button sits inside the heading, and its ::after
                        stretches over the whole row, so the row is clickable
                        and the title stays a real heading. */}
                    <h4 className="font-display text-lg sm:text-xl font-bold mb-1">
                      <button
                        type="button"
                        onClick={() => onSelect()}
                        className="text-left cursor-pointer group-hover/step:text-cr-pink transition-colors after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-cr-pink"
                      >
                        {step.title}
                      </button>
                    </h4>
                    <p className="text-cr-dark/80 text-sm sm:text-base leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorksSection({
  content,
  onStartCampaign,
  onJoinCreator,
}: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isLg = useMediaQuery(LG_QUERY);
  const parallaxEnabled = isLg && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const { creatorSteps, brandSteps } = content;
  if (creatorSteps.length === 0 && brandSteps.length === 0) return null;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-heading"
      className="py-24 md:py-32 text-cr-dark relative overflow-hidden border-t border-cr-dark/10"
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
              How it works
            </span>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.1}>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Set up once,{" "}
              <span className="text-cr-pink">run campaigns on repeat.</span>
            </h2>
          </ViewportReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {creatorSteps.length > 0 && (
            <ProcessCard
              heading="For creators"
              dotClassName="bg-cr-pink"
              iconClassName="bg-cr-purple"
              steps={creatorSteps}
              onSelect={onJoinCreator}
              enterFrom="left"
              y={parallaxEnabled ? yLeft : undefined}
            />
          )}
          {brandSteps.length > 0 && (
            <ProcessCard
              heading="For brands"
              dotClassName="bg-cr-orange"
              iconClassName="bg-cr-orange"
              steps={brandSteps}
              onSelect={onStartCampaign}
              enterFrom="right"
              delay={0.15}
              y={parallaxEnabled ? yRight : undefined}
            />
          )}
        </div>
      </div>
    </section>
  );
}
