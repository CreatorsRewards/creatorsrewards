"use client";

import React, { useEffect, useRef, useState } from "react";

export interface PaletteItem {
  bgColor: string;
  accentColor: string;
  name: string;
}

// Palette mapping for each section of the landing page
const SECTION_PALETTES: Record<string, PaletteItem> = {
  hero: {
    bgColor: "#D1FAE5", // Signature African Mint
    accentColor: "#FB7185",
    name: "Overview",
  },
  "stats-ticker": {
    bgColor: "#E0F2FE", // Soft Airy Sky Blue
    accentColor: "#0284C7",
    name: "Network Proof",
  },
  creators: {
    bgColor: "#FFEDD5", // Warm Peach
    accentColor: "#EA580C",
    name: "Creator Lanes",
  },
  brands: {
    bgColor: "#E2F6EA", // Fresh Mint-Sage
    accentColor: "#059669",
    name: "Brand Matrix",
  },
  "how-it-works": {
    bgColor: "#FFF1E8", // Warm Apricot Cream
    accentColor: "#F43F5E",
    name: "How It Works",
  },
  "parallax-showcase": {
    bgColor: "#E0F2FE", // Electric Sky
    accentColor: "#0284C7",
    name: "Live Showcase",
  },
  calculator: {
    bgColor: "#FFEDD5", // Warm Peach Glow
    accentColor: "#FB7185",
    name: "ROI & Earnings Calculator",
  },
  "earnings-calculator": {
    bgColor: "#FFEDD5", // Warm Peach Glow
    accentColor: "#FB7185",
    name: "ROI & Earnings Calculator",
  },
  "why-us": {
    bgColor: "#FFEBEB", // Subtle Warm Coral-Rose
    accentColor: "#E11D48",
    name: "Why CreatorsRewards",
  },
  "campaign-preview": {
    bgColor: "#D1FAE5", // African Mint
    accentColor: "#FB7185",
    name: "Launch Campaign",
  },
};

const DEFAULT_PALETTE: PaletteItem = {
  bgColor: "#D1FAE5",
  accentColor: "#FB7185",
  name: "Overview",
};

const SECTION_IDS = Object.keys(SECTION_PALETTES);

export const DynamicScrollBackground: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const visibilityMapRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Update visibility map for entries changed in this frame
      entries.forEach((entry) => {
        visibilityMapRef.current[entry.target.id] = entry.isIntersecting
          ? entry.intersectionRatio
          : 0;
      });

      // Find the most visible section across ALL observed sections
      let maxRatio = 0;
      let mostVisibleId = "";

      Object.entries(visibilityMapRef.current).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleId = id;
        }
      });

      if (mostVisibleId && SECTION_PALETTES[mostVisibleId]) {
        setActiveSectionId(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -35% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentPalette = SECTION_PALETTES[activeSectionId] ?? DEFAULT_PALETTE;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 transition-colors duration-700 ease-out"
      style={{ backgroundColor: currentPalette.bgColor }}
    />
  );
};

export default DynamicScrollBackground;
