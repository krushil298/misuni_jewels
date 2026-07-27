"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

type SortField = "name" | "price" | "category" | "metal";
type SortDir = "asc" | "desc";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string, name: string) => void;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...products].sort((a, b) => {
    let valA: string | number;
    let valB: string | number;

    switch (sortField) {
      case "price":
        valA = a.price;
        valB = b.price;
        break;
      default:
        valA = (a[sortField] ?? "").toLowerCase();
        valB = (b[sortField] ?? "").toLowerCase();
    }

    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30 ml-1 inline">
          <path d="M8 15l4 4 4-4M8 9l4-4 4 4" />
        </svg>
      );
    }
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 inline">
        {sortDir === "asc" ? <path d="M8 15l4-4 4 4" /> : <path d="M8 9l4 4 4-4" />}
      </svg>
    );
  };

  if (products.length === 0) {
    return (
      <div className="admin-empty">
        <div className="admin-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <p className="admin-empty-title">No products found</p>
        <p className="admin-empty-desc">
          Try adjusting your search or filters, or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} className={sortField === "name" ? "sorted" : ""}>
              Product <SortIcon field="name" />
            </th>
            <th onClick={() => handleSort("category")} className={sortField === "category" ? "sorted" : ""}>
              Category <SortIcon field="category" />
            </th>
            <th onClick={() => handleSort("metal")} className={sortField === "metal" ? "sorted" : ""}>
              Metal <SortIcon field="metal" />
            </th>
            <th onClick={() => handleSort("price")} className={sortField === "price" ? "sorted" : ""}>
              Price <SortIcon field="price" />
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((product) => (
            <tr key={product.id}>
              {/* Product name + thumbnail */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-white/5 overflow-hidden flex-shrink-0">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate max-w-[220px]">
                      {product.name}
                    </p>
                    <p className="text-[0.6rem] text-white/25 truncate max-w-[220px]">
                      {product.slug}
                    </p>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td>
                <span className="capitalize">{product.category}</span>
              </td>

              {/* Metal */}
              <td>
                <span className="text-[0.75rem]">{product.metal}</span>
              </td>

              {/* Price */}
              <td>
                <span className="text-white font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </td>

              {/* Status badges */}
              <td>
                <div className="flex gap-1.5 flex-wrap">
                  {product.isBestseller && (
                    <span className="admin-badge admin-badge-success">Best</span>
                  )}
                  {product.isNew && (
                    <span className="admin-badge admin-badge-warning">New</span>
                  )}
                  {!product.isBestseller && !product.isNew && (
                    <span className="text-white/20 text-[0.6rem]">—</span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(product.id, product.name)}
                    className="admin-btn admin-btn-danger admin-btn-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
