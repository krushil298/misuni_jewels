"use client";

import { CATEGORIES, METAL_FILTERS } from "@/lib/constants";
import { cn, titleCase } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

interface FilterPanelProps {
  categories: string[];
  metals: string[];
  onToggleCategory: (value: string) => void;
  onToggleMetal: (value: string) => void;
  onClear: () => void;
  /** Result count per category, so empty filters can be disabled. */
  counts: { category: Record<string, number>; metal: Record<string, number> };
}

/** Shared filter controls — rendered inline on desktop, in a sheet on mobile. */
export function FilterPanel({
  categories,
  metals,
  onToggleCategory,
  onToggleMetal,
  onClear,
  counts,
}: FilterPanelProps) {
  const active = categories.length + metals.length;

  return (
    <div className="space-y-8">
      <Group
        label="Category"
        options={CATEGORIES.map((c) => ({
          value: c,
          label: titleCase(c),
          count: counts.category[c] ?? 0,
        }))}
        selected={categories}
        onToggle={onToggleCategory}
      />

      <Group
        label="Metal"
        options={METAL_FILTERS.map((m) => ({
          value: m,
          label: m,
          count: counts.metal[m] ?? 0,
        }))}
        selected={metals}
        onToggle={onToggleMetal}
      />

      {active > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3 transition-colors duration-150 hover:text-ink"
        >
          <Icon name="close" size={13} />
          Clear {active} {active === 1 ? "filter" : "filters"}
        </button>
      )}
    </div>
  );
}

interface GroupProps {
  label: string;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onToggle: (value: string) => void;
}

function Group({ label, options, selected, onToggle }: GroupProps) {
  return (
    <fieldset>
      <legend className="mb-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink">
        {label}
      </legend>
      <ul className="space-y-0.5">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          const empty = option.count === 0 && !checked;

          return (
            <li key={option.value}>
              <label
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 py-1",
                  empty && "cursor-not-allowed opacity-40"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={empty}
                  onChange={() => onToggle(option.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center border transition-colors duration-150",
                    checked
                      ? "border-sage bg-sage text-white"
                      : "border-rule-strong"
                  )}
                >
                  {checked && <Icon name="check" size={11} />}
                </span>
                <span className="flex-1 font-sans text-[0.8125rem] text-ink-2">
                  {option.label}
                </span>
                <span className="font-sans text-[0.6875rem] tabular-nums text-ink-4">
                  {option.count}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
