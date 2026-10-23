"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

type Bezier = [number, number, number, number];

/** Shared easing curves. Typed as tuples so motion accepts them. */
const EASE = {
  counter: [0.33, 1, 0.68, 1], // ease-out cubic
  split: [0.215, 0.61, 0.355, 1],
  rotator: [0.2, 0.8, 0.2, 1],
  clip: [0.16, 1, 0.3, 1],
  viewport: [0.21, 0.47, 0.32, 0.98],
} satisfies Record<string, Bezier>;

// ============================================================================
// 1. AnimatedCounter
//    Writes to the DOM through a ref on every frame, so React never re-renders
//    while counting. Screen readers get the final value, not the tick-up.
// ============================================================================
export interface AnimatedCounterProps {
  from?: number;
  to: number;
  /** Seconds. */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Fixed by default so server and client render identical text. */
  locale?: string;
  /** Overrides the default locale formatting. Safe to pass inline. */
  formatter?: (value: number) => string;
  className?: string;
}

function formatNumber(
  value: number,
  decimals: number,
  locale: string,
  formatter?: (value: number) => string,
): string {
  const rounded = Number(value.toFixed(decimals));
  if (formatter) return formatter(rounded);
  return rounded.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  formatter,
  className = "",
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const formatterRef = useRef(formatter);
  const isInView = useInView(containerRef, { once: true, margin: "-20px" });
  const reduceMotion = useReducedMotion();

  // Keep the latest formatter without making it an effect dependency,
  // so an inline arrow function can't restart the animation.
  useEffect(() => {
    formatterRef.current = formatter;
  });

  useEffect(() => {
    const node = valueRef.current;
    if (!node || !isInView) return;

    const render = (value: number) => {
      node.textContent = formatNumber(
        value,
        decimals,
        locale,
        formatterRef.current,
      );
    };

    if (reduceMotion) {
      render(to);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: EASE.counter,
      onUpdate: render,
      onComplete: () => render(to),
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, from, to, duration, decimals, locale]);

  return (
    <span ref={containerRef} className={className}>
      <span className="sr-only">
        {prefix}
        {formatNumber(to, decimals, locale, formatter)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        <span ref={valueRef}>
          {formatNumber(from, decimals, locale, formatter)}
        </span>
        {suffix}
      </span>
    </span>
  );
}

// ============================================================================
// 2. SplitTextReveal
// ============================================================================
export interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Matched against each word with or without surrounding punctuation. */
  highlightWords?: readonly string[];
  highlightClassName?: string;
}

/** Strips punctuation from the edges of a word only ("high-energy," -> "high-energy"). */
function stripEdgePunctuation(word: string): string {
  return word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  highlightClassName = "text-cr-pink",
}: SplitTextRevealProps) {
  const reduceMotion = useReducedMotion();
  const highlighted = new Set(highlightWords);
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {/* Screen readers read the sentence once instead of word by word. */}
      <span className="sr-only">{text}</span>
      {words.map((word, idx) => {
        const isHighlight =
          highlighted.has(word) || highlighted.has(stripEdgePunctuation(word));

        return (
          <motion.span
            key={`${word}-${idx}`}
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, y: 24, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + idx * 0.04,
              ease: EASE.split,
            }}
            className={`inline-block ${isHighlight ? highlightClassName : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

// ============================================================================
// 3. TextRotator
// ============================================================================
export interface TextRotatorProps {
  /** Accepts readonly arrays, e.g. `as const` tuples. */
  words: readonly string[];
  /** Milliseconds between words. */
  interval?: number;
  /** Applied to the clipping container. */
  className?: string;
  /** Applied to the visible word. Defaults to the brand coral. */
  wordClassName?: string;
}

export function TextRotator({
  words,
  interval = 2800,
  className = "",
  wordClassName = "text-cr-pink",
}: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  // Depend on the length, not the array identity, so a parent passing a new
  // array each render can't reset the timer.
  const count = words.length;

  useEffect(() => {
    if (count < 2 || reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval, reduceMotion]);

  if (count === 0) return null;

  return (
    <span
      className={`inline-block relative overflow-hidden align-baseline ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE.rotator }}
          className={`inline-block whitespace-nowrap ${wordClassName}`}
        >
          {words[index % count]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ============================================================================
// 4. SpotlightCard
//    No React state at all. Pointer position and tilt are CSS variables,
//    and every hover effect is pure CSS.
// ============================================================================
export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
  id?: string;
  enableTilt?: boolean;
}

const DEFAULT_SPOTLIGHT = "rgba(251, 113, 133, 0.16)";
const BORDER_GLOW = "rgba(251, 113, 133, 0.45)";
const TILT_DEGREES = 3;

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = DEFAULT_SPOTLIGHT,
  onClick,
  id,
  enableTilt = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isClickable = Boolean(onClick);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || e.pointerType === "touch") return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      card.style.setProperty(
        "--tilt-x",
        `${((y - centerY) / centerY) * -TILT_DEGREES}deg`,
      );
      card.style.setProperty(
        "--tilt-y",
        `${((x - centerX) / centerX) * TILT_DEGREES}deg`,
      );
    }
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const classes = [
    "group/spotlight relative overflow-hidden",
    // Short duration on hover-in, longer ease back on hover-out.
    "transition-[transform,translate,box-shadow,border-color] duration-500 ease-out hover:duration-100",
    "hover:border-cr-pink/40 hover:shadow-2xl",
    enableTilt &&
      "motion-safe:[transform:perspective(1000px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] motion-safe:hover:-translate-y-1",
    isClickable &&
      "cursor-pointer focus-visible:outline-2 focus-visible:outline-cr-pink",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const glowMask: CSSProperties = {
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    padding: "1.5px",
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      className={classes}
    >
      {/* Cursor spotlight glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 75%)`,
        }}
      />
      {/* Border edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-85"
        style={{
          background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${BORDER_GLOW}, transparent 70%)`,
          ...glowMask,
        }}
      />
      {children}
    </div>
  );
}

// ============================================================================
// 5. ClipPathReveal
//    `as` maps to a real motion element, so headings and paragraphs stay valid
//    HTML. The wrapper switches between span and div to keep nesting valid.
// ============================================================================
const REVEAL_TAGS = {
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
} as const;

export type ClipPathRevealTag = keyof typeof REVEAL_TAGS;

const CLIP_HIDDEN = {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  y: "115%",
  opacity: 0,
};

const CLIP_VISIBLE = {
  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
  y: "0%",
  opacity: 1,
};

export interface ClipPathRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  wrapperClassName?: string;
  as?: ClipPathRevealTag;
  triggerOnScroll?: boolean;
}

export function ClipPathReveal({
  children,
  delay = 0,
  duration = 0.85,
  className = "",
  wrapperClassName = "",
  as = "div",
  triggerOnScroll = false,
}: ClipPathRevealProps) {
  const reduceMotion = useReducedMotion();
  // Every entry is a motion element accepting the same animation props;
  // narrowing to one member keeps props type-checked without `any`.
  const MotionTag = REVEAL_TAGS[as] as typeof motion.div;
  const isInline = as === "span";
  const Wrapper = isInline ? "span" : "div";

  const trigger = triggerOnScroll
    ? {
        whileInView: CLIP_VISIBLE,
        viewport: { once: true, amount: 0.2 },
      }
    : { animate: CLIP_VISIBLE };

  return (
    <Wrapper
      className={`overflow-hidden py-1 ${
        isInline ? "inline-block align-bottom" : "block"
      } ${wrapperClassName}`}
    >
      <MotionTag
        initial={reduceMotion ? false : CLIP_HIDDEN}
        {...trigger}
        transition={{ duration, delay, ease: EASE.clip }}
        className={`${isInline ? "inline-block" : "block"} ${className}`}
      >
        {children}
      </MotionTag>
    </Wrapper>
  );
}

// ============================================================================
// 6. ViewportReveal
// ============================================================================
export interface ViewportRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  hoverScale?: boolean;
}

export function ViewportReveal({
  children,
  delay = 0,
  duration = 0.65,
  scaleFrom = 0.95,
  yOffset = 24,
  className = "",
  once = true,
  amount = 0.15,
  hoverScale = false,
}: ViewportRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion ? false : { opacity: 0, scale: scaleFrom, y: yOffset }
      }
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE.viewport }}
      whileHover={
        hoverScale && !reduceMotion
          ? { scale: 1.02, transition: { duration: 0.25 } }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
