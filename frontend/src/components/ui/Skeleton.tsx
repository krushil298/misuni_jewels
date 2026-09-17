import { cn } from "@/lib/utils";

/** Neutral loading block. Structural skeletons beat spinners for grids. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse bg-hairline/70", className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="mb-3 aspect-4/5 w-full" />
      <Skeleton className="mb-2 h-2.5 w-1/3" />
      <Skeleton className="mb-2 h-3.5 w-4/5" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading pieces"
      className="mx-auto w-full max-w-[1600px] px-5 py-8 md:px-8 md:py-12 lg:px-12"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
