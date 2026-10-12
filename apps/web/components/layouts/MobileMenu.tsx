"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronRight, LogIn } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { NAV_LINKS } from "./nav-links";

interface MobileMenuProps {
  isOpen: boolean;
  /** Matches the toggle button's aria-controls. */
  panelId: string;
  onClose: () => void;
}

/** The dropdown shown below the lg breakpoint. Lives inside the fixed header. */
export default function MobileMenu({
  isOpen,
  panelId,
  onClose,
}: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const seconds = (value: number) => (reduceMotion ? 0 : value);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Tapping the dimmed area closes the menu. */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: seconds(0.2) }}
            onClick={onClose}
            className="fixed inset-0 top-[60px] sm:top-[72px] bg-cr-dark/40 backdrop-blur-xs -z-10 lg:hidden"
            aria-hidden="true"
          />

          <motion.div
            key="mobile-panel"
            id={panelId}
            initial={{ opacity: 0, y: -10, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.96 }}
            transition={{ duration: seconds(0.24), ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top center" }}
            className="lg:hidden w-full px-4 sm:px-6 pt-2.5 pb-4"
          >
            <div className="bg-cr-blush rounded-3xl border border-cr-dark/10 shadow-2xl p-4 sm:p-5 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(
                  ({ label, desc, href, icon: Icon, accentClassName }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={onClose}
                      className="group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl hover:bg-white active:bg-white border border-transparent hover:border-cr-dark/10 transition-colors min-h-[48px] focus-visible:outline-2 focus-visible:outline-cr-pink"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          aria-hidden="true"
                          className={`w-10 h-10 rounded-xl ${accentClassName} border border-cr-dark/10 flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold group-hover:text-cr-pink transition-colors truncate">
                            {label}
                          </div>
                          <div className="text-xs text-cr-dark/65 truncate font-normal">
                            {desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        aria-hidden="true"
                        className="w-4 h-4 text-cr-dark/40 group-hover:text-cr-pink motion-safe:group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                      />
                    </a>
                  ),
                )}
              </nav>

              <div className="pt-3 border-t border-cr-dark/10 space-y-2.5">
                <Link
                  id="mobile-menu-join-now-btn"
                  href={ROUTES.signUp}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-cr-pink hover:bg-cr-coral-hover text-white font-bold text-base shadow-md shadow-cr-pink/25 motion-safe:active:scale-[0.99] transition-all min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
                >
                  <span>Join Now</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  id="mobile-menu-login-btn"
                  href={ROUTES.signIn}
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-2xl border border-cr-dark/15 bg-white hover:bg-stone-50 active:bg-stone-100 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  <span>Log in</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
