import Link from "next/link";
import { Bell } from "lucide-react";
import {
  ActiveCampaignCard,
  CampaignMatchCard,
  EarningsCard,
  SectionHeader,
  VerificationBanner,
  type ActiveCampaign,
  type EarningsSummary,
  type MatchedCampaign,
} from "../components/creator/DashboardParts";

// The greeting depends on the time of day, so don't cache this page at build time
export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/*  Dummy data. TODO: replace with real fetches (user, earnings, campaigns)   */
/* -------------------------------------------------------------------------- */

const CREATOR_NAME = "Amara Okafor";

const EARNINGS: EarningsSummary = {
  total: 128450,
  changePct: 18.4,
  views: 84200,
  campaigns: 4,
  today: 24500,
};

const ACTIVE_CAMPAIGNS: ActiveCampaign[] = [
  {
    id: "glowskin-ugc",
    title: "GlowSkin UGC Campaign",
    brand: "GlowSkin Africa",
    status: "Active",
    views: 84200,
    targetViews: 120000,
  },
];

const RECOMMENDED: MatchedCampaign[] = [
  {
    id: "glowskin-ugc-2",
    title: "GlowSkin UGC Campaign",
    brand: "GlowSkin Africa",
    matchPct: 94,
    tags: ["Beauty", "UGC"],
    reward: "₦45,000",
    duration: "14 days",
    target: "120K views",
  },
];

/* -------------------------------------------------------------------------- */

function getGreeting() {
  // Nigeria time, so the greeting is right wherever the server runs
  const hour =
    Number(
      new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hour12: false,
        timeZone: "Africa/Lagos",
      }).format(new Date()),
    ) % 24;
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function CreatorDashboardPage() {
  return (
    <div>
      {/* Header */}
      <header className="mb-6 flex items-start justify-between lg:mb-8">
        <div>
          <p className="text-sm text-(--text-muted)">{getGreeting()} 👋</p>
          <h1 className="font-(family-name:--font-display) text-2xl font-bold text-(--text-primary) lg:text-3xl">
            {CREATOR_NAME}
          </h1>
        </div>
        <Link
          href="/creator/notifications"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-stone-900 shadow-sm"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </Link>
      </header>

      {/*
        Mobile: one column, in the order below.
        Desktop: earnings + verification on top, recommended + active below.
      */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
        <EarningsCard data={EARNINGS} className="lg:col-span-2" />

        <VerificationBanner />

        {/* lg:order-2 moves this after "Campaigns for you" on desktop only */}
        <section className="lg:order-2">
          <SectionHeader title="Active campaigns" href="/creator/campaigns" />
          <div className="flex flex-col gap-3">
            {ACTIVE_CAMPAIGNS.map((c) => (
              <ActiveCampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>

        <section className="lg:col-span-2">
          <SectionHeader title="Campaigns for you" href="/creator/campaigns" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {RECOMMENDED.map((c) => (
              <CampaignMatchCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}