"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "mark" | "inverted";
  className?: string;
  imgFallback?: boolean;
}

// Exact vector path for the official Cooper Black "Cr" glyphs matching the brand logo
const CR_GLYPH_PATH =
  "M162.20 125.20Q187.86 125.20 211.77 136.45Q223.02 141.72 227.41 141.72Q230.58 141.72 237.61 140.14Q239.89 139.61 242.71 139.61Q251.85 139.61 258.70 148.05Q275.58 168.44 275.58 198.67Q275.58 219.94 260.99 229.79Q253.08 235.06 243.23 235.06Q234.27 235.06 228.64 231.19Q223.02 227.32 217.74 217.48Q210.19 203.59 205.44 197.53Q200.69 191.46 193.84 186.54Q176.79 174.59 158.15 174.59Q140.05 174.59 129.41 187.69Q118.78 200.78 118.78 222.75Q118.78 252.99 134.07 278.13Q154.81 311.70 193.49 311.70Q207.72 311.70 221.70 306.95Q235.67 302.21 243.41 294.65Q250.09 288.32 254.31 288.32Q260.46 288.32 264.85 294.03Q269.25 299.75 269.25 307.83Q269.25 318.03 263.10 330.68Q256.94 343.34 248.33 350.55Q244.64 353.54 233.04 355.82Q226.36 357.05 215.28 362.32Q189.27 374.80 161.14 374.80Q131.79 374.80 102.61 361.62Q68.68 346.33 48.99 314.69Q29.66 283.93 29.66 250.35Q29.66 211.33 53.92 179.16Q75.01 151.21 108.94 136.45Q134.78 125.20 162.20 125.20M369.09 196.04Q378.41 196.04 380.43 198.67Q382.45 201.31 384.03 215.55Q384.91 223.28 389.48 223.28Q393 223.28 396.16 218.18Q410.22 196.21 432.90 196.21Q448.90 196.21 459.09 206.58Q464.01 211.68 467.18 219.68Q470.34 227.68 470.34 235.06Q470.34 243.32 466.47 252.02Q462.61 260.72 456.46 266.35Q445.21 277.07 428.86 277.07Q419.89 277.07 413.83 273.91Q407.76 270.74 397.92 261.07Q394.23 257.38 391.06 257.38Q386.14 257.38 384.65 262.92Q383.15 268.46 383.15 286.21Q383.15 312.75 385.09 322.42Q386.32 327.70 388.52 329.72Q390.71 331.74 397.92 333.85Q413.74 338.59 413.74 350.37Q413.74 357.58 408.64 362.94Q403.54 368.30 395.11 370.06Q378.23 373.57 345.54 373.57Q314.42 373.57 298.25 368.13Q283.84 363.20 283.84 351.07Q283.84 341.93 294.38 334.73Q299.48 331.39 301.42 328.66Q303.35 325.94 304.05 321.19Q306.87 305.20 306.87 261.95Q306.87 254.04 305.11 250.62Q303.35 247.19 298.08 245.08Q285.60 240.16 285.60 230.84Q285.60 222.40 294.21 216.34Q302.82 210.27 323.04 204.30Q350.11 196.21 369.09 196.04";

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "full",
  className = "",
  imgFallback = true,
}) => {
  const [imgError, setImgError] = useState(false);

  const markDimensions = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-9 h-9 rounded-xl",
    lg: "w-11 h-11 rounded-xl",
    xl: "w-14 h-14 rounded-2xl",
  }[size];

  const textDimensions = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }[size];

  const isDarkBg = variant === "inverted";

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}
      id={`cr-logo-${size}`}
    >
      {/* Official "Cr" Logo Mark on Black Background */}
      <div
        className={`${markDimensions} relative bg-[#000000] flex items-center justify-center p-1 shadow-md shadow-black/15 border border-black/10 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200`}
        title="CreatorsRewards Logo"
      >
        {imgFallback && !imgError ? (
          <Image
            src="/images/cr logo.jpg"
            alt="CreatorsRewards"
            fill
            sizes="(max-width: 768px) 36px, 56px"
            className="object-contain p-0.5"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d={CR_GLYPH_PATH} fill="#FB7185" />
          </svg>
        )}
      </div>

      {variant !== "mark" && (
        <span
          className={`${textDimensions} font-bold tracking-[-0.02em] ${
            isDarkBg ? "text-white" : "text-[#1C1917]"
          }`}
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Creators<span className="text-[#FB7185]">Rewards</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
