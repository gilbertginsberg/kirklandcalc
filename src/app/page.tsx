import Calculator from "@/components/Calculator";
import SubstackEmbed from "@/components/SubstackEmbed";
import { BREAKEVEN_SPEND, EXECUTIVE_PRICE, GOLD_STAR_PRICE, REWARD_CAP_SPEND, UPGRADE_COST, formatCurrency } from "@/lib/calculator";

const faqs = [
  {
    question: "Is Costco Executive Membership worth it?",
    answer:
      "It depends entirely on how much you spend at Costco each year. Executive costs $65 more than Gold Star and pays out 2% back (capped at $1,250/year) on qualified purchases. Once your annual qualified spend crosses about $3,250, the 2% reward covers that extra $65 — anything beyond that is money in your pocket. Below that spend level, Gold Star is the better deal.",
  },
  {
    question: "What is the Costco Executive Membership breakeven point?",
    answer:
      `Roughly ${formatCurrency(BREAKEVEN_SPEND)} in annual qualified spending. At that level, the 2% Executive Reward (about ${formatCurrency(BREAKEVEN_SPEND * 0.02)}) exactly offsets the ${formatCurrency(UPGRADE_COST)} price difference between Gold Star and Executive.`,
  },
  {
    question: "How much can you earn back with the Executive Reward?",
    answer: `The 2% reward is capped at ${formatCurrency(REWARD_CAP_SPEND * 0.02)} per year, which means it maxes out around ${formatCurrency(REWARD_CAP_SPEND)} in qualified annual spending. Spend beyond that doesn't earn additional reward.`,
  },
  {
    question: "Does Costco gas count toward the 2% reward?",
    answer:
      "The Executive Reward applies to qualified Costco, Costco.com, and Costco Travel purchases — but gas and certain other purchases may be excluded or capped differently. Don't assume a blanket 2% on every dollar you spend, including at the pump.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-kc-navy px-5 pb-14 pt-10 text-white sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-kc-gold">
            Kirkland Calc
          </p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-tight tracking-wide sm:text-5xl">
            Is Costco Executive Membership worth it?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/75 sm:text-lg">
            Answer three quick questions and we&rsquo;ll tell you — with the
            exact math — whether Gold Star or Executive is the right call for
            your shopping cart.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-3xl px-5 pb-16 sm:-mt-12">
        <div className="flex flex-col gap-6">
          <Calculator />
          <SubstackEmbed />
        </div>
      </section>

      <section className="border-t border-kc-ink/10 bg-white px-5 py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl uppercase tracking-wide text-kc-navy">
            Costco Executive vs. Gold Star, explained
          </h2>
          <div className="mt-4 space-y-4 text-kc-ink/80">
            <p>
              Costco offers two membership tiers: Gold Star ({formatCurrency(GOLD_STAR_PRICE)}/year)
              and Executive ({formatCurrency(EXECUTIVE_PRICE)}/year). Executive includes everything
              Gold Star does, plus an annual 2% reward — officially called the
              Executive Reward — on qualified Costco, Costco.com, and Costco
              Travel purchases, capped at {formatCurrency(REWARD_CAP_SPEND * 0.02)} per year.
            </p>
            <p>
              Since Executive costs {formatCurrency(UPGRADE_COST)} more than Gold Star, the
              question of &ldquo;is Costco Executive Membership worth it&rdquo;
              really comes down to a single number: how much you spend at
              Costco in a year. The 2% reward needs to generate at least{" "}
              {formatCurrency(UPGRADE_COST)} to cancel out the higher membership fee — and
              since 2% of {formatCurrency(BREAKEVEN_SPEND)} is {formatCurrency(BREAKEVEN_SPEND * 0.02)}, that&rsquo;s
              the breakeven point. Spend more than that on qualified purchases
              and Executive comes out ahead; spend less, and Gold Star is the
              better value.
            </p>
            <p>
              A few caveats worth keeping in mind: the reward applies to{" "}
              <em>qualified</em> purchases only, and some categories — including
              gas in certain cases — may be excluded or capped differently than
              the standard 2%. It&rsquo;s also worth remembering that the
              Executive Reward isn&rsquo;t cash in hand right away — it&rsquo;s
              issued once a year and typically redeemed in-warehouse or applied
              toward your next renewal. And if you shop with a household card
              or split purchases across a family, your combined spend (not just
              your own) is often what determines whether the upgrade pencils
              out.
            </p>
            <p>
              The calculator above does this math for you automatically,
              factoring in your actual monthly spend, whether you buy gas at
              Costco, and your current membership status — so you don&rsquo;t
              have to guess.
            </p>
          </div>

          <h2 className="mt-10 font-display text-2xl uppercase tracking-wide text-kc-navy">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-kc-ink">{faq.question}</h3>
                <p className="mt-1 text-kc-ink/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
