"use client";

import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "@/services/service";
import { useEffect, useState } from "react";
import { Service } from '@/types';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response);
    } catch (err) {
      console.error("❌ Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
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
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {services.map((service: Service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </main>
  );
}
