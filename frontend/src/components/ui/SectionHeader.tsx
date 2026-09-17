import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  /** First line, set roman. */
  title: string;
  /** Second line, set italic — the signature of this style. */
  titleItalic?: string;
  description?: string;
  /** Switches the palette for a forest-ground section. */
  onDark?: boolean;
  align?: "center" | "start";
  className?: string;
}

/** Section masthead: gold eyebrow, roman line, italic line. */
export function SectionHeader({
  eyebrow,
  title,
  titleItalic,
  description,
  onDark = false,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>

      <h2
        className={cn(
          "mt-5 font-display text-4xl leading-[1.1] text-balance md:text-5xl",
          onDark ? "text-cream" : "text-forest"
        )}
      >
        {title}
        {titleItalic && (
          <>
            {" "}
            <em
              className={cn(
                "font-normal italic",
                onDark ? "text-gold" : "text-forest/75"
              )}
            >
              {titleItalic}
            </em>
          </>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-5 text-sm leading-relaxed text-pretty",
            onDark ? "text-cream/60" : "text-ink-2",
            align === "center" && "mx-auto max-w-lg"
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
