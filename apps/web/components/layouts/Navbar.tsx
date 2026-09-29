"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../ui/Logo";

import {
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
  Video,
  Sparkles,
  Layers,
  Calculator,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenAuth?: (mode?: "creator" | "brand" | "login" | "join") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu if window resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    {
      label: "Creators",
      desc: "UGC, Clippers & Influencer lanes",
      href: "#creators",
      icon: Video,
      accentBg: "bg-[#FFDDBF]",
    },
    {
      label: "Brands",
      desc: "Escrow-backed creator campaigns",
      href: "#brands",
      icon: Sparkles,
      accentBg: "bg-[#BAE6FD]",
    },
    {
      label: "How it works",
      desc: "Three-step verified release pipeline",
      href: "#how-it-works",
      icon: Layers,
      accentBg: "bg-[#D1FAE5]",
    },
    {
      label: "Calculator",
      desc: "Simulate instant Naira earnings",
      href: "#calculator",
      icon: Calculator,
      accentBg: "bg-[#FFDDBF]",
    },
    {
      label: "Why us",
      desc: "Vetted roster, escrow security & Naira payouts",
      href: "#why-us",
      icon: ShieldCheck,
      accentBg: "bg-[#BAE6FD]",
    },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleAuthAction = (mode: "login" | "join") => {
    setMobileMenuOpen(false);
    if (onOpenAuth) {
      onOpenAuth(mode);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#D1FAE5]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#D1FAE5]/75 shadow-xs border-b border-[#1C1917]/10 py-3"
          : mobileMenuOpen
            ? "bg-[#D1FAE5]/95 backdrop-blur-md border-b border-[#1C1917]/10 py-4 sm:py-5 shadow-xs"
            : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-95"
            aria-label="CreatorsRewards Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 xl:px-4 py-1.5 rounded-full bg-[#FAFAF9]/80 backdrop-blur-md border border-[#1C1917]/10 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-semibold text-[#1C1917] hover:text-[#FB7185] transition-colors rounded-full hover:bg-black/[0.03] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <button
              type="button"
              id="nav-login-button"
              onClick={() => handleAuthAction("login")}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-[#1C1917] hover:text-[#FB7185] transition-colors cursor-pointer whitespace-nowrap"
            >
              Log in
            </button>

            <button
              type="button"
              id="nav-join-button"
              onClick={() => handleAuthAction("join")}
              className="group inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm font-bold text-white bg-[#FB7185] hover:bg-[#F43F5E] rounded-full shadow-md shadow-[#FB7185]/20 hover:scale-105 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>Join Now</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile & Tablet Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-2xl text-[#1C1917] bg-[#FAFAF9] border border-[#1C1917]/10 hover:bg-white shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FB7185]/30"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-[#1C1917]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <Menu className="w-5 h-5 text-[#1C1917]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] sm:top-[72px] bg-[#1C1917]/40 backdrop-blur-xs -z-10 lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              key="mobile-panel"
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -10, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.96 }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: "top center" }}
              className="lg:hidden w-full px-4 sm:px-6 lg:px-8 pt-2.5 pb-4"
            >
              <div className="bg-[#FAFAF9] rounded-3xl border border-[#1C1917]/10 shadow-2xl p-4 sm:p-5 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
                <nav className="space-y-1" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl hover:bg-white active:bg-white border border-transparent hover:border-[#1C1917]/10 transition-all cursor-pointer min-h-[48px]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl ${link.accentBg} border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] shrink-0 shadow-xs`}
                          >
                            <Icon className="w-5 h-5 text-[#1C1917]" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-base font-bold text-[#1C1917] group-hover:text-[#FB7185] transition-colors truncate">
                              {link.label}
                            </div>
                            <div className="text-xs text-[#1C1917]/65 truncate font-normal">
                              {link.desc}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#1C1917]/40 group-hover:text-[#FB7185] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </a>
                    );
                  })}
                </nav>

                <div className="pt-3 border-t border-[#1C1917]/10 space-y-2.5">
                  <button
                    type="button"
                    id="mobile-menu-join-now-btn"
                    onClick={() => handleAuthAction("join")}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#FB7185] hover:bg-[#F43F5E] text-white font-bold text-base shadow-md shadow-[#FB7185]/25 active:scale-[0.99] transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>Join Now</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    type="button"
                    id="mobile-menu-login-btn"
                    onClick={() => handleAuthAction("login")}
                    className="w-full py-3 px-4 rounded-2xl border border-[#1C1917]/15 bg-white hover:bg-stone-50 active:bg-stone-100 text-[#1C1917] font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer min-h-[44px]"
                  >
                    <LogIn className="w-4 h-4 text-[#1C1917]" />
                    <span>Log in</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
