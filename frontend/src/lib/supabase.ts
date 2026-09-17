import { createClient } from "@supabase/supabase-js";

/**
 * Supabase browser client.
 *
 * Credentials come from the environment. The previous version inlined the
 * project URL and anon key as literal fallbacks in source, which meant the
 * project reference was committed to the repository and the app would
 * silently talk to that project even when the env vars were misconfigured.
 *
 * The anon key is a publishable key and is safe to expose to the browser,
 * but it must still be paired with row-level security on every table.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (and in the Netlify " +
      "environment for deploys)."
  );
}

export const supabase = createClient(url, anonKey);
