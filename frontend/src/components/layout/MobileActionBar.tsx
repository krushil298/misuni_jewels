"use client";

import { Icon } from "@/components/ui/Icon";
import { generalEnquiryLink } from "@/lib/whatsapp";

/**
 * Fixed bottom bar, phones only.
 *
 * Most visitors arrive on a phone, so the one action that matters for a
 * catalogue with no checkout stays permanently in thumb reach. A floating
 * circular bubble was covering content; a full-width bar does not.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-rule-dark bg-forest pb-safe md:hidden">
      <div className="flex items-stretch">
        <a
          href="#pieces"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-[0.6875rem] uppercase tracking-[0.18em] text-cream"
        >
          <Icon name="diamond" size={16} className="text-gold" />
          Collection
        </a>
        <a
          href={generalEnquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-whatsapp py-3.5 text-[0.6875rem] uppercase tracking-[0.18em] text-white"
        >
          <Icon name="whatsapp" size={16} />
          Enquire
        </a>
      </div>
    </div>
  );
}
