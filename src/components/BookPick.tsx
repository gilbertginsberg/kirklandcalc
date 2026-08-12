const BOOK_URL = "https://amzn.to/461Plfu";

export default function BookPick() {
  return (
    <section className="rounded-2xl border border-kc-ink/10 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="font-display text-lg uppercase tracking-wide text-kc-blue">
        📚 If you love Costco this much
      </h3>
      <p className="mt-2 text-sm text-kc-ink/70">
        <em>The Joy of Costco: A Treasure Hunt from A to Z</em> by David &amp;
        Susan Schwartz is a fun, illustrated love letter to warehouse
        shopping.
      </p>
      <a
        href={BOOK_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-3 inline-block font-semibold text-kc-red hover:underline"
      >
        Find it on Amazon →
      </a>
      <p className="mt-2 text-xs text-kc-ink/40">
        Affiliate link: as an Amazon Associate, Kirkland Corner may earn from
        qualifying purchases.
      </p>
    </section>
  );
}
