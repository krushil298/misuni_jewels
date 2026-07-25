"use client";

import { useState, useEffect } from "react";

/**
 * Tracks whether a CSS media query matches.
 * Useful for conditional rendering based on viewport size.
 *
 * @param query - A CSS media query string (e.g., "(min-width: 768px)")
 * @returns Whether the media query currently matches
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
