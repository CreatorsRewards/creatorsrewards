import LandingPage from "@/components/landing/LandingPage";
import { LANDING_CONTENT } from "@/lib/api/landing";

export default function Page() {
  return <LandingPage content={LANDING_CONTENT} />;
}
