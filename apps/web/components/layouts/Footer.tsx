"use client";

import React from "react";
import Logo from "../ui/Logo";

interface FooterProps {
  onOpenAuth?: (mode?: "creator" | "brand" | "login" | "join") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  const handleAuth = (mode?: "creator" | "brand" | "login" | "join") => {
    if (onOpenAuth) {
      onOpenAuth(mode);
    }
  };

  const footerNavigation = {
    creators: [
      { name: "UGC Creators", action: () => handleAuth("creator") },
      { name: "Clippers", action: () => handleAuth("creator") },
      { name: "Micro-influencers", action: () => handleAuth("creator") },
      { name: "How to get paid", action: () => handleAuth("creator") },
    ],
    brands: [
      { name: "Start a campaign", action: () => handleAuth("brand") },
      { name: "Creator categories", action: () => handleAuth("brand") },
      { name: "Pricing & performance", action: () => handleAuth("brand") },
      { name: "Enterprise", action: () => handleAuth("brand") },
    ],
    platform: [
      { name: "Verification", href: "#how-it-works" },
      { name: "Security & anti-fraud", href: "#why-us" },
      { name: "Naira rail", href: "#why-us" },
      { name: "Paystack settlements", href: "#why-us" },
    ],
    legal: [
      { name: "Terms of Service", href: "#why-us" },
      { name: "Privacy Policy", href: "#why-us" },
      { name: "Creator Agreement", href: "#how-it-works" },
    ],
  };

  return (
    <footer className="bg-[#FAFAF9] text-[#1C1917] border-t border-[#1C1917]/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1C1917]/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-base text-[#1C1917]/75 max-w-sm leading-relaxed font-normal">
              Create. Clip. Earn. Africa's performance creator platform.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Creators Column */}
            <div>
              <h4
                className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Creators
              </h4>
              <ul className="space-y-2.5">
                {footerNavigation.creators.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={item.action}
                      className="text-sm text-[#1C1917]/70 hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Column */}
            <div>
              <h4
                className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Brands
              </h4>
              <ul className="space-y-2.5">
                {footerNavigation.brands.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={item.action}
                      className="text-sm text-[#1C1917]/70 hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Column */}
            <div>
              <h4
                className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Platform
              </h4>
              <ul className="space-y-2.5">
                {footerNavigation.platform.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-[#1C1917]/70 hover:text-[#FB7185] transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4
                className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Legal
              </h4>
              <ul className="space-y-2.5">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-[#1C1917]/70 hover:text-[#FB7185] transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1C1917]/60">
          <div>© 2026 CreatorsRewards. All rights reserved.</div>
          <div>Made for African creators and the brands that back them.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
