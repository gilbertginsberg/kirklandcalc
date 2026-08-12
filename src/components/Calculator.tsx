"use client";

import { useMemo, useState } from "react";
import {
  BREAKEVEN_SPEND,
  EXECUTIVE_PRICE,
  GOLD_STAR_PRICE,
  REWARD_CAP,
  UPGRADE_COST,
  calculate,
  formatCurrency,
  type MembershipTier,
} from "@/lib/calculator";
import ShareButton from "./ShareButton";

const MEMBERSHIP_OPTIONS: { value: MembershipTier; label: string }[] = [
  { value: "none", label: "Not a member" },
  { value: "gold_star", label: "Gold Star" },
  { value: "executive", label: "Executive" },
];

const ROTISSERIE_CHICKEN_PRICE = 4.99;

function buildVerdict(
  recommendedTier: "gold_star" | "executive",
  currentMembership: MembershipTier,
  netExecutiveGain: number,
  spendToBreakeven: number,
) {
  const gain = formatCurrency(Math.abs(netExecutiveGain));
  const shortfall = formatCurrency(spendToBreakeven);

  if (recommendedTier === "executive") {
    if (currentMembership === "executive") {
      return {
        emoji: "✅",
        headline: `You're in the right tier — Executive is paying for itself.`,
        detail: `You're netting ${gain} more per year than the $${UPGRADE_COST} upgrade costs.`,
      };
    }
    if (currentMembership === "gold_star") {
      return {
        emoji: "🚀",
        headline: `Upgrade to Executive — it pays for itself.`,
        detail: `The 2% reward would earn back ${gain} more than the $${UPGRADE_COST} upgrade costs.`,
      };
    }
    return {
      emoji: "🚀",
      headline: `If you join, go straight to Executive.`,
      detail: `The 2% reward alone would cover the extra $${UPGRADE_COST} over Gold Star, with ${gain} left over.`,
    };
  }

  if (currentMembership === "executive") {
    return {
      emoji: "🤔",
      headline: `You might be overpaying for Executive.`,
      detail: `Based on your spend, Gold Star would save you about ${gain}/year — the 2% reward isn't covering the extra $${UPGRADE_COST}.`,
    };
  }
  if (currentMembership === "gold_star") {
    return {
      emoji: "✅",
      headline: `Gold Star is enough for you — for now.`,
      detail:
        spendToBreakeven > 0
          ? `You'd need to spend about ${shortfall} more per year for Executive to break even.`
          : `You're right at the breakeven point — worth revisiting if your spending grows.`,
    };
  }
  return {
    emoji: "🛒",
    headline: `If you join, Gold Star is the smart pick.`,
    detail: `You'd need to spend about ${formatCurrency(BREAKEVEN_SPEND)}/year at Costco before Executive's 2% reward is worth the extra $${UPGRADE_COST}.`,
  };
}

