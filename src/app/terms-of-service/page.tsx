import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Kirkland Calc.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" updated="August 12, 2026">
      <p>
        By using Kirkland Calc (&ldquo;the site&rdquo;), you agree to the terms
        below. If you don&rsquo;t agree, please don&rsquo;t use the site.
      </p>

      <h2>What this is</h2>
      <p>
        Kirkland Calc is a free tool that estimates whether a Costco Gold Star
        or Executive Membership is likely to pay off, based on numbers you
        enter. It&rsquo;s published by Kirkland Corner as a companion to the
        Kirkland Corner newsletter.
      </p>

      <h2>Estimates only</h2>
      <p>
        The results shown are estimates for informational purposes only, not
        financial or purchasing advice. Actual membership pricing, reward
        rates, exclusions, and caps are set by Costco Wholesale Corporation
        and can change at any time. Kirkland Calc is an independent tool and
        is not affiliated with, endorsed by, or sponsored by Costco Wholesale
        Corporation. Always confirm current terms at{" "}
        <a href="https://www.costco.com/membership.html" target="_blank" rel="noopener noreferrer">
          Costco.com
        </a>{" "}
        before making a decision.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site embeds a newsletter signup form from Substack and displays
        ads served by Google AdSense. Your use of those features is also
        subject to Substack&rsquo;s and Google&rsquo;s own terms and privacy
        policies. We aren&rsquo;t responsible for the content, availability, or
        practices of those third-party services.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&rsquo;t use the site to do anything unlawful, attempt to disrupt
        or reverse engineer it, or scrape and republish its content without
        permission.
      </p>

      <h2>No warranties</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
        without warranties of any kind, express or implied, including
        accuracy, reliability, or fitness for a particular purpose.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Kirkland Corner and Kirkland
        Calc are not liable for any indirect, incidental, or consequential
        damages arising from your use of the site or reliance on its
        estimates.
      </p>

      <h2>Changes</h2>
      <p>
        We may update the site or these terms at any time. Continued use of
        the site after changes are posted means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:kirklandcorner00@gmail.com">kirklandcorner00@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
