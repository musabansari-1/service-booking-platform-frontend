"use client";

import type { SearchResult } from "@/services/search";
import ServiceCard from "./ServiceCard";

interface SearchResultsProps {
  services: SearchResult[];
  loading: boolean;
  error: string | null;
}

export default function SearchResults({ services, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-semibold mb-2">
          Error loading services
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No services found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search criteria or browse all services.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((service: SearchResult) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}