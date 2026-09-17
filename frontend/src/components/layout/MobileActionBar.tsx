"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Fixed bottom bar, phones only.
 *
 * Most visitors arrive on a phone, so the four things they actually do —
 * browse, search, review what they saved, and message the atelier — are
 * kept permanently within thumb reach instead of behind the hamburger.
 * A floating WhatsApp bubble used to cover content; this replaces it.
 */

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/collections", label: "Browse", icon: "diamond" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/selection", label: "Saved", icon: "heart" },
];

export function MobileActionBar() {
  const pathname = usePathname();
  const { count, isHydrated } = useSelection();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-sticky border-t border-hairline bg-canvas/95 pb-safe backdrop-blur-md md:hidden"
    >
      <ul className="flex items-stretch">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          const showBadge =
            tab.href === "/selection" && isHydrated && count > 0;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-14 flex-col items-center justify-center gap-1 transition-colors duration-150",
                  active ? "text-brand" : "text-ink-muted"
                )}
              >
                <span className="relative">
                  <Icon
                    name={showBadge ? "heart-filled" : tab.icon}
                    size={19}
                  />
                  {showBadge && (
                    <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-brand text-[0.5rem] font-semibold tabular-nums text-white">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </span>
                <span className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.12em]">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="flex-1">
          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-col items-center justify-center gap-1 bg-whatsapp text-white"
          >
            <Icon name="whatsapp" size={19} />
            <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.12em]">
              Enquire
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
