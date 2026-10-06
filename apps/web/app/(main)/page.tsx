import LandingPage from "@/components/landing/LandingPage";
import { PLATFORM_STATS } from "@/lib/api/stats";

export default function Page() {
  return <LandingPage stats={PLATFORM_STATS} />;
}
