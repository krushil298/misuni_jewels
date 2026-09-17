/**
 * The single page's sections, in document order.
 *
 * One source of truth for the anchor ids, so the header, the mobile drawer,
 * the footer and the scroll-spy can never drift out of step.
 */
export const SECTIONS = [
  { id: "collections", label: "Collections" },
  { id: "pieces", label: "Pieces" },
  { id: "atelier", label: "Atelier" },
  { id: "visit", label: "Visit" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
