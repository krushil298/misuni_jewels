import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving conflicting Tailwind utilities so that a
 * caller-supplied `className` reliably overrides a component default.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a rupee amount for display, e.g. 148500 → "₹1,48,500".
 * Uses the Indian digit grouping (lakh/crore), not thousands.
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

/** Format a date for display, e.g. "15 January 2026". */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Truncate to a maximum length, appending an ellipsis. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/** Convert a string to a URL-safe slug. */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Sentence-case a lowercase taxonomy value for display, e.g. "necklaces" → "Necklaces". */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * A stable three-digit register code for a piece, e.g. "MJ 214".
 *
 * Derived from the slug so it never changes for a given product and needs
 * no extra column. It is a presentational reference for the catalogue —
 * not an inventory SKU, and not shown as one.
 */
export function referenceCode(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 900;
  }
  return `MJ ${String(hash + 100)}`;
}
