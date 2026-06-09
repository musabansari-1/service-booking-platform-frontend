import React from 'react';
import Link from 'next/link';
import { AiFillStar } from "react-icons/ai";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { Service } from '@/types';


const ServiceCard = ({ service}: {service: Service}) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(15,23,42,0.45)]">
      <div className="relative overflow-hidden">
        <img
          src={service.imagePath}
          alt={service.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
          ${service.price}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-1.5 text-sm backdrop-blur">
            <FiClock className="text-base" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-400/90 px-3 py-1.5 text-sm font-semibold text-slate-950 backdrop-blur">
            <AiFillStar className="text-base" />
            <span>4.9</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{service.name}</h3>
          <p className="max-h-12 overflow-hidden text-sm leading-6 text-slate-600">{service.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-slate-500">
            Trusted by local customers
          </div>

          <Link
            href={`/services/${service._id}`}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          >
            View Details
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
