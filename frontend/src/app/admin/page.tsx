"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDashboardStats } from "@/data/admin-api";
import { getProducts } from "@/data/api";
import { StatsCard } from "@/components/admin/StatsCard";
import type { Product } from "@/types";

interface DashboardData {
  totalProducts: number;
  totalBestsellers: number;
  totalNew: number;
  categories: string[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [statsResult, products] = await Promise.all([
        getDashboardStats(),
        getProducts(),
      ]);

      if (statsResult.data) {
        setStats(statsResult.data);
      }

      // Show the last 5 products as "recent"
      setRecentProducts(products.slice(-5).reverse());
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          }
        />
        <StatsCard
          label="Categories"
          value={stats?.categories.length ?? 0}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          }
          accentColor="#f59e0b"
        />
        <StatsCard
          label="Bestsellers"
          value={stats?.totalBestsellers ?? 0}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
          accentColor="#22c55e"
        />
        <StatsCard
          label="New Arrivals"
          value={stats?.totalNew ?? 0}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          }
          accentColor="#8b5cf6"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="admin-btn admin-btn-primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </Link>
        <Link
          href="/admin/products"
          className="admin-btn admin-btn-secondary"
        >
          View All Products
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn-secondary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Store
        </a>
      </div>

      {/* Recent Products */}
      <div className="admin-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans">
            Recent Products
          </h2>
          <Link
            href="/admin/products"
            className="text-[0.6rem] tracking-[0.15rem] uppercase text-[#798d8c] hover:text-white transition-colors font-sans"
          >
            View All →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="admin-empty-title">No products yet</p>
            <p className="admin-empty-desc">
              Add your first product to see it here.
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-10 h-10 rounded bg-white/5 overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-white font-medium truncate max-w-[200px]">
                        {product.name}
                      </span>
                    </Link>
                  </td>
                  <td>
                    <span className="capitalize">{product.category}</span>
                  </td>
                  <td className="text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <div className="flex gap-1.5">
                      {product.isBestseller && (
                        <span className="admin-badge admin-badge-success">Best</span>
                      )}
                      {product.isNew && (
                        <span className="admin-badge admin-badge-warning">New</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Categories Overview */}
      {stats && stats.categories.length > 0 && (
        <div className="admin-card p-6">
          <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {stats.categories.map((cat) => (
              <span key={cat} className="admin-badge admin-badge-accent capitalize">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Skeleton loader for the dashboard */
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="admin-card p-6">
            <div className="admin-skeleton w-10 h-10 rounded-lg mb-4" />
            <div className="admin-skeleton h-8 w-16 mb-2" />
            <div className="admin-skeleton h-3 w-24" />
          </div>
        ))}
      </div>
      <div className="admin-card p-6">
        <div className="admin-skeleton h-4 w-40 mb-6" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 mb-4">
            <div className="admin-skeleton w-10 h-10 rounded" />
            <div className="admin-skeleton h-4 w-48" />
          </div>
        ))}
      </div>
    </div>
  );
}
