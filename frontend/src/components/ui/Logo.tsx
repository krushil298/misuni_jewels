import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Misuni lockup.
 *
 * Assets live in /public/brand and are tightly cropped from the master
 * artwork with a transparent ground, so they sit correctly at any size.
 * The previous /logo-dark.png and /logo-white.png were 2482x1041 with the
 * mark floating in the middle and "JEWELS" clipped off the bottom edge.
 *
 *   mark    — the butterfly M alone (compact chrome, favicons, badges)
 *   lockup  — mark + MISUNI JEWELS (navbar, drawer)
 *   full    — lockup + "purity. integrity. brilliance." (footer, hero)
 */

type LogoVariant = "mark" | "lockup" | "full";
type LogoTone = "sage" | "white";

/** Intrinsic aspect ratios of the generated assets. */
const RATIO: Record<LogoVariant, number> = {
  mark: 369 / 201,
  lockup: 861 / 543,
  full: 887 / 789,
};

interface LogoProps {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Rendered height in px; width follows the asset's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({
  variant = "lockup",
  tone = "sage",
  height = 44,
  className,
  priority = false,
}: LogoProps) {
  const src = `/brand/${variant}${tone === "white" ? "-white" : ""}.png`;
  const width = Math.round(height * RATIO[variant]);

  return (
    <Image
      src={src}
      alt="Misuni Jewels"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width }}
    />
  );
}
