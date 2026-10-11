"use client";

import type { ReactNode } from "react";
// import AuthModal from "@/components/auth/AuthModal";
import { AuthActionsContext, useAuthFlowState } from "@/hooks/useAuthFlow";
import type { CreatorLane } from "@/lib/api/types";
import AuthModal from "../auth/AuthModal";

interface AuthProviderProps {
  /** Lanes offered in the creator sign-up form. */
  creatorLanes: readonly CreatorLane[];
  children: ReactNode;
}

/**
 * Mount once, high in the tree (the (main) layout). It owns the single auth
 * modal, so Navbar, Footer and every section open the same one.
 *
 * `children` is passed straight through, so opening or closing the modal
 * re-renders only the modal, not the page behind it.
 */
export default function AuthProvider({
  creatorLanes,
  children,
}: AuthProviderProps) {
  const { state, actions } = useAuthFlowState();

  return (
    <AuthActionsContext.Provider value={actions}>
      {children}
      <AuthModal
        isOpen={state.open}
        initialType={state.type}
        campaignData={state.campaignData}
        creatorLanes={creatorLanes}
        onClose={actions.closeAuth}
      />
    </AuthActionsContext.Provider>
  );
}
