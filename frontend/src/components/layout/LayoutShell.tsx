"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

/**
 * Conditionally renders the customer storefront chrome (Navbar, Footer, etc.)
 * vs. a bare shell for admin routes.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Admin routes get a bare shell — the admin layout handles its own chrome
  if (isAdmin) {
    return <>{children}</>;
  }

  // Customer routes get full storefront chrome
  return (
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
  );
}
