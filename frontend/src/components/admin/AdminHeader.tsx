"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

/** Map pathname segments to human-readable labels */
const segmentLabels: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  new: "New Product",
  edit: "Edit Product",
};

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Skip dynamic [id] segments in the display but include in path
    if (segment.match(/^[0-9a-fA-F-]+$/)) {
      continue;
    }

    crumbs.push({
      label: segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentPath,
    });
  }

  return crumbs;
}

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const lastMeaningful = [...segments].reverse().find(
    (s) => !s.match(/^[0-9a-fA-F-]+$/)
  );
  return segmentLabels[lastMeaningful || "admin"] || "Dashboard";
}

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 bg-[#0e1412]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side: hamburger + breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div>
            {/* Page title */}
            <h1 className="text-white text-[0.8rem] tracking-[0.2rem] uppercase font-bold font-sans">
              {pageTitle}
            </h1>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 mt-1" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/15"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-[0.55rem] tracking-[0.15rem] uppercase text-white/40 font-sans">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-[0.55rem] tracking-[0.15rem] uppercase text-white/25 hover:text-white/50 transition-colors font-sans"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Right side: timestamp */}
        <div className="hidden sm:block text-right">
          <p className="text-[0.55rem] tracking-wider text-white/20 font-sans">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </header>
  );
}
