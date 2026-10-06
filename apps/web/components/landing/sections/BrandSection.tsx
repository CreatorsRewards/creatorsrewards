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
  Compass,
  Landmark,
  Radio,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { BrandCategory } from "@/lib/api/types";

export interface BrandSectionProps {
  /** Fetched on the server in page.tsx; static fallback lives in lib/api. */
  categories: readonly BrandCategory[];
  /** Receives the category title, which `useAuthFlow` turns into a campaign name. */
  onStartCampaign: (categoryTitle: string) => void;
}

const LG_QUERY = "(min-width: 1024px)";

// Look and feel is a UI concern, so it stays here, keyed by the category id.
interface CategoryStyle {
  icon: LucideIcon;
  accentClassName: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle | undefined> = {
  beauty: { icon: Sparkles, accentClassName: "bg-cr-purple" },
  fmcg: { icon: ShoppingBag, accentClassName: "bg-cr-orange" },
  startups: { icon: Smartphone, accentClassName: "bg-cr-yellow" },
  streamers: { icon: Radio, accentClassName: "bg-cr-purple" },
  fintech: { icon: Landmark, accentClassName: "bg-cr-orange" },
  travel: { icon: Compass, accentClassName: "bg-cr-yellow" },
};

// Used when the API returns a category id this UI doesn't know yet.
const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  icon: Sparkles,
  accentClassName: "bg-cr-orange",
};

interface CategoryCardProps {
  category: BrandCategory;
  index: number;
  /** Scroll-linked vertical offset. Omit to disable parallax. */
  y?: MotionValue<number>;
  onStart: (categoryTitle: string) => void;
}

function CategoryCard({ category, index, y, onStart }: CategoryCardProps) {
  const { icon: Icon, accentClassName } =
    CATEGORY_STYLES[category.id] ?? DEFAULT_CATEGORY_STYLE;

  return (
    // Parallax on the <li>, reveal on the inner wrapper, so they never fight over `y`.
    <motion.li style={y ? { y } : undefined} className="h-full">
      <ViewportReveal
        scaleFrom={1}
        yOffset={20}
        duration={0.5}
        delay={Math.min(index, 6) * 0.08}
        className="h-full"
      >
        <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 p-6 sm:p-7 shadow-md flex flex-col justify-between h-full">
          <div className="flex items-start justify-between mb-6">
            <div
              aria-hidden="true"
              className={`w-11 h-11 rounded-2xl ${accentClassName} border border-cr-dark/10 flex items-center justify-center shadow-xs`}
            >
              <Icon className="w-5 h-5" />
            </div>
            {/* A real button; its ::after stretches over the whole card so the
                card is clickable without turning the card into role="button". */}
            <button
              type="button"
              onClick={() => onStart(category.title)}
              className="text-[11px] font-bold text-cr-dark/60 group-hover/spotlight:text-cr-pink bg-white px-2.5 py-1 rounded-full border border-cr-dark/10 transition-colors cursor-pointer after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-cr-pink"
            >
              Start campaign
              <span className="sr-only"> for {category.title}</span>{" "}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold group-hover/spotlight:text-cr-pink mb-2 tracking-tight transition-colors">
              {category.title}
            </h3>
            <p className="text-cr-dark/75 text-sm font-normal">
              {category.subtitle}
            </p>
          </div>
        </SpotlightCard>
      </ViewportReveal>
    </motion.li>
  );
}

export default function BrandSection({
  categories,
  onStartCampaign,
}: BrandSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isLg = useMediaQuery(LG_QUERY);
  const parallaxEnabled = isLg && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yCol0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const columnOffsets = [yCol0, yCol1, yCol2];

  if (categories.length === 0) return null;

  return (
    <section
      id="brands"
      ref={sectionRef}
      aria-labelledby="brands-heading"
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
              For brands
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
              id="brands-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Every kind of brand,{" "}
              <span className="text-cr-pink">one place to find creators.</span>
            </h2>
          </ViewportReveal>

          <ViewportReveal scaleFrom={1} yOffset={16} duration={0.6} delay={0.2}>
            <p className="text-lg sm:text-xl text-cr-dark/85 leading-relaxed font-normal">
              Even creators are brands here. A streamer or artist can bring on
              clippers to redistribute their own content and get people talking,
              the same way a skincare brand brings on UGC creators to talk about
              a new product.
            </p>
          </ViewportReveal>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {categories.map((category, idx) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={idx}
              y={
                parallaxEnabled
                  ? columnOffsets[idx % columnOffsets.length]
                  : undefined
              }
              onStart={onStartCampaign}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
