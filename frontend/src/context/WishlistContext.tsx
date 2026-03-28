"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Product } from "@/types";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>(
    "misuni-wishlist",
    []
  );

  const addItem = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        return [...prev, product];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((item) => item.id !== productId));
    },
    [setItems]
  );

  const isWishlisted = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, isWishlisted, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
