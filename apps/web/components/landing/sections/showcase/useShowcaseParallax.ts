"use client";

import type { RefObject } from "react";
import { useScroll, useTransform } from "motion/react";

/** All scroll-linked values for this section, in one place. */
export function useShowcaseParallax(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  return {
    glowY: useTransform(scrollYProgress, [0, 1], [-120, 120]),
    phoneY: useTransform(scrollYProgress, [0, 0.5, 1], [80, -20, -100]),
    phoneScale: useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.03, 0.95]),
    phoneRotate: useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]),
    leftY: useTransform(scrollYProgress, [0, 1], [140, -120]),
    leftRotate: useTransform(scrollYProgress, [0, 1], [-6, 3]),
    rightY: useTransform(scrollYProgress, [0, 1], [-80, 110]),
    rightRotate: useTransform(scrollYProgress, [0, 1], [4, -5]),
    tagTopY: useTransform(scrollYProgress, [0, 1], [160, -160]),
    tagBottomY: useTransform(scrollYProgress, [0, 1], [-120, 140]),
  };
}
