"use client";

import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "@/services/service";
import Image from "next/image";
import { useEffect, useState } from "react";
import   { Service } from '@/types';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  // const service = {
  //   id: '66aa1494584635e15c073ca9',
  //   name: 'Plumber',
  //   description: 'From leaky faucets to emergency repairs, we offer reliable and efficient plumbing solutions. Our expert plumber ensures high-quality service with transparent pricing and prompt response. Trust us to handle all your plumbing needs with professionalism and care.',
  //   imagePath: '/uploads/serviceImages/1721110956888-kouji-tsuru-xHeTZgvBfoM-unsplash.jpg',
  //   price: '100',
  //   duration: 3,
  // }

  const fetchServices = async () => {
    const response = await getAllServices();
    setServices(response);
  }

  useEffect(() => {
    fetchServices();
  },[])

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {services.map((service: Service) => (
      <ServiceCard key={service._id} service={service} />
    ))}
  </main>
  );
}
