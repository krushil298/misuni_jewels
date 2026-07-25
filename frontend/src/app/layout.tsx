import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "MISUNI JEWELS — Real Diamond Jewellery in Gold",
    template: "%s | MISUNI JEWELS",
  },
  description:
    "Real diamond jewellery crafted in gold, white gold & rose gold. Purity. Integrity. Brilliance. Shop necklaces, rings, earrings, bracelets & bangles.",
  keywords: [
    "diamond jewellery",
    "gold jewellery",
    "rose gold",
    "white gold",
    "necklaces",
    "rings",
    "earrings",
    "bracelets",
    "bangles",
    "BIS hallmarked",
    "IGI certified",
    "Indian jewellery",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MISUNI JEWELS",
    title: "MISUNI JEWELS — Real Diamond Jewellery in Gold",
    description:
      "Real diamond jewellery crafted in gold, white gold & rose gold. Purity. Integrity. Brilliance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar
              message="Complimentary shipping on all orders"
              link={{ href: "/collections", label: "Shop Now" }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
