"use client";

import type { ReactNode } from "react";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { FOOTER_LINK_CLASSES } from "./footer-links";

/**
 * The only client part of the footer: a link-styled button that opens the
 * auth modal. Everything else in <Footer> stays a server component.
 */
export default function FooterAction({
  action,
  children,
}: {
  action: "creator" | "brand";
  children: ReactNode;
}) {
  const { joinCreator, startCampaign } = useAuthFlow();

  return (
    <button
      type="button"
      onClick={() => (action === "creator" ? joinCreator() : startCampaign())}
      className={`${FOOTER_LINK_CLASSES} cursor-pointer`}
    >
      {children}
    </button>
  );
}
