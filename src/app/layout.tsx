import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://kirklandcalc.com";
const TITLE = "Costco Membership Calculator: Is Executive Worth It?";
const DESCRIPTION =
  "Plug in your Costco spending and find out in seconds whether Gold Star or Executive Membership pays off — with the exact breakeven math, from Kirkland Corner.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Kirkland Calc",
  },
  description: DESCRIPTION,
  keywords: [
    "costco executive membership worth it",
    "costco membership calculator",
    "costco gold star vs executive",
    "costco executive membership calculator",
    "is costco executive membership worth it",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Kirkland Calc",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-kc-cream text-kc-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
