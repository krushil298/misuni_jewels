export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant pulsing logo placeholder */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
        </div>
        <p className="text-[0.65rem] tracking-[0.3rem] uppercase text-primary/60 font-medium animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
