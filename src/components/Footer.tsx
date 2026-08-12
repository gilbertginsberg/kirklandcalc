import Link from "next/link";

const NEWSLETTER_URL = "https://kirklandcorner.substack.com";
const CONTACT_EMAIL = "kirklandcorner00@gmail.com";

export default function Footer() {
  return (
    <footer className="border-t border-kc-ink/10 bg-kc-bg">
      <div className="mx-auto max-w-3xl px-5 py-10 text-sm text-kc-ink/70">
        <p className="mb-4">
          <strong className="text-kc-ink">Disclaimer:</strong> Kirkland Calc is an
          independent, unofficial estimator and is not affiliated with or
          endorsed by Costco Wholesale Corporation. Membership prices and the
          2% Executive Reward rate/cap are current as of publication but can
          change, so always confirm details at{" "}
          <a
            href="https://www.costco.com/membership.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-kc-red"
          >
            Costco.com
          </a>
          . The Executive Reward applies to qualified Costco, Costco.com, and
          Costco Travel purchases only. Gas, tobacco, and several other
          categories don&rsquo;t count toward it at all, so your actual
          reward may vary from this estimate. Gas savings shown here are a
          rough regional estimate, not a guarantee.
        </p>
        <p>
          Made with love (and a rotisserie chicken) by{" "}
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-kc-red hover:underline"
          >
            Kirkland Corner
          </a>
          .
        </p>
        <p className="mt-3">
          Got feedback or a suggestion?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-kc-red hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <div className="mt-4 flex gap-4 border-t border-kc-ink/10 pt-4 text-xs">
          <Link href="/privacy-policy" className="hover:text-kc-red hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-kc-red hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
