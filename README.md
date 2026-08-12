# Kirkland Calc

Calculator that tells you if Costco Executive Membership is worth the upgrade, built as a lead-gen tool for the Kirkland Corner newsletter.

**Live demo:** _TODO: add production URL once deployed (e.g. https://kirklandcalc.com)_

**Screenshot:**

_TODO: add a screenshot or GIF of the calculator here, e.g._
`![Kirkland Calc screenshot](./docs/screenshot.png)`

## Overview

Kirkland Calc is a small, shareable web tool that answers one question:
**"Should I have Costco Gold Star or Executive Membership?"**

Visitors enter their monthly Costco spend, whether they buy gas there, and
their current membership tier. The tool instantly shows whether upgrading to
Executive pays for itself (via the 2% Executive Reward), with the math shown
transparently. It exists as a lead-gen funnel for the
[Kirkland Corner](https://kirklandcorner.substack.com) newsletter. Every
visitor who gets a result is invited to subscribe.

## Tech stack

- **[Next.js](https://nextjs.org)** (App Router, TypeScript): server-rendered for SEO, static where possible
- **[Tailwind CSS v4](https://tailwindcss.com)**: styling
- **`next/og`**: dynamically generated Open Graph share image (`src/app/opengraph-image.tsx`)
- No backend / database. All calculations run client-side; email capture is handled entirely by the embedded Substack form
- Deploy target: **Vercel** (or Netlify)

## Getting started

```bash
# clone
git clone https://github.com/gilbertginsberg/kirklandcalc.git
cd kirklandcalc

# install
npm install

# run the dev server
npm run dev
# → http://localhost:3000

# type-check + lint
npm run lint

# production build
npm run build
npm run start
```

No environment variables or API keys are required. This is a fully static,
client-side calculator with a public Substack embed.

## Project structure

```
src/
  app/
    page.tsx              # Home page: hero, calculator, explainer/FAQ content (SEO copy)
    layout.tsx             # Root layout, fonts, global <head> metadata
    globals.css             # Tailwind import + brand color tokens
    opengraph-image.tsx     # Dynamically generated OG/Twitter share image
    robots.ts / sitemap.ts # SEO basics
  components/
    Calculator.tsx          # The interactive calculator (inputs + live results)
    ShareButton.tsx          # "Share your result" button (Web Share API + clipboard fallback)
    SubstackEmbed.tsx        # Branded card wrapping the Kirkland Corner Substack embed
    Header.tsx / Footer.tsx  # Site chrome + legal/accuracy disclaimer
  lib/
    calculator.ts            # Pure functions: all ROI/breakeven math, no React/UI code
```

## Calculation logic

All membership facts and math live in `src/lib/calculator.ts`.

**Inputs:** monthly Costco spend (excluding gas), whether the shopper buys
Costco gas (and how many gallons/month), and current membership tier.

**Core facts:**

| | Gold Star | Executive |
|---|---|---|
| Annual price | $65 | $130 |
| Reward | (none) | 2% back on qualified purchases, capped at $1,250/yr |

- `UPGRADE_COST` = $130 − $65 = **$65**, the extra cost of Executive over Gold Star
- `executiveReward = min(annualSpend × 2%, $1,250)`
- `netExecutiveGain = executiveReward − UPGRADE_COST`, positive means Executive pays for itself
- **Breakeven spend** = `UPGRADE_COST / 2%` ≈ **$3,250/year**, the annual qualified spend at which the 2% reward alone covers the $65 upgrade
- **Reward cap spend** ≈ **$62,500/year**, spend beyond this earns no additional reward
- **Gas savings** are estimated separately (not counted toward the 2% reward, since gas may be excluded/capped differently) using a configurable $0.20 to $0.40/gallon estimate vs. national average pricing. This is shown as a rough estimate, not a guarantee, and does not factor into the Gold Star vs. Executive recommendation, only into the "is being a member worth it at all" framing.

The verdict shown to the user is derived from `recommendedTier`
(`netExecutiveGain > 0 ? "executive" : "gold_star"`) combined with the
visitor's stated current membership, to produce copy like "upgrade", "you're
in the right tier", or "you might be overpaying."

See the inline comments in `src/lib/calculator.ts` for the exact formulas.

## Deployment

Deployed via **Vercel** (recommended) or **Netlify**, either will auto-detect
the Next.js app with zero config.

```bash
# Vercel CLI
npx vercel        # preview deploy
npx vercel --prod # production deploy
```

Or connect the GitHub repo directly in the Vercel/Netlify dashboard for
automatic deploys on push to `main`.

## Configuration

No environment variables are required for v1. If regional gas pricing data or
analytics (e.g. Plausible) are added later, document the required env vars
here.

## License

MIT

## Credits

Built for [Kirkland Corner](https://kirklandcorner.substack.com): Costco
deals, hacks, and hot takes, straight to your inbox.
