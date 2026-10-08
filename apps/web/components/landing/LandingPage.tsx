"use client";

import DynamicScrollBackground from "@/components/background/DynamicScrollBackground";
import InteractiveGridBackground from "@/components/background/InteractiveGridBackground";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import type { LandingContent } from "@/lib/api/types";
import BrandSection from "./sections/BrandSection";
import CreatorSection from "./sections/CreatorSection";
import Hero from "./sections/Hero";
import HowItWorksSection from "./sections/HowItWorksSection";
import ParallaxShowcaseSection from "./sections/ParallaxShowcaseSection";
import StatsTicker from "./sections/StatsTicker";
import EarningsCalculator from "./sections/EarningsCalculator";
import WhyCreatorsRewards from "./sections/WhyCreatorsRewards";
import CampaignPreviewSection from "./sections/CampaignPreviewSection";

export default function LandingPage({ content }: { content: LandingContent }) {
  const { startCampaign, joinCreator } = useAuthFlow();

  return (
    <div className="min-h-screen flex flex-col text-cr-dark selection:bg-cr-pink selection:text-white relative overflow-x-hidden transition-colors duration-700">
      <DynamicScrollBackground />
      <InteractiveGridBackground />

      <main className="grow relative z-10">
        <Hero onStartCampaign={startCampaign} onJoinCreator={joinCreator} />
        <StatsTicker stats={content.stats} />
        <CreatorSection
          lanes={content.creatorLanes}
          onJoinCreator={joinCreator}
        />
        <BrandSection
          categories={content.brandCategories}
          onStartCampaign={startCampaign}
        />
        <HowItWorksSection
          content={content.howItWorks}
          onStartCampaign={startCampaign}
          onJoinCreator={joinCreator}
        />
        <ParallaxShowcaseSection
          content={content.showcase}
          onStartCampaign={startCampaign}
          onJoinCreator={joinCreator}
        />

        <EarningsCalculator
          content={content.calculator}
          onStartCampaign={startCampaign}
          onJoinCreator={joinCreator}
        />

        <WhyCreatorsRewards pillars={content.whyUs} />

        <CampaignPreviewSection
          content={content.campaignPreview}
          onStartCampaign={startCampaign}
        />
      </main>

      {/* <AuthModal ... /> */}
    </div>
  );
}
