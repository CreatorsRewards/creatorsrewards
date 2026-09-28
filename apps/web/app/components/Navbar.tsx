"use client";

import Link from "next/link";

interface NavbarProps {
  activeSlide?: number;
}

export default function Navbar({ activeSlide = 0 }: NavbarProps) {
  const isPinkBg = activeSlide === 1 || activeSlide === 2;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-8 transition-colors duration-300 ${
        isPinkBg ? "bg-cr-pink" : "bg-transparent"
      }`}
    >
      {/* Brand Logo / Title */}
      <Link href="/" className="flex items-center gap-3">
        <span
          className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${
            isPinkBg ? "text-white" : "text-cr-dark"
          }`}
        >
          CreatorsRewards
        </span>
      </Link>

      {/* Action Button */}
      <Link
        href="/sign-in"
        className={`inline-flex items-center justify-center rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
          isPinkBg
            ? "border-white text-white hover:bg-white/10"
            : "border-cr-pink text-cr-pink hover:bg-cr-pink/10"
        }`}
      >
        Sign In
      </Link>
    </nav>
  );
}
