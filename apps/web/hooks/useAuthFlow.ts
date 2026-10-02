"use client";

import { useState } from "react";

export type AuthType = "login" | "join" | "creator" | "brand";
export interface CampaignData {
  name: string;
  type: string;
  budget: string;
}

export function useAuthFlow() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<AuthType>("join");
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  const openAuth = (type: AuthType = "join") => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const startCampaign = (details?: CampaignData | string) => {
    if (typeof details === "object" && details !== null) {
      setCampaignData(details);
    } else {
      setCampaignData({
        name: details ? `${details} Campaign` : "Summer Product Launch",
        type: "UGC Creator",
        budget: "₦500,000",
      });
    }
    openAuth("brand");
  };

  const joinCreator = (lane?: string) => {
    if (lane) setCampaignData({ name: "", type: lane, budget: "" });
    openAuth("creator");
  };

  return {
    authModalOpen,
    authModalType,
    campaignData,
    closeAuth: () => setAuthModalOpen(false),
    openAuth,
    startCampaign,
    joinCreator,
  };
}
