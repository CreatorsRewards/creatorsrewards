"use client";

import { useEffect, useRef } from "react";

// Wave look, taken from the original design. `offset` is the wave's resting
// height as a fraction of the canvas.
const WAVES = [
  {
    color: "rgba(251, 113, 133, 0.08)",
    frequency: 0.002,
    amplitude: 25,
    offset: 0.3,
  },
  {
    color: "rgba(2, 132, 199, 0.08)",
    frequency: 0.003,
    amplitude: 40,
    offset: 0.5,
  },
  {
    color: "rgba(16, 185, 129, 0.08)",
    frequency: 0.004,
    amplitude: 55,
    offset: 0.7,
  },
] as const;

const STEP_PX = 20; // horizontal distance between line points
const SPEED = 0.9; // radians per second (same as 0.015 per frame at 60fps)
const MAX_DPR = 2;
const MAX_FRAME_SECONDS = 0.1; // avoids a jump after the tab was in the background

/**
 * Ambient flowing waves behind the showcase section.
 * Only animates while on screen, and draws a single static frame when the
 * visitor prefers reduced motion.
 */
export default function DynamicShowcaseBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let elapsed = 0;
    let lastTime = 0;
    let frameId = 0;
    let isVisible = true;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      WAVES.forEach(({ color, frequency, amplitude, offset }, index) => {
        const baseY = height * offset;

        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width; x += STEP_PX) {
          ctx.lineTo(
            x,
            baseY + Math.sin(x * frequency + elapsed + index) * amplitude,
          );
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, MAX_FRAME_SECONDS);
      lastTime = now;
      elapsed += delta * SPEED;
      draw();
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const sync = () => {
      if (isVisible && !reduceMotion.matches) {
        if (!frameId) {
          lastTime = performance.now();
          frameId = requestAnimationFrame(tick);
        }
      } else {
        stop();
        draw(); // leave a correct static frame behind
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // The canvas fills its section, so observing the canvas also catches the
    // section growing or shrinking, not just window resizes.
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver((entries) => {
      // Entries are in time order, so the last one is the current state.
      for (const entry of entries) isVisible = entry.isIntersecting;
      sync();
    });
    visibilityObserver.observe(canvas);

    reduceMotion.addEventListener("change", sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-70"
    />
  );
}
