"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "bestseller" | "new" | "sale" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-on-surface text-white",
  bestseller:
    "bg-tertiary text-white",
  new:
    "bg-primary text-white",
  sale:
    "bg-error text-on-error",
  outline:
    "bg-transparent border border-outline text-on-surface",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[0.6rem] tracking-[0.15rem] uppercase font-bold font-sans",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
