import { createClient } from "@supabase/supabase-js";
import { products } from "./products";

const supabaseUrl = "https://dcullhznkflstpwghslp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdWxsaHpua2Zsc3Rwd2doc2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzcyOTEsImV4cCI6MjA5MjE1MzI5MX0.UleO_zd7__1A1WOhcUpIuFVCFyJUoT9TJ-EP2e0B3JQ";
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding products...");
  
  // Format products for db (exclude id because we want uuid, maybe maintain numeric id as slug if needed? Let's just drop the id from the insertion)
  const productsToInsert = products.map(({ id, isBestseller, isNew, ...rest }) => ({
    ...rest,
    isbestseller: isBestseller,
    isnew: isNew
  }));

  const { data, error } = await supabase.from("products").insert(productsToInsert);
  
  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log("Successfully seeded products:", products.length);
  }
}

seed();
