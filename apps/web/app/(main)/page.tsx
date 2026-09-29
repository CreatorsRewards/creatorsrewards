"use client";

import React, { useState } from "react";
// import Navbar from "@/components/layouts/Navbar";
// import Footer from "@/components/layouts/Footer";
import DynamicScrollBackground from "@/components/background/DynamicScrollBackground";
import InteractiveGridBackground from "@/components/background/InteractiveGridBackground";

function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<
    "login" | "join" | "creator" | "brand"
  >("join");
  const [campaignData, setCampaignData] = useState<{
    name: string;
    type: string;
    budget: string;
  } | null>(null);

  const handleOpenAuth = (
    type: "login" | "join" | "creator" | "brand" = "join",
  ) => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const handleStartCampaign = (
    details?: { name: string; type: string; budget: string } | string,
  ) => {
    if (typeof details === "object" && details !== null) {
      setCampaignData(details);
    } else if (typeof details === "string") {
      setCampaignData({
        name: `${details} Campaign`,
        type: "UGC Creator",
        budget: "₦500,000",
      });
    } else {
      setCampaignData({
        name: "Summer Product Launch",
        type: "UGC Creator",
        budget: "₦500,000",
      });
    }
    setAuthModalType("brand");
    setAuthModalOpen(true);
  };

  const handleJoinCreator = (lane?: string) => {
    if (lane) {
      setCampaignData({
        name: "",
        type: lane,
        budget: "",
      });
    }
    setAuthModalType("creator");
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col text-[#1C1917] selection:bg-[#FB7185] selection:text-white relative overflow-x-hidden transition-colors duration-700">
      {/* Dynamic Background Color Layer */}
      <DynamicScrollBackground />

      {/* Interactive Web Background Animation & Particle Grid */}
      <InteractiveGridBackground />

      {/* Persistent Navigation Header */}
      {/* <Navbar onOpenAuth={handleOpenAuth} /> */}

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* <Hero
          onStartCampaign={() => handleStartCampaign()}
          onJoinCreator={() => handleJoinCreator()}
        /> */}
        {/* <StatsTicker /> */}
        {/* <CreatorSection onJoinCreator={handleJoinCreator} /> */}
        {/* <BrandSection onStartCampaign={handleStartCampaign} /> */}
        {/* <HowItWorksSection
          onStartCampaign={() => handleStartCampaign()}
          onJoinCreator={() => handleJoinCreator()}
        /> */}
        {/* <ParallaxShowcaseSection
          onStartCampaign={() => handleStartCampaign()}
          onJoinCreator={() => handleJoinCreator()} */}
        {/* /> */}
        {/* <EarningsCalculator
          onStartCampaign={handleStartCampaign}
          onJoinCreator={handleJoinCreator}
        /> */}
        {/* <WhyCreatorsRewards />
        <CampaignPreviewSection onStartCampaign={handleStartCampaign} /> */}
      </main>

      {/* Footer */}
      {/* <Footer onOpenAuth={handleOpenAuth} /> */}

      {/* Onboarding & Campaign Modal */}
      {/* <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialType={authModalType}
        campaignData={campaignData}
      /> */}
    </div>
  );
}

export default LandingPage;
