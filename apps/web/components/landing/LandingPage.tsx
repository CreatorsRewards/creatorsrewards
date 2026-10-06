"use client";

import DynamicScrollBackground from "@/components/background/DynamicScrollBackground";
import InteractiveGridBackground from "@/components/background/InteractiveGridBackground";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import type { PlatformStats } from "@/lib/api/types";
import Hero from "./sections/Hero";
import StatsTicker from "./sections/StatsTicker";

export default function LandingPage({ stats }: { stats: PlatformStats }) {
  const { startCampaign, joinCreator } = useAuthFlow();

  return (
    <div className="min-h-screen flex flex-col text-cr-dark selection:bg-cr-pink selection:text-white relative overflow-x-hidden transition-colors duration-700">
      <DynamicScrollBackground />
      <InteractiveGridBackground />

      <main className="grow shrink-0 relative z-10">
        <Hero onStartCampaign={startCampaign} onJoinCreator={joinCreator} />
        <StatsTicker stats={stats} />
        {/* <CreatorSection onJoinCreator={joinCreator} /> */}
        {/* <BrandSection onStartCampaign={startCampaign} /> */}
      </main>

      {/* <AuthModal ... /> */}
    </div>
  );
}
