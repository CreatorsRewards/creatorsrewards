import Link from "next/link";
import { Bell } from "lucide-react";
import {
  ActionRequiredCard,
  BrandCampaignCard,
  QuickActions,
  SectionHeader,
  StatsGrid,
  type ActionItem,
  type BrandCampaign,
  type BrandStats,
} from "../components/brand/BrandParts";

/* -------------------------------------------------------------------------- */
/*  Dummy data. TODO: replace with real fetches (brand, stats, campaigns)     */
/* -------------------------------------------------------------------------- */

const BRAND_NAME = "Glowskin Africa";

const STATS: BrandStats = {
  totalCampaigns: 12,
  activeCampaigns: 3,
  totalSpend: 2800000,
  spendThisMonth: 189000,
  totalReach: 840000,
  pendingReviews: 2,
};

const ACTION_ITEMS: ActionItem[] = [
  {
    id: "review",
    kind: "submissions",
    text: "2 submissions awaiting content review",
    href: "/brand/campaigns/glowskin-ugc",
  },
  {
    id: "applications",
    kind: "applications",
    text: "5 new applications — GlowSkin UGC",
    href: "/brand/campaigns/glowskin-ugc",
  },
];

const ACTIVE_CAMPAIGNS: BrandCampaign[] = [
  {
    id: "glowskin-ugc",
    title: "GlowSkin UGC Campaign",
    status: "Active",
    creators: 3,
    submissions: 2,
    spent: 180000,
    budget: 500000,
  },
];

const UNREAD_NOTIFICATIONS = 2;

/* -------------------------------------------------------------------------- */

export default function BrandDashboardPage() {
  return (
    <div>
      {/* Header */}
      <header className="mb-6 flex items-start justify-between lg:mb-8">
        <div>
          <p className="text-sm text-stone-400">Brand Dashboard</p>
          <h1 className="font-(family-name:--font-display) text-2xl font-bold text-white lg:text-3xl">
            {BRAND_NAME}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/brand/notifications"
            aria-label={`Notifications (${UNREAD_NOTIFICATIONS} unread)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-[#241c1c] text-white"
          >
            <Bell size={18} />
            {UNREAD_NOTIFICATIONS > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--cr-pink) px-1 text-[10px] font-bold text-white">
                {UNREAD_NOTIFICATIONS}
              </span>
            )}
          </Link>
          {/* Swap for the brand logo once you store one */}
          <Link
            href="/brand/profile"
            aria-label="Brand profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-stone-900"
          >
            {BRAND_NAME.charAt(0)}
          </Link>
        </div>
      </header>

      {/*
        Mobile: one column, in the order below.
        Desktop: stats across the top; active campaigns on the left;
        quick actions + action required stacked on the right.
      */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-3">
          <StatsGrid stats={STATS} />
        </div>

        <div className="lg:col-start-3 lg:row-start-2">
          <QuickActions />
        </div>

        <div className="lg:col-start-3 lg:row-start-3">
          <ActionRequiredCard items={ACTION_ITEMS} />
        </div>

        <section className="lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-2">
          <SectionHeader title="Active Campaigns" href="/brand/campaigns" />
          <div className="flex flex-col gap-3">
            {ACTIVE_CAMPAIGNS.map((c) => (
              <BrandCampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}