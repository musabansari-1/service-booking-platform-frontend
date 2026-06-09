"use client";

import ServiceCard from "@/components/ServiceCard";
import SearchFilters from "@/components/SearchFilters";
import { getAllServices } from "@/services/service";
import { searchServices, SearchFilters as ISearchFilters } from "@/services/search";
import { useEffect, useState, useCallback } from "react";
import { Service } from '@/types';
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [debouncedFilters, setDebouncedFilters] = useState<ISearchFilters>({});

  // Initial load of all services
  const fetchAllServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      setServices(response);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch services", err);
      setError("Failed to load services");
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  // Debounce search filters
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(debouncedFilters);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedFilters]);

  // Perform search with filters
  const performSearch = useCallback(async (searchFilters: ISearchFilters) => {
    // If no filters, show all services
    if (!searchFilters.name && !searchFilters.minPrice && !searchFilters.maxPrice && !searchFilters.duration) {
      fetchAllServices();
      return;
    }

    try {
      setLoading(true);
      const results = await searchServices(searchFilters);
      setServices(results);
      setError(null);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError("Failed to search services");
      toast.error("Failed to search services");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFiltersChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters);
    setDebouncedFilters(newFilters);
  };

  if (loading && services.length === 0) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Services
          </h1>
          <p className="text-gray-600">
            Find and book the perfect service for your needs
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="animate-pulse bg-gray-200 h-48 w-full"></div>
                <div className="p-6">
                  <div className="animate-pulse bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-4 w-full mb-2 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-4 w-2/3 mb-4 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-10 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all services.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service: Service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
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
    </main>
  );
}
