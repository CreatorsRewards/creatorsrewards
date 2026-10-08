"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CheckCircle2, Eye, Flame, Pause, Play, Sparkles } from "lucide-react";
import type { ShowcaseReel } from "@/lib/api/types";

const BAR_HEIGHTS = [35, 75, 45, 95, 60, 85, 40, 100, 50, 70] as const;

function SoundBars({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-1 h-7 sm:h-8"
    >
      {BAR_HEIGHTS.map((h, i) => (
        <motion.span
          key={i}
          animate={
            active
              ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }
              : { height: "30%" }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
          className="w-1 bg-cr-pink rounded-full inline-block"
        />
      ))}
    </div>
  );
}

interface ReelCardProps {
  data: ShowcaseReel;
  active: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSubmitClip: () => void;
}

export function ReelCard({
  data,
  active,
  isPlaying,
  onTogglePlay,
  onSubmitClip,
}: ReelCardProps) {
  const reduceMotion = useReducedMotion();
  const phoneRef = useRef<HTMLDivElement>(null);
  // Infinite animations only run while the phone is on screen.
  const inView = useInView(phoneRef);
  const animateBars = isPlaying && inView && !reduceMotion;
  const initial = data.creatorHandle.replace(/^@/, "").charAt(0).toUpperCase();

  return (
    <div
      ref={phoneRef}
      className={`rounded-[38px] sm:rounded-[42px] bg-cr-dark p-2.5 sm:p-3 shadow-2xl border-4 transition-[border-color,box-shadow] duration-300 ${
        active ? "border-cr-pink ring-4 ring-cr-pink/20" : "border-cr-dark/80"
      }`}
    >
      <div className="rounded-[30px] sm:rounded-[34px] bg-cr-blush overflow-hidden relative flex flex-col border border-white/20">
        <div
          aria-hidden="true"
          className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3.5 sm:h-4 rounded-full bg-cr-dark z-30 flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 mr-2" />
          <div className="w-7 sm:w-8 h-1 rounded-full bg-white/20" />
        </div>

        <div className="relative h-[390px] sm:h-[420px] bg-linear-to-b from-cr-dark via-[#2D2A26] to-cr-dark text-white p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_40%,#FB7185_0%,transparent_70%)]"
          />

          <div className="relative z-10 pt-3 sm:pt-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-bold border border-white/10">
              <Flame className="w-3.5 h-3.5 text-cr-pink" aria-hidden="true" />
              <span>{data.trend}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="relative z-10 my-auto text-center">
            <div
              aria-hidden="true"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cr-pink/20 border border-cr-pink flex items-center justify-center mx-auto mb-2.5 sm:mb-3 shadow-lg shadow-cr-pink/30"
            >
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-cr-pink" />
            </div>

            <SoundBars active={animateBars} />

            <div className="text-[11px] sm:text-xs font-semibold text-white/80 mt-2">
              {data.soundLabel}
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cr-purple text-cr-dark flex items-center justify-center font-bold text-[11px] sm:text-xs"
              >
                {initial}
              </div>
              <span className="text-xs font-bold">
                {data.creatorHandle} · {data.creatorLocation}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Verified
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-white/90 font-normal line-clamp-2">
              {data.caption}
            </p>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-white/80 pt-2 border-t border-white/15">
              <span className="flex items-center gap-1">
                <Eye
                  className="w-3.5 h-3.5 text-cr-orange"
                  aria-hidden="true"
                />{" "}
                {data.viewsLabel}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />{" "}
                Escrow Paid
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-cr-blush flex items-center justify-between border-t border-cr-dark/10">
          <div className="text-xs font-bold">
            Bounty: <span className="text-cr-pink">{data.bounty}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSubmitClip();
            }}
            className="px-3 py-1.5 rounded-lg bg-cr-pink text-white text-xs font-bold hover:bg-cr-coral-hover transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
          >
            Submit Clip
          </button>
        </div>
      </div>
    </div>
  );
}
