import Link from "next/link";
import { ChevronRight, FileCheck, Plus, UserPlus } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types & formatting                                                        */
/* -------------------------------------------------------------------------- */

export interface BrandStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  spendThisMonth: number;
  totalReach: number;
  pendingReviews: number;
}

export interface ActionItem {
  id: string;
  kind: "submissions" | "applications";
  text: string;
  href: string;
}

export interface BrandCampaign {
  id: string;
  title: string;
  status: string;
  creators: number;
  submissions: number;
  spent: number;
  budget: number;
}

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
// 840000 -> "840k", 2800000 -> "2.8M"
const compact = (n: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(n)
    .replace("K", "k");

const CARD = "rounded-2xl border border-white/5 bg-[#241c1c]";

/* -------------------------------------------------------------------------- */
/*  Stat card                                                                 */
/* -------------------------------------------------------------------------- */

export function StatCard({
  value,
  label,
  sub,
  valueClass,
}: {
  value: string;
  label: string;
  sub: string;
  valueClass: string;
}) {
  return (
    <div className={`${CARD} p-4 lg:p-5`}>
      <p
        className={`font-(family-name:--font-display) text-3xl font-bold lg:text-4xl ${valueClass}`}
      >
        {value}
      </p>
      <p className="mt-2 text-xs font-medium text-stone-200">{label}</p>
      <p className="text-[11px] text-stone-500">{sub}</p>
    </div>
  );
}

export function StatsGrid({ stats }: { stats: BrandStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard
        value={String(stats.totalCampaigns)}
        label="Total Campaigns"
        sub={`${stats.activeCampaigns} active`}
        valueClass="text-(--cr-pink)"
      />
      <StatCard
        value={`₦${compact(stats.totalSpend)}`}
        label="Total Spend"
        sub={`₦${compact(stats.spendThisMonth)} this month`}
        valueClass="text-white"
      />
      <StatCard
        value={compact(stats.totalReach)}
        label="Total Reach"
        sub="Views delivered"
        valueClass="text-sky-300"
      />
      <StatCard
        value={String(stats.pendingReviews)}
        label="Pending reviews"
        sub="Content submissions"
        valueClass="text-amber-200"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quick actions                                                             */
/* -------------------------------------------------------------------------- */

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link
        href="/brand/campaigns/new"
        className="flex items-center justify-center gap-1.5 rounded-xl bg-(--cr-pink) px-4 py-3.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
      >
        <Plus className="h-4 w-4" /> New Campaign
      </Link>
      <Link
        href="/brand/creators"
        className={`${CARD} flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-stone-100 no-underline transition-colors hover:bg-[#2d2323]`}
      >
        Find creators
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Action required                                                           */
/* -------------------------------------------------------------------------- */

const ACTION_ICON = {
  submissions: {
    icon: FileCheck,
    tile: "bg-violet-400/20 text-violet-300",
  },
  applications: {
    icon: UserPlus,
    tile: "bg-amber-400/20 text-amber-300",
  },
} as const;

export function ActionRequiredCard({ items }: { items: ActionItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-(--cr-pink)/20 bg-[#2a1a1c] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Action required</h2>
        <span
          aria-label={`${items.length} items need attention`}
          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--cr-pink) px-1.5 text-[11px] font-bold text-white"
        >
          {items.length}
        </span>
      </div>

      <ul className="divide-y divide-white/5">
        {items.map((item) => {
          const { icon: Icon, tile } = ACTION_ICON[item.kind];
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 py-3 text-sm text-stone-200 no-underline transition-colors hover:text-white"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tile}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="flex-1">{item.text}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-(--cr-pink)" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Active campaigns                                                          */
/* -------------------------------------------------------------------------- */

export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-white lg:text-base">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-xs font-medium text-(--cr-pink) no-underline hover:opacity-80"
        >
          See all →
        </Link>
      )}
    </div>
  );
}

export function BrandCampaignCard({ campaign }: { campaign: BrandCampaign }) {
  const pct = Math.min(
    100,
    Math.round((campaign.spent / campaign.budget) * 100),
  );

  return (
    <Link
      href={`/brand/campaigns/${campaign.id}`}
      className={`${CARD} block p-4 no-underline transition-colors hover:bg-[#2d2323]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {campaign.title}
          </p>
          <p className="mt-0.5 text-xs text-stone-400">
            {campaign.creators} creators · {campaign.submissions} submissions
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-900">
          {campaign.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-stone-400">
          {naira(campaign.spent)}/{naira(campaign.budget)} budget
        </span>
        <span className="font-semibold text-(--cr-pink)">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${campaign.title} budget used`}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
      >
        <div
          className="h-full rounded-full bg-(--cr-pink)"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}