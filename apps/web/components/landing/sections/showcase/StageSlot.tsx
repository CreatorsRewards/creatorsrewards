"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { MotionStyle } from "motion/react";

interface StageSlotProps {
  active: boolean;
  onSelect: () => void;
  style?: MotionStyle;
  className: string;
  children: ReactNode;
}

/**
 * Wraps a demo card: parallax style, active highlight, click-to-select.
 * Click is a pointer shortcut only; keyboard users pick a stage with the
 * switcher buttons at the top of the section.
 */
export function StageSlot({
  active,
  onSelect,
  style,
  className,
  children,
}: StageSlotProps) {
  return (
    <motion.div
      style={style}
      onClick={onSelect}
      className={`cursor-pointer transition-[scale,opacity] duration-300 ${
        active ? "scale-[1.02]" : "opacity-95"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
