import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional "see everything" link shown on the right / below. */
  action?: { href: string; label: string };
  align?: "start" | "center";
  className?: string;
}

/** Shared heading block, so every section keeps the same vertical rhythm. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  className,
}: SectionHeaderProps) {
  const centred = align === "center";

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 md:mb-12",
        centred
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn(centred ? "max-w-xl" : "max-w-lg")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-serif text-3xl leading-[1.15] text-ink text-balance md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft text-pretty">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="link-rule inline-flex shrink-0 items-center gap-2 self-start text-ink transition-colors duration-150 hover:text-brand sm:self-auto"
        >
          {action.label}
          <Icon name="arrow-right" size={14} />
        </Link>
      )}
    </div>
  );
}
