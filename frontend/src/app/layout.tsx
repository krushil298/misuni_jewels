import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Instrument Serif for display. High-contrast and genuinely editorial, with
 * a real italic — it replaces Cormorant Garamond, which is the default
 * "luxury" Google font and reads as a template on sight.
 */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/**
 * Inter Tight for everything else. Tighter than Inter, with proper tabular
 * figures — the reference codes, carat weights and price columns line up.
 */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MISUNI JEWELS — Natural Diamond Jewellery, Mumbai",
    template: "%s | MISUNI JEWELS",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "diamond jewellery Mumbai",
    "BKC jewellery",
    "natural diamonds",
    "gold jewellery",
    "rose gold",
    "white gold",
    "solitaire rings",
    "BIS hallmarked",
    "IGI certified",
    "bespoke jewellery India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "MISUNI JEWELS — Natural Diamond Jewellery, Mumbai",
    description: SITE_DESCRIPTION,
    images: [{ url: "/brand/full.png", width: 887, height: 789, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MISUNI JEWELS — Natural Diamond Jewellery, Mumbai",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/** Ivory ground, so the browser chrome on mobile matches the page. */
export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${instrument.variable} ${interTight.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-paper text-ink antialiased">
        <LayoutShell>{children}</LayoutShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
