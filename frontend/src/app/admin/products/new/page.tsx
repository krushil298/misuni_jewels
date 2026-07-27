"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/data/admin-api";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: Omit<Product, "id">) {
    setSubmitting(true);
    setError(null);

    const result = await createProduct(data);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // Success → redirect to products list
    router.push("/admin/products");
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-md text-[0.75rem] tracking-wider font-sans admin-fade-in">
          <strong>Error:</strong> {error}
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
