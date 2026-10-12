"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { saveCampaignDraft } from "@/lib/campaign-draft";
import { signInHref, signUpHref } from "@/lib/routes";

export type AuthType = "login" | "join" | "creator" | "brand";

/** Details carried from a section to campaign creation. Empty strings mean "not chosen". */
export interface CampaignData {
  name: string;
  type: string;
  budget: string;
}

export interface AuthActions {
  /** "login" and "brand" go to sign-in; "join" and "creator" go to sign-up. */
  openAuth: (type?: AuthType) => void;
  /** Any "start / create a campaign" button. Goes to sign-in (a signed-in check comes later). */
  startCampaign: (details?: CampaignData | string) => void;
  /** Any "join as a creator" button, optionally with the lane the visitor clicked. */
  joinCreator: (lane?: string) => void;
}

/**
 * Sends visitors to the sign-up or sign-in page. The landing page sections
 * call these functions, so the rules for where each button goes live here and
 * nowhere else.
 */
export function useAuthFlow(): AuthActions {
  const router = useRouter();

  return useMemo<AuthActions>(
    () => ({
      openAuth: (type = "join") => {
        if (type === "login") router.push(signInHref());
        else if (type === "brand")
          router.push(signInHref({ intent: "campaign" }));
        else if (type === "creator")
          router.push(signUpHref({ role: "creator" }));
        else router.push(signUpHref());
      },

      startCampaign: (details) => {
        if (typeof details === "object") {
          saveCampaignDraft(details);
        } else if (typeof details === "string") {
          // A category card: we know the topic, not the creator type or budget.
          saveCampaignDraft({
            name: `${details} Campaign`,
            type: "",
            budget: "",
          });
        }
        router.push(signInHref({ intent: "campaign" }));
      },

      joinCreator: (lane) => {
        router.push(signUpHref({ role: "creator", lane }));
      },
    }),
    [router],
  );
}
