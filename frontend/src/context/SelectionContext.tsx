"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Product } from "@/types";

/**
 * The visitor's saved selection.
 *
 * This replaces the old cart + wishlist pair. Nothing is sold online, so
 * there is no quantity, no price maths and no checkout — a selection is a
 * shortlist the client assembles while browsing and then sends to the
 * atelier as a single WhatsApp message.
 */

interface SelectionContextValue {
  items: Product[];
  count: number;
  isSaved: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** False until localStorage has been read, so the UI can avoid a flash. */
  isHydrated: boolean;
}

const SelectionContext = createContext<SelectionContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "misuni:selection";

export function SelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems, isHydrated] = useLocalStorage<Product[]>(
    STORAGE_KEY,
    []
  );

  const isSaved = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  );

  const toggle = useCallback(
    (product: Product) => {
      setItems((current) =>
        current.some((p) => p.id === product.id)
          ? current.filter((p) => p.id !== product.id)
          : [...current, product]
      );
    },
    [setItems]
  );

  const remove = useCallback(
    (id: string) => {
      setItems((current) => current.filter((p) => p.id !== id));
    },
    [setItems]
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isSaved,
      toggle,
      remove,
      clear,
      isHydrated,
    }),
    [items, isSaved, toggle, remove, clear, isHydrated]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
