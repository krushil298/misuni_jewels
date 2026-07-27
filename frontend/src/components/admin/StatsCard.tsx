"use client";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  accentColor?: string;
}

export function StatsCard({
  label,
  value,
  icon,
  trend,
  accentColor = "var(--admin-accent)",
}: StatsCardProps) {
  return (
    <div className="admin-card p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ background: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        {trend && (
          <span className="text-[0.55rem] tracking-wider font-bold font-sans text-[#22c55e]">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-sans tracking-wider mb-1">
        {value}
      </p>
      <p className="text-[0.6rem] tracking-[0.2rem] uppercase text-white/40 font-sans font-medium">
        {label}
      </p>
    </div>
  );
}
