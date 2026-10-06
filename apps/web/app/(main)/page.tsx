import LandingPage from "@/components/landing/LandingPage";
import { CREATOR_LANES } from "@/lib/api/creator-lanes";
import { PLATFORM_STATS } from "@/lib/api/stats";

export default function Page() {
  return <LandingPage stats={PLATFORM_STATS} creatorLanes={CREATOR_LANES} />;
}
