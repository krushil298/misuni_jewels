import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

/** Cormorant Garamond for display — its italic carries the second line of
 *  every heading, which is the signature move of this style. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Jost for tracked caps and UI — a geometric sans whose proportions echo
 *  the Misuni wordmark. */
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
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

/** Forest ground, so mobile browser chrome matches the header. */
export const viewport: Viewport = {
  themeColor: "#0e2a22",
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
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-cream text-ink antialiased">
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
