"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import type { SearchFilters as ISearchFilters } from "@/services/search";
import { searchServices } from "@/services/search";
import SearchFiltersComponent from "@/components/SearchFilters";
import SearchResults from "@/components/SearchResults";
import { formatDuration } from "@/utils";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedFilters, setDebouncedFilters] = useState<ISearchFilters>({});

  // Initialize filters from URL params
  useEffect(() => {
    const urlFilters: ISearchFilters = {};
    const name = searchParams.get("name");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const duration = searchParams.get("duration");

    if (name) urlFilters.name = name;
    if (minPrice) urlFilters.minPrice = parseFloat(minPrice);
    if (maxPrice) urlFilters.maxPrice = parseFloat(maxPrice);
    if (duration) urlFilters.duration = parseInt(duration);

    setDebouncedFilters(urlFilters);
  }, [searchParams]);

  // Debounce search function
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(debouncedFilters);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedFilters]);

  const performSearch = useCallback(async (filters: ISearchFilters) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchServices(filters);
      setServices(results);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err.response?.data?.message || "Failed to search services");
      toast.error("Failed to search services. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFiltersChange = (filters: ISearchFilters) => {
    setDebouncedFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Services</h1>
          <p className="text-gray-600">
            Find the perfect service for your needs
          </p>
        </div>

        <SearchFiltersComponent onFiltersChange={handleFiltersChange} />

        <SearchResults 
          services={services.map(service => ({
            ...service,
            formattedDuration: formatDuration(service.duration)
          }))} 
          loading={loading} 
          error={error} 
        />
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}