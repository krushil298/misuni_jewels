"use client";

import { usePathname } from "next/navigation";
import { SelectionProvider } from "@/context/SelectionContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

/**
 * Storefront chrome. Admin routes render bare — they bring their own shell.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <SelectionProvider>
      <span id="top" />
      <Navbar />
      {/* Bottom padding clears the fixed mobile action bar. */}
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
      <MobileActionBar />
    </SelectionProvider>
  );
}
