"use client";

import { useState } from "react";
import type { SearchFilters } from "@/services/search";
import { getPopularDurations } from "@/services/search";
import { FiFilter, FiRotateCcw, FiSearch } from "react-icons/fi";

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export default function SearchFilters({ onFiltersChange, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    name: initialFilters?.name || "",
    minPrice: initialFilters?.minPrice || undefined,
    maxPrice: initialFilters?.maxPrice || undefined,
    duration: initialFilters?.duration || undefined,
  });

  const popularDurations = getPopularDurations();

  const handleInputChange = (key: keyof SearchFilters, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value === "" ? undefined : value,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      name: "",
      minPrice: undefined,
      maxPrice: undefined,
      duration: undefined,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="rounded-3xl border border-white/50 bg-white/80 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
            <FiFilter />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Refine your search</h2>
            <p className="text-sm text-slate-600">Mix price, duration, and service name to narrow the list.</p>
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <FiRotateCcw />
          Clear filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Search Services
          </label>
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Service name..."
              value={filters.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Min Price ($)
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={filters.minPrice || ""}
            onChange={(e) => handleInputChange("minPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Max Price ($)
          </label>
          <input
            type="number"
            placeholder="1000"
            min="0"
            value={filters.maxPrice || ""}
            onChange={(e) => handleInputChange("maxPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Duration (minutes)
          </label>
          <select
            value={filters.duration || ""}
            onChange={(e) => handleInputChange("duration", e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="">All durations</option>
            {popularDurations.map((duration) => (
              <option key={duration} value={duration}>
                {duration} min
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
