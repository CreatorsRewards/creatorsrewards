"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  phase: number;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  rgb: string;
}

const InteractiveGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    const points: Point[] = [];
    const ripples: Ripple[] = [];
    const spacing = 55; // Grid spacing in px

    const resizeAndInit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize points
      points.length = 0;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          points.push({
            x,
            y,
            originX: x,
            originY: y,
            phase: Math.random() * Math.PI * 2,
            size: Math.random() * 1.5 + 1.2,
          });
        }
      }
    };

    resizeAndInit();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      // Avoid triggering ripples when clicking buttons, inputs, or links
      const target = e.target as HTMLElement | null;
      if (
        target &&
        ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      ) {
        return;
      }

      const colors = ["251, 113, 133", "2, 132, 199", "16, 185, 129"];
      const chosenColor =
        colors[Math.floor(Math.random() * colors.length)] ?? "251, 113, 133";

      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: 220,
        alpha: 0.65,
        rgb: chosenColor,
      });
    };

    window.addEventListener("resize", resizeAndInit, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.018;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const mouseRadius = 180;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // Update and draw ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        if (!ripple) continue;

        ripple.radius += 3.5;
        ripple.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ripple.rgb}, ${ripple.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (ripple.alpha <= 0.02 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Update & render grid points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!p) continue;

        // Idle floating sine wave animation
        const waveX = Math.sin(time + p.phase) * 3;
        const waveY = Math.cos(time + p.phase * 0.8) * 3;

        let targetX = p.originX + waveX;
        let targetY = p.originY + waveY;

        // Interaction with mouse cursor
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const distSq = dx * dx + dy * dy;

        let activeGlow = false;
        let glowIntensity = 0;

        if (distSq < mouseRadiusSq && mouse.isHovered) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouseRadius) * 22;
          const angle = Math.atan2(dy, dx);

          targetX += Math.cos(angle) * force;
          targetY += Math.sin(angle) * force;

          activeGlow = true;
          glowIntensity = 1 - dist / mouseRadius;
        }

        // Ripple displacement
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          if (!rip) continue;

          const rdx = targetX - rip.x;
          const rdy = targetY - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          if (Math.abs(rdist - rip.radius) < 35) {
            const ripForce =
              (1 - Math.abs(rdist - rip.radius) / 35) * 8 * rip.alpha;
            const ripAngle = Math.atan2(rdy, rdx);
            targetX += Math.cos(ripAngle) * ripForce;
            targetY += Math.sin(ripAngle) * ripForce;
          }
        }

        p.x += (targetX - p.x) * 0.15;
        p.y += (targetY - p.y) * 0.15;

        // Render point
        ctx.beginPath();
        if (activeGlow) {
          const pointSize = p.size + glowIntensity * 2.2;
          ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 113, 133, ${0.35 + glowIntensity * 0.55})`;
          ctx.fill();

          // Connect points close to mouse with glowing web lines
          if (glowIntensity > 0.35) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 113, 133, ${glowIntensity * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(28, 25, 23, 0.12)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeAndInit);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] bg-[#FFDDBF] opacity-40 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[650px] h-[650px] bg-[#BAE6FD] opacity-40 rounded-full blur-[160px]" />
      <div className="absolute top-[45%] left-[20%] w-[450px] h-[450px] bg-[#FB7185] opacity-20 rounded-full blur-[180px]" />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default InteractiveGridBackground;
