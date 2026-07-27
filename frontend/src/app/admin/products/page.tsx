"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getProducts } from "@/data/api";
import { deleteProduct } from "@/data/admin-api";
import { ProductTable } from "@/components/admin/ProductTable";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  // Unique categories from current products
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))].sort();
  }, [products]);

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase()) ||
        p.metal.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        filterCategory === "all" || p.category === filterCategory;

      return matchSearch && matchCategory;
    });
  }, [products, search, filterCategory]);

  // Handle delete
  function handleDeleteRequest(id: string, name: string) {
    setDeleteModal({ id, name });
  }

  async function confirmDelete() {
    if (!deleteModal) return;
    setDeleting(true);
    const result = await deleteProduct(deleteModal.id);
    if (!result.error) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
    }
    setDeleting(false);
    setDeleteModal(null);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="admin-skeleton h-8 w-48" />
          <div className="admin-skeleton h-10 w-32 rounded-md" />
        </div>
        <div className="admin-card">
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="admin-skeleton w-10 h-10 rounded" />
                <div className="admin-skeleton h-4 w-48" />
                <div className="admin-skeleton h-4 w-24 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/40 text-[0.7rem] tracking-wider font-sans">
            {products.length} {products.length === 1 ? "product" : "products"} total
            {filtered.length !== products.length && (
              <> · {filtered.length} shown</>
            )}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="admin-btn admin-btn-primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input !pl-10"
            placeholder="Search products..."
          />
        </div>

        {/* Category filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="admin-input w-full sm:w-auto sm:min-w-[160px] capitalize"
        >
          <option value="all" className="bg-[#1a2421]">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-[#1a2421] capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products table */}
      <div className="admin-card">
        <ProductTable products={filtered} onDelete={handleDeleteRequest} />
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <div className="admin-modal-overlay" onClick={() => !deleting && setDeleteModal(null)}>
          <div className="admin-modal admin-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-400">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-white text-[0.75rem] tracking-[0.15rem] uppercase font-bold font-sans">
                Delete Product
              </h3>
            </div>
            <p className="text-white/50 text-sm mb-6 font-sans">
              Are you sure you want to delete{" "}
              <strong className="text-white">{deleteModal.name}</strong>? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="admin-btn admin-btn-danger"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
