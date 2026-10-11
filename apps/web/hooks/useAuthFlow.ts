"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type AuthType = "login" | "join" | "creator" | "brand";

/** Details carried from a section into the auth modal. Empty strings mean "not chosen". */
export interface CampaignData {
  name: string;
  type: string;
  budget: string;
}

export interface AuthFlowState {
  open: boolean;
  type: AuthType;
  campaignData: CampaignData | null;
}

/**
 * Everything a component needs to open the modal. These functions never change
 * identity, so components that only call them don't re-render when it opens.
 */
export interface AuthActions {
  openAuth: (type?: AuthType) => void;
  closeAuth: () => void;
  startCampaign: (details?: CampaignData | string) => void;
  joinCreator: (lane?: string) => void;
}

export const AuthActionsContext = createContext<AuthActions | null>(null);

/** State and actions behind <AuthProvider>. Use `useAuthFlow` in components instead. */
export function useAuthFlowState() {
  const [state, setState] = useState<AuthFlowState>({
    open: false,
    type: "join",
    campaignData: null,
  });

  const actions = useMemo<AuthActions>(() => {
    const open = (type: AuthType, campaignData: CampaignData | null) =>
      setState({ open: true, type, campaignData });

    return {
      openAuth: (type = "join") =>
        setState((prev) => ({ ...prev, open: true, type })),
      closeAuth: () => setState((prev) => ({ ...prev, open: false })),
      startCampaign: (details) => {
        if (typeof details === "object") {
          open("brand", details);
        } else if (typeof details === "string") {
          // A category card: we know the topic, not the type or budget.
          open("brand", { name: `${details} Campaign`, type: "", budget: "" });
        } else {
          open("brand", null);
        }
      },
      joinCreator: (lane) =>
        open("creator", lane ? { name: "", type: lane, budget: "" } : null),
    };
  }, []);

  return { state, actions };
}

/** Open the shared auth modal from any client component under <AuthProvider>. */
export function useAuthFlow(): AuthActions {
  const actions = useContext(AuthActionsContext);
  if (!actions) {
    throw new Error("useAuthFlow must be used inside <AuthProvider>.");
  }
  return actions;
}
