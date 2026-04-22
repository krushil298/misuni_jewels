import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dcullhznkflstpwghslp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdWxsaHpua2Zsc3Rwd2doc2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzcyOTEsImV4cCI6MjA5MjE1MzI5MX0.UleO_zd7__1A1WOhcUpIuFVCFyJUoT9TJ-EP2e0B3JQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
