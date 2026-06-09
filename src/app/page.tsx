"use client";

import SearchFilters from "@/components/SearchFilters";
import SearchResults from "@/components/SearchResults";
import { getAllServices } from "@/services/service";
import { searchServices, SearchFilters as ISearchFilters } from "@/services/search";
import { useEffect, useRef, useState, useCallback } from "react";
import { Service } from "@/types";
import { FiSearch, FiSliders, FiTrendingUp, FiZap } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [debouncedFilters, setDebouncedFilters] = useState<ISearchFilters>({});
  const hasMountedRef = useRef(false);

  const isInitialLoading = loading && services.length === 0;
  const activeFiltersCount = Object.values(filters).filter((value) => value !== undefined && value !== "").length;

  const fetchAllServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      setServices(response);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch services", err);
      setError("Failed to load services");
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  const performSearch = useCallback(async (searchFilters: ISearchFilters) => {
    if (!searchFilters.name && !searchFilters.minPrice && !searchFilters.maxPrice && !searchFilters.duration) {
      fetchAllServices();
      return;
    }

    try {
      setLoading(true);
      const results = await searchServices(searchFilters);
      setServices(results);
      setError(null);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to search services");
      toast.error("Failed to search services");
    } finally {
      setLoading(false);
    }
  }, [fetchAllServices]);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const timer = setTimeout(() => {
      performSearch(debouncedFilters);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedFilters, performSearch]);

  const handleFiltersChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters);
    setDebouncedFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-10 text-white shadow-[0_35px_90px_-35px_rgba(15,23,42,0.75)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.18),_transparent_30%)]" />
          <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
                <FiZap className="text-sky-300" />
                Service marketplace
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Find and book services faster.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                  Browse trusted service providers, compare prices, and narrow results with simple filters.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
                  <FiSearch className="text-sky-300" />
                  Smart search
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
                  <FiSliders className="text-emerald-300" />
                  {activeFiltersCount || 0} active filters
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
                  <FiTrendingUp className="text-amber-300" />
                  Real-time updates
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-sm text-slate-300">Available services</div>
                <div className="mt-2 text-3xl font-semibold text-white">
                  {loading && services.length === 0 ? "-" : services.length}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-sm text-slate-300">Search status</div>
                <div className="mt-2 text-lg font-medium text-white">
                  {loading && services.length > 0 ? "Refreshing" : "Ready"}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-sm text-slate-300">Booking flow</div>
                <div className="mt-2 text-lg font-medium text-white">
                  Simple and quick
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-6">
          <SearchFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />

          {loading && services.length > 0 && (
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <span>Updating results.</span>
              <span className="inline-flex items-center gap-2 font-medium text-slate-900">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                Live refresh
              </span>
            </div>
          )}

          <SearchResults services={services} loading={isInitialLoading} error={error} />
        </div>
      </div>
    </main>
  );
}
