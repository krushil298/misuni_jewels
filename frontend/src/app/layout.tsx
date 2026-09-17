import type { Metadata, Viewport } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
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
  themeColor: "#fbfaf8",
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
      className={`${montserrat.variable} ${cormorant.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-canvas text-ink antialiased">
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
