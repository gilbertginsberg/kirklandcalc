// Costco membership pricing and reward facts.
// Source: Costco.com membership terms, as provided by the site owner (Aug 2026).
export const GOLD_STAR_PRICE = 65;
export const EXECUTIVE_PRICE = 130;
export const UPGRADE_COST = EXECUTIVE_PRICE - GOLD_STAR_PRICE; // $65/yr extra for Executive
export const REWARD_RATE = 0.02;
export const REWARD_CAP = 1250; // Executive Reward maxes out here
export const REWARD_CAP_SPEND = REWARD_CAP / REWARD_RATE; // ~$62,500 in qualified spend
// The 2% reward alone breaks even against the $65 upgrade at this spend level.
export const BREAKEVEN_SPEND = UPGRADE_COST / REWARD_RATE; // $3,250/yr

// Costco gas is *typically* cheaper than the national average, but this varies a lot
// by region and week. Treat this as a rough, editable estimate, not a guarantee.
export const GAS_SAVINGS_PER_GALLON_LOW = 0.2;
export const GAS_SAVINGS_PER_GALLON_HIGH = 0.4;
export const GAS_SAVINGS_PER_GALLON_ESTIMATE =
  (GAS_SAVINGS_PER_GALLON_LOW + GAS_SAVINGS_PER_GALLON_HIGH) / 2; // $0.30/gal

export type MembershipTier = "gold_star" | "executive" | "none";

export interface CalculatorInputs {
  /** Average monthly spend on qualified Costco purchases, excluding gas. */
  monthlySpend: number;
  /** Whether the shopper buys gas at Costco. */
  buysGas: boolean;
  /** Average gallons of Costco gas purchased per month (only used if buysGas). */
  monthlyGallons: number;
  /** The shopper's current membership status. */
  currentMembership: MembershipTier;
}

export interface CalculatorResult {
  annualSpend: number;
  annualGasGallons: number;
  annualGasSavingsLow: number;
  annualGasSavingsHigh: number;
  annualGasSavingsEstimate: number;
  executiveReward: number;
  /** Executive reward minus the $65 extra Executive costs over Gold Star. */
  netExecutiveGain: number;
  /** Whichever tier maximizes value based on the 2% reward math. */
  recommendedTier: "gold_star" | "executive";
  /** Additional annual spend needed to make Executive break even, if any. */
  spendToBreakeven: number;
  /** Total estimated annual value of Gold Star (gas savings only). */
  goldStarValue: number;
  /** Total estimated annual value of Executive (reward + gas savings). */
  executiveValue: number;
}

export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const monthlySpend = Math.max(0, inputs.monthlySpend || 0);
  const monthlyGallons = inputs.buysGas ? Math.max(0, inputs.monthlyGallons || 0) : 0;

  const annualSpend = monthlySpend * 12;
  const annualGasGallons = monthlyGallons * 12;

  const annualGasSavingsLow = annualGasGallons * GAS_SAVINGS_PER_GALLON_LOW;
  const annualGasSavingsHigh = annualGasGallons * GAS_SAVINGS_PER_GALLON_HIGH;
  const annualGasSavingsEstimate = annualGasGallons * GAS_SAVINGS_PER_GALLON_ESTIMATE;

  const executiveReward = Math.min(annualSpend * REWARD_RATE, REWARD_CAP);
  const netExecutiveGain = executiveReward - UPGRADE_COST;

  const recommendedTier: "gold_star" | "executive" =
    netExecutiveGain > 0 ? "executive" : "gold_star";

  const spendToBreakeven = Math.max(0, BREAKEVEN_SPEND - annualSpend);

  const goldStarValue = annualGasSavingsEstimate - GOLD_STAR_PRICE;
  const executiveValue = annualGasSavingsEstimate + executiveReward - EXECUTIVE_PRICE;

  return {
    annualSpend,
    annualGasGallons,
    annualGasSavingsLow,
    annualGasSavingsHigh,
    annualGasSavingsEstimate,
    executiveReward,
    netExecutiveGain,
    recommendedTier,
    spendToBreakeven,
    goldStarValue,
    executiveValue,
  };
}

export function formatCurrency(value: number, opts: { cents?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  }).format(value);
}
