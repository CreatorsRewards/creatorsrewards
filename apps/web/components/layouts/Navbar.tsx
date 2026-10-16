"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/routes";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "./nav-links";

const LG_QUERY = "(min-width: 1024px)";
const SCROLLED_AFTER_PX = 20;
const MOBILE_PANEL_ID = "mobile-nav-panel";

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery(LG_QUERY);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The menu only exists below lg. Reaching desktop width closes it for good,
  // so it doesn't pop back open if the window shrinks again.
  if (isDesktop && menuOpen) setMenuOpen(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLLED_AFTER_PX);
    update(); // the page may already be scrolled (e.g. after a refresh)
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const iconTransition = { duration: reduceMotion ? 0 : 0.18 };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,padding,box-shadow] duration-200 ${
        scrolled
          ? "bg-cr-yellow/80 backdrop-blur-md supports-[backdrop-filter]:bg-cr-yellow/75 shadow-xs border-b border-cr-dark/10 py-3"
          : menuOpen
            ? "bg-cr-yellow/95 backdrop-blur-md border-b border-cr-dark/10 py-4 sm:py-5 shadow-xs"
            : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href={ROUTES.home}
            aria-label="CreatorsRewards home"
            onClick={closeMenu}
            className="flex items-center gap-2 transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cr-pink"
          >
            <Logo size="md" />
          </Link>

          {/* Desktop links (lg and up, so tablets don't get crowded) */}
          <nav
            aria-label="Main"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 xl:px-4 py-1.5 rounded-full bg-cr-blush/80 backdrop-blur-md border border-cr-dark/10 shadow-xs"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-semibold hover:text-cr-pink transition-colors rounded-full hover:bg-black/[0.03] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-cr-pink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button
              id="nav-login-button"
              href={ROUTES.signIn}
              variant="ghost"
              size="sm"
            >
              Log in
            </Button>

            <Button
              id="nav-join-button"
              href={ROUTES.signUp}
              size="sm"
              rounded="full"
              iconRight={<ArrowUpRight className="w-4 h-4" />}
            >
              <span>Join Now</span>
            </Button>
          </div>

          <div className="flex lg:hidden items-center">
            <button
              ref={toggleRef}
              id="nav-mobile-menu-toggle"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls={MOBILE_PANEL_ID}
              className="w-11 h-11 rounded-2xl bg-cr-blush border border-cr-dark/10 hover:bg-white shadow-xs transition-all motion-safe:active:scale-95 cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-cr-pink"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={iconTransition}
                    className="flex items-center justify-center"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={iconTransition}
                    className="flex items-center justify-center"
                  >
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        panelId={MOBILE_PANEL_ID}
        onClose={closeMenu}
      />
    </header>
  );
}
