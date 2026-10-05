"use client";

import DynamicScrollBackground from "@/components/background/DynamicScrollBackground";
import InteractiveGridBackground from "@/components/background/InteractiveGridBackground";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import Hero from "./sections/Hero";
// import { Hero } from "./sections/Hero";

export default function LandingPage() {
  const { startCampaign, joinCreator /*, authModalOpen, ... */ } =
    useAuthFlow();

  return (
    <div className="min-h-screen flex flex-col text-[#1C1917] selection:bg-[#FB7185] selection:text-white relative overflow-x-hidden transition-colors duration-700">
      <DynamicScrollBackground />
      <InteractiveGridBackground />

      <main className="flex-grow relative z-10">
        <Hero
          onStartCampaign={() => startCampaign()}
          onJoinCreator={() => joinCreator()}
        />
        {/* <StatsTicker /> */}
        {/* <CreatorSection onJoinCreator={joinCreator} /> */}
        {/* <BrandSection onStartCampaign={startCampaign} /> */}
      </main>

      {/* <AuthModal ... /> */}
    </div>
  );
}
