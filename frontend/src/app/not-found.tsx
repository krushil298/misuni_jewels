import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-[0.65rem] tracking-[0.4rem] font-medium uppercase text-primary mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-primary" />
          Page Not Found
          <span className="w-8 h-px bg-primary" />
        </p>
        <h1 className="text-7xl sm:text-9xl font-light uppercase tracking-[0.3rem] text-on-surface mb-6">
          404
        </h1>
        <p className="text-sm font-light tracking-wider text-on-surface-variant leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group relative overflow-hidden bg-primary text-white px-10 py-4 uppercase tracking-[0.25rem] text-[0.7rem] font-sans font-medium transition-all duration-500 text-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Go Home</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
          <Link
            href="/collections"
            className="border border-primary/30 text-primary px-10 py-4 uppercase tracking-[0.25rem] text-[0.7rem] font-sans font-medium transition-all duration-300 text-center hover:bg-primary hover:text-white"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </main>
  );
}
