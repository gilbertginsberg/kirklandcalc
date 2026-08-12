import Link from "next/link";

const NEWSLETTER_URL = "https://kirklandcorner.substack.com";

export default function Header() {
  return (
    <header className="bg-kc-blue text-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl uppercase tracking-wide text-white">
            Kirkland Calc
          </span>
          <span className="text-xs text-white/60">by Kirkland Corner</span>
        </Link>
        <a
          href={NEWSLETTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Read the newsletter →
        </a>
      </div>
    </header>
  );
}