export default function Calculator() {
  const [monthlySpend, setMonthlySpend] = useState(300);
  const [buysGas, setBuysGas] = useState(true);
  const [monthlyGallons, setMonthlyGallons] = useState(20);
  const [currentMembership, setCurrentMembership] = useState<MembershipTier>("gold_star");

  const result = useMemo(
    () => calculate({ monthlySpend, buysGas, monthlyGallons, currentMembership }),
    [monthlySpend, buysGas, monthlyGallons, currentMembership],
  );

  const verdict = buildVerdict(
    result.recommendedTier,
    currentMembership,
    result.netExecutiveGain,
    result.spendToBreakeven,
  );

  const chickenCount = Math.max(0, Math.round(result.netExecutiveGain / ROTISSERIE_CHICKEN_PRICE));

  const shareText =
    result.recommendedTier === "executive"
      ? `I just found out Executive Membership would earn me ${formatCurrency(result.netExecutiveGain)} more than it costs. Check your Costco math:`
      : `I just found out Gold Star is the right call for me — Executive isn't worth the upgrade yet. Check your Costco math:`;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-kc-ink/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="monthlySpend" className="block font-display text-sm uppercase tracking-wide text-kc-navy">
              About how much do you spend at Costco per month? (excluding gas)
            </label>
            <div className="mt-3 flex items-center gap-4">
              <input
                id="monthlySpend"
                type="range"
                min={0}
                max={2000}
                step={10}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="h-2 w-full flex-1 cursor-pointer appearance-none rounded-full bg-kc-navy/15 accent-kc-red"
              />
              <div className="relative w-28 shrink-0">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-kc-ink/50">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  aria-label="Monthly spend in dollars"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-kc-ink/15 py-2 pl-6 pr-2 text-right font-semibold text-kc-ink focus:border-kc-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="block font-display text-sm uppercase tracking-wide text-kc-navy">
              Do you buy gas at Costco?
            </span>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setBuysGas(true)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  buysGas
                    ? "bg-kc-red text-white"
                    : "bg-kc-navy/5 text-kc-ink/60 hover:bg-kc-navy/10"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setBuysGas(false)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  !buysGas
                    ? "bg-kc-red text-white"
                    : "bg-kc-navy/5 text-kc-ink/60 hover:bg-kc-navy/10"
                }`}
              >
                No
              </button>
            </div>

            {buysGas && (
              <div className="mt-4">
                <label htmlFor="monthlyGallons" className="block text-sm text-kc-ink/70">
                  About how many gallons per month?
                </label>
                <input
                  id="monthlyGallons"
                  type="number"
                  min={0}
                  value={monthlyGallons}
                  onChange={(e) => setMonthlyGallons(Number(e.target.value) || 0)}
                  className="mt-2 w-32 rounded-lg border border-kc-ink/15 px-3 py-2 font-semibold text-kc-ink focus:border-kc-red focus:outline-none"
                />
              </div>
            )}
          </div>

          <div>
            <span className="block font-display text-sm uppercase tracking-wide text-kc-navy">
              Are you currently a member?
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {MEMBERSHIP_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCurrentMembership(opt.value)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    currentMembership === opt.value
                      ? "bg-kc-navy text-white"
                      : "bg-kc-navy/5 text-kc-ink/60 hover:bg-kc-navy/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-live="polite"
        className="rounded-2xl border-2 border-kc-navy bg-kc-navy p-5 text-white shadow-sm sm:p-7"
      >
        <p className="text-3xl leading-tight sm:text-4xl">{verdict.emoji}</p>
        <h2 className="mt-2 font-display text-2xl uppercase leading-snug tracking-wide sm:text-3xl">
          {verdict.headline}
        </h2>
        <p className="mt-2 text-white/80">{verdict.detail}</p>

        {result.recommendedTier === "executive" && chickenCount > 0 && (
          <p className="mt-3 text-sm text-kc-gold">
            🐔 That&rsquo;s roughly {chickenCount} rotisserie chicken{chickenCount === 1 ? "" : "s"} worth of found money (at $
            {ROTISSERIE_CHICKEN_PRICE}/bird).
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <ShareButton text={shareText} url="https://kirklandcalc.com" />
        </div>

        <div className="mt-6 border-t border-white/15 pt-5">
          <h3 className="font-display text-sm uppercase tracking-wide text-kc-gold">
            Show me the math
          </h3>
          <dl className="mt-3 grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-2 sm:block">
              <dt className="text-white/60">Annual spend (excl. gas)</dt>
              <dd className="font-semibold">{formatCurrency(result.annualSpend)}</dd>
            </div>
            <div className="flex justify-between gap-2 sm:block">
              <dt className="text-white/60">Executive Reward (2%, capped at {formatCurrency(REWARD_CAP)})</dt>
              <dd className="font-semibold">{formatCurrency(result.executiveReward)}</dd>
            </div>
            <div className="flex justify-between gap-2 sm:block">
              <dt className="text-white/60">Extra cost of Executive vs. Gold Star</dt>
              <dd className="font-semibold">{formatCurrency(UPGRADE_COST)}</dd>
            </div>
            <div className="flex justify-between gap-2 sm:block">
              <dt className="text-white/60">Net gain from upgrading</dt>
              <dd className={`font-semibold ${result.netExecutiveGain >= 0 ? "text-kc-gold" : "text-white"}`}>
                {result.netExecutiveGain >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(result.netExecutiveGain))}
              </dd>
            </div>
            {buysGas && (
              <div className="flex justify-between gap-2 sm:block">
                <dt className="text-white/60">Est. annual gas savings*</dt>
                <dd className="font-semibold">
                  {formatCurrency(result.annualGasSavingsLow)}–{formatCurrency(result.annualGasSavingsHigh)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-2 sm:block">
              <dt className="text-white/60">Breakeven spend for Executive</dt>
              <dd className="font-semibold">{formatCurrency(BREAKEVEN_SPEND)}/yr</dd>
            </div>
          </dl>
          {buysGas && (
            <p className="mt-3 text-xs text-white/50">
              *Estimate only — Costco gas is typically $0.20–$0.40/gal cheaper
              than the national average, but this varies by region and week.
              Gas may also be excluded or capped differently under the 2%
              Executive Reward.
            </p>
          )}
          <p className="mt-2 text-xs text-white/50">
            Gold Star: {formatCurrency(GOLD_STAR_PRICE)}/yr · Executive:{" "}
            {formatCurrency(EXECUTIVE_PRICE)}/yr. Math assumes qualified
            purchases only — see disclaimer below.
          </p>
        </div>
      </section>
    </div>
  );
}
