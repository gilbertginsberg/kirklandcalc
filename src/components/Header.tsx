import Link from "next/link";

const NEWSLETTER_URL = "https://kirklandcorner.substack.com";
const INSTAGRAM_URL = "https://www.instagram.com/kirklandcorner";

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
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kirkland Corner on Instagram"
            className="text-white/80 transition-colors hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Read the newsletter →
          </a>
        </div>
      </div>
    </header>
  );
}
