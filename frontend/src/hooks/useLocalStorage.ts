"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactive localStorage binding.
 *
 * Implemented as an external store rather than a `useState` + `useEffect`
 * pair. The effect version wrote state during the first commit, which
 * triggers a cascading re-render on every mount, and it did not keep two
 * components reading the same key in sync. `useSyncExternalStore` also
 * gives correct SSR behaviour: the server snapshot is the initial value, so
 * markup matches and React swaps in the stored value after hydration.
 */

type Listener = () => void;

/** Subscribers per key, so every consumer of a key updates together. */
const listeners = new Map<string, Set<Listener>>();

/**
 * Cache of the last parsed value per key.
 *
 * `getSnapshot` must return a referentially stable value between changes —
 * parsing JSON on every call would hand React a new object each time and
 * spin forever.
 */
const cache = new Map<string, { raw: string | null; value: unknown }>();

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string, listener: Listener): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);

  // Keep other tabs in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      cache.delete(key);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function read<T>(key: string, initial: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // Private mode, or storage disabled — fall back to the initial value.
    return initial;
  }

  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value: T = initial;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initial;
    }
  }

  cache.set(key, { raw, value });
  return value;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const value = useSyncExternalStore(
    useCallback((listener: Listener) => subscribe(key, listener), [key]),
    () => read(key, initialValue),
    () => initialValue
  );

  /**
   * True once the client store has taken over from the server snapshot, so
   * the UI can avoid flashing an empty state before storage is read.
   */
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      const current = read(key, initialValue);
      const resolved =
        typeof next === "function" ? (next as (c: T) => T)(current) : next;

      try {
        const raw = JSON.stringify(resolved);
        window.localStorage.setItem(key, raw);
        cache.set(key, { raw, value: resolved });
      } catch (error) {
        // Still update in memory so the UI stays responsive if the write fails.
        cache.set(key, { raw: null, value: resolved });
        console.error(`[useLocalStorage] could not persist "${key}":`, error);
      }

      emit(key);
    },
    [key, initialValue]
  );

  return [value, setValue, isHydrated] as const;
}
