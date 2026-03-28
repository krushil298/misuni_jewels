"use client";

import { useState } from "react";

const metalOptions = ["Gold", "Silver", "Rose Gold", "White Gold", "Platinum"];
const categoryOptions = [
  "chains",
  "bracelets",
  "pendants",
  "rings",
  "earrings",
  "watches",
];

interface FilterSidebarProps {
  selectedMetals: string[];
  setSelectedMetals: (metals: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  onClear: () => void;
}

export function FilterSidebar({
  selectedMetals,
  setSelectedMetals,
  selectedCategories,
  setSelectedCategories,
  onClear,
}: FilterSidebarProps) {
  const [metalOpen, setMetalOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);

  const toggleMetal = (metal: string) => {
    setSelectedMetals(
      selectedMetals.includes(metal)
        ? selectedMetals.filter((m) => m !== metal)
        : [...selectedMetals, metal]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-12">
      <div className="space-y-6">
        <h3 className="font-['Inter'] text-[0.75rem] font-bold tracking-[0.2rem] uppercase border-b border-[#adb3b4]/20 pb-2">
          Filter By
        </h3>

        {/* Category */}
        <div className="group">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex justify-between items-center w-full py-2 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase">
              Category
            </span>
            <span className="material-symbols-outlined text-sm">
              {categoryOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {categoryOpen && (
            <div className="mt-2 space-y-2 pl-2">
              {categoryOptions.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group/item"
                >
                  <div
                    onClick={() => toggleCategory(cat)}
                    className={`w-3 h-3 border transition-colors ${
                      selectedCategories.includes(cat)
                        ? "border-[#2d3435] bg-[#2d3435]"
                        : "border-[#adb3b4] group-hover/item:border-[#2d3435]"
                    }`}
                  />
                  <span
                    onClick={() => toggleCategory(cat)}
                    className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e] group-hover/item:text-[#2d3435] capitalize"
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Metal Type */}
        <div className="group border-t border-[#adb3b4]/10 pt-4">
          <button
            onClick={() => setMetalOpen(!metalOpen)}
            className="flex justify-between items-center w-full py-2 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase">
              Metal Type
            </span>
            <span className="material-symbols-outlined text-sm">
              {metalOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {metalOpen && (
            <div className="mt-2 space-y-2 pl-2">
              {metalOptions.map((metal) => (
                <label
                  key={metal}
                  className="flex items-center gap-3 cursor-pointer group/item"
                >
                  <div
                    onClick={() => toggleMetal(metal)}
                    className={`w-3 h-3 border transition-colors ${
                      selectedMetals.includes(metal)
                        ? "border-[#2d3435] bg-[#2d3435]"
                        : "border-[#adb3b4] group-hover/item:border-[#2d3435]"
                    }`}
                  />
                  <span
                    onClick={() => toggleMetal(metal)}
                    className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e] group-hover/item:text-[#2d3435]"
                  >
                    {metal}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onClear}
          className="w-full border border-[#adb3b4]/20 py-4 font-['Inter'] text-[0.75rem] tracking-[0.2rem] uppercase hover:border-[#2d3435] transition-all"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
