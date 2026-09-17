import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Misuni lockup.
 *
 * Assets are cropped tight from the master artwork with a transparent
 * ground, generated in four tones so the mark always sits correctly:
 *
 *   gold   — on the forest ground (header, hero, footer). The house treatment.
 *   cream  — on forest, where gold would compete with an adjacent gold button.
 *   sage   — on cream ground; the original brand colour.
 *   white  — over photography.
 *
 * Three crops: `mark` (the butterfly M alone), `lockup` (mark + MISUNI
 * JEWELS) and `full` (lockup + the tagline).
 *
 * The supplied /logo-dark.png and /logo-white.png were 2482x1041 with the
 * mark floating in the middle and "JEWELS" clipped off the bottom edge, so
 * at header size they rendered as an illegible sliver. These replace them.
 */

type LogoVariant = "mark" | "lockup" | "full";
type LogoTone = "gold" | "cream" | "sage" | "white";

/** Intrinsic aspect ratios of the generated assets. */
const RATIO: Record<LogoVariant, number> = {
  mark: 369 / 201,
  lockup: 861 / 543,
  full: 887 / 789,
};

/** `sage` is the un-suffixed master file. */
const SUFFIX: Record<LogoTone, string> = {
  sage: "",
  gold: "-gold",
  cream: "-cream",
  white: "-white",
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
  tone = "gold",
  height = 44,
  className,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * RATIO[variant]);

  return (
    <Image
      src={`/brand/${variant}${SUFFIX[tone]}.png`}
      alt="Misuni Jewels"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width }}
    />
  );
}
