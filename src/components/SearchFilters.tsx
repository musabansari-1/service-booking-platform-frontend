"use client";

import { useState, useEffect } from "react";
import type { SearchFilters } from "@/services/search";
import { getPopularDurations } from "@/services/search";

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
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service Name Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Services
          </label>
          <input
            type="text"
            placeholder="Service name..."
            value={filters.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price ($)
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={filters.minPrice || ""}
            onChange={(e) => handleInputChange("minPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price ($)
          </label>
          <input
            type="number"
            placeholder="1000"
            min="0"
            value={filters.maxPrice || ""}
            onChange={(e) => handleInputChange("maxPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <select
            value={filters.duration || ""}
            onChange={(e) => handleInputChange("duration", e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="mt-4 flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}