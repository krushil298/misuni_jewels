"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "@/data/admin-api";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types";

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getProductById(productId);
      if (result.error || !result.data) {
        setError(result.error ?? "Product not found");
      } else {
        setProduct(result.data);
      }
      setLoading(false);
    }
    load();
  }, [productId]);

  async function handleSubmit(data: Omit<Product, "id">) {
    setSubmitting(true);
    setError(null);

    const result = await updateProduct(productId, data);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // Success → redirect to products list
    router.push("/admin/products");
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="admin-card p-6 space-y-4">
            <div className="admin-skeleton h-4 w-32" />
            <div className="admin-skeleton h-10 w-full rounded-md" />
            <div className="admin-skeleton h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="admin-card p-8">
        <div className="admin-empty">
          <div className="admin-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="admin-empty-title">Product not found</p>
          <p className="admin-empty-desc mb-4">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <a href="/admin/products" className="admin-btn admin-btn-secondary">
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-md text-[0.75rem] tracking-wider font-sans admin-fade-in">
          <strong>Error:</strong> {error}
        </div>
      )}

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
