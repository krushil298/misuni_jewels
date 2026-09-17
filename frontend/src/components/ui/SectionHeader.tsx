import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Two-digit register index, e.g. "02". */
  index: string;
  title: string;
  /** Short line set beside the title, in the right-hand columns. */
  note?: string;
  action?: { href: string; label: string };
  className?: string;
}

/**
 * Section masthead.
 *
 * A heavy rule with the index and label sitting on it, then the title
 * hanging beneath in the left columns and an optional note in the right.
 * This replaces five visually identical eyebrow / title / "view all"
 * blocks — the repetition was a large part of why the page read as
 * generated rather than composed.
 */
export function SectionHeader({
  index,
  title,
  note,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("border-t border-ink pt-3", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="index-num text-ink">{index}</span>
        {action && (
          <Link
            href={action.href}
            className="link-rule border-b-0 text-ink-3 transition-colors duration-150 hover:text-ink"
          >
            {action.label}
            <Icon name="arrow-right" size={13} />
          </Link>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-12 md:gap-10">
        <h2 className="optical-flush font-display text-4xl leading-[0.98] text-ink text-balance md:col-span-7 md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {note && (
          <p className="max-w-sm self-end text-[0.875rem] leading-relaxed text-ink-2 text-pretty md:col-span-4 md:col-start-9">
            {note}
          </p>
        )}
      </div>
    </header>
  );
}
