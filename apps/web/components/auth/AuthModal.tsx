"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import type { AuthType, CampaignData } from "@/hooks/useAuthFlow";
import { submitAuth } from "@/lib/actions/auth";
import type { AuthResult, AuthSubmission } from "@/lib/auth";
import type { CreatorLane } from "@/lib/api/types";
import AuthPanel from "./AuthPanel";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: AuthType;
  campaignData?: CampaignData | null;
  /** Lanes offered in the creator sign-up form. */
  creatorLanes: readonly CreatorLane[];
  /** Sends the form to the backend. Defaults to the placeholder in lib/actions. */
  onSubmit?: (submission: AuthSubmission) => Promise<AuthResult>;
}

/**
 * Built on the native <dialog> element, which gives us for free what used to
 * be hand-rolled (and missing): focus trapping, Escape to close, an inert page
 * behind the modal, and focus returning to the button that opened it.
 */
export default function AuthModal({
  isOpen,
  onClose,
  initialType = "join",
  campaignData = null,
  creatorLanes,
  onSubmit = submitAuth,
}: AuthModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Start in the first form field, not on the close button.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Keep the page from scrolling behind the modal.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Join or log in to CreatorsRewards"
      // Escape: let our own state close it, so it never gets out of sync.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // Clicks on the dimmed area land on the <dialog> itself.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[calc(100%-1.75rem)] sm:w-full max-w-lg bg-transparent p-0 text-cr-dark backdrop:bg-cr-dark/70 backdrop:backdrop-blur-md"
    >
      {/* Only mounted while open, so every opening starts with a fresh form. */}
      {isOpen && (
        <div className="flex max-h-[92vh] flex-col overflow-hidden rounded-3xl border border-cr-dark/10 bg-cr-blush shadow-2xl">
          <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-cr-dark/10 shrink-0">
            <Logo size="sm" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full text-cr-dark/50 hover:text-cr-dark hover:bg-cr-dark/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-cr-pink"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <AuthPanel
            initialType={initialType}
            campaignData={campaignData}
            laneOptions={creatorLanes.map((lane) => lane.title)}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      )}
    </dialog>
  );
}
