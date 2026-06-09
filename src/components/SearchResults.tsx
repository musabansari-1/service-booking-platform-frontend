"use client";

import type { SearchResult } from "@/services/search";
import ServiceCard from "./ServiceCard";
import { FiAlertCircle, FiSearch, FiZap } from "react-icons/fi";

interface SearchResultsProps {
  services: SearchResult[];
  loading: boolean;
  error: string | null;
}

export default function SearchResults({ services, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_18px_50px_-35px_rgba(15,23,42,0.4)]"
          >
            <div className="h-52 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] shimmer" />
            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-red-50/80 px-6 py-12 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <FiAlertCircle className="text-2xl" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900">We hit a snag</h3>
        <p className="mt-2 text-slate-600">{error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <FiSearch className="text-2xl" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          No services found
        </h3>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          Try widening your price range or removing one of the filters to uncover more matches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 backdrop-blur">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <FiZap />
            Search results
          </div>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            {services.length} services ready to book
          </h2>
        </div>
        <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          Live availability
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {services.map((service: SearchResult) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
