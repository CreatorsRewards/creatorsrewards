import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types & formatting                                                        */
/* -------------------------------------------------------------------------- */

export interface EarningsSummary {
  total: number;
  /** Change vs the previous period, in percent. Negative shows a red arrow. */
  changePct: number;
  views: number;
  campaigns: number;
  today: number;
}

export interface ActiveCampaign {
  id: string;
  title: string;
  brand: string;
  status: string;
  views: number;
  targetViews: number;
}

export interface MatchedCampaign {
  id: string;
  title: string;
  brand: string;
  matchPct: number;
  tags: string[];
  reward: string;
  duration: string;
  target: string;
}

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
const compact = (n: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

const CARD = "rounded-2xl border border-black/5 bg-white p-4 shadow-sm";

/* -------------------------------------------------------------------------- */
/*  Earnings                                                                  */
/* -------------------------------------------------------------------------- */

export function EarningsCard({
  data,
  className = "",
}: {
  data: EarningsSummary;
  className?: string;
}) {
  const up = data.changePct >= 0;
  const stats = [
    { value: compact(data.views), label: "Views" },
    { value: String(data.campaigns), label: "Campaigns" },
    { value: `₦${compact(data.today)}`, label: "Today" },
  ];

  return (
    <section
      className={`rounded-3xl bg-stone-900 p-6 text-white lg:p-8 ${className}`}
    >
      <p className="text-sm text-stone-400">Total Earnings</p>
      <p className="mt-1 font-(family-name:--font-display) text-4xl font-bold lg:text-5xl">
        {naira(data.total)}
      </p>
      <span
        className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          up
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-red-500/15 text-red-400"
        }`}
      >
        {up ? "↑" : "↓"} {Math.abs(data.changePct)}%
      </span>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-lg font-semibold lg:text-xl">{s.value}</p>
            <p className="text-xs text-stone-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Verification banner                                                       */
/* -------------------------------------------------------------------------- */

export function VerificationBanner({
  href = "/creator/profile",
}: {
  href?: string;
}) {
  return (
    <section className="flex items-center justify-between gap-4 rounded-2xl bg-orange-100 px-4 py-3.5">
      <div className="flex items-start gap-2.5">
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <div>
          <p className="text-sm font-semibold text-stone-900">
            Complete verification
          </p>
          <p className="text-xs text-stone-600">
            Unlock premium brand campaigns
          </p>
        </div>
      </div>
      <Link
        href={href}
        className="shrink-0 text-sm font-semibold text-(--cr-pink) no-underline hover:opacity-80"
      >
        Fix →
      </Link>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Campaign icon tile                                                        */
/* -------------------------------------------------------------------------- */

function CampaignIcon() {
  // Swap for the brand's logo once campaigns have one
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--cr-pink) text-white">
      <Sparkles className="h-5 w-5" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section header                                                            */
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
      <h2 className="text-sm font-semibold text-stone-900 lg:text-base">
        {title}
      </h2>
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

/* -------------------------------------------------------------------------- */
/*  Active campaign (progress)                                                */
/* -------------------------------------------------------------------------- */

export function ActiveCampaignCard({ campaign }: { campaign: ActiveCampaign }) {
  const pct = Math.min(
    100,
    Math.round((campaign.views / campaign.targetViews) * 100),
  );

  return (
    <Link
      href={`/creator/campaigns/${campaign.id}`}
      className={`${CARD} block no-underline transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <CampaignIcon />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-stone-900">
            {campaign.title}
          </p>
          <p className="text-xs text-stone-500">{campaign.brand}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          {campaign.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-stone-500">
          {campaign.views.toLocaleString("en-NG")} /{" "}
          {campaign.targetViews.toLocaleString("en-NG")} views
        </span>
        <span className="font-semibold text-(--cr-pink)">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${campaign.title} progress`}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200"
      >
        <div
          className="h-full rounded-full bg-(--cr-pink)"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recommended campaign                                                      */
/* -------------------------------------------------------------------------- */

export function CampaignMatchCard({
  campaign,
}: {
  campaign: MatchedCampaign;
}) {
  const details = [
    { label: "Reward", value: campaign.reward },
    { label: "Duration", value: campaign.duration },
    { label: "Target", value: campaign.target },
  ];

  return (
    <Link
      href={`/creator/campaigns/${campaign.id}`}
      className={`${CARD} relative block p-5 no-underline transition-shadow hover:shadow-md`}
    >
      <span className="absolute -top-3 right-4 rounded-full bg-(--cr-pink) px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        {campaign.matchPct}% match
      </span>

      <div className="flex items-center gap-3">
        <CampaignIcon />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-stone-900">
            {campaign.title}
          </p>
          <p className="text-xs text-stone-500">{campaign.brand}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {campaign.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/15 px-3 py-1 text-xs text-stone-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-black/5 pt-4">
        {details.map((d) => (
          <div key={d.label}>
            <p className="text-xs text-stone-500">{d.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-stone-900">
              {d.value}
            </p>
          </div>
        ))}
      </div>
    </Link>
  );
}