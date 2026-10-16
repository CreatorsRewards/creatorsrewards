import { Banknote, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/animation/AnimatedComponents";
import type { ShowcasePayout } from "@/lib/api/types";

export function PayoutCard({
  data,
  active,
}: {
  data: ShowcasePayout;
  active: boolean;
}) {
  return (
    <SpotlightCard
      className={`p-5 sm:p-6 rounded-3xl bg-cr-blush border shadow-xl backdrop-blur-md ${
        active
          ? "border-emerald-500 ring-2 ring-cr-yellow"
          : "border-cr-dark/10"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          aria-hidden="true"
          className="w-10 h-10 rounded-2xl bg-cr-yellow border border-emerald-300 flex items-center justify-center text-emerald-800"
        >
          <Banknote className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
          <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Auto-Settled
        </span>
      </div>

      <div>
        <div className="text-xs font-semibold text-cr-dark/70">
          Instant Creator Payout
        </div>
        <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight my-1">
          {data.amount}
        </div>
        <div className="text-xs text-cr-dark/70 font-medium">
          {data.destination}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-cr-yellow/60 border border-emerald-300/60 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-bold text-emerald-950">
            Direct Settlement Rail
          </div>
          <div className="text-sm font-bold">{data.rail}</div>
        </div>
        <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
          ₦ NGN
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-cr-dark/10 flex items-center justify-between text-xs font-bold">
        <span>Brand ROAS</span>
        <span className="text-emerald-700 font-bold text-sm">{data.roas}</span>
      </div>
    </SpotlightCard>
  );
}
