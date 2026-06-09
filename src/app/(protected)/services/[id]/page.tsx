"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getServiceById } from '@/services/service';
import { BookingCard, Modal } from '@/components';
import { Service, ServiceDetailProps } from '@/types';
import { FiArrowLeft, FiClock, FiDollarSign, FiStar } from 'react-icons/fi';

const ServiceDetail = ({ params }: ServiceDetailProps) => {
  const router = useRouter();
  const id = params.id;
  const [service, setService] = useState<Service>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const fetchService = async (serviceId: string) => {
    try {
      const response = await getServiceById(serviceId);
      setService(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchService(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="h-[28rem] animate-pulse bg-slate-200" />
            <div className="space-y-4 p-8">
              <div className="h-6 w-40 rounded-full bg-slate-200" />
              <div className="h-10 w-3/4 rounded-full bg-slate-200" />
              <div className="h-4 w-full rounded-full bg-slate-200" />
              <div className="h-4 w-5/6 rounded-full bg-slate-200" />
              <div className="h-12 w-40 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-slate-700 shadow-sm">
          Service not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eff6ff_45%,_#f8fafc)] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_-45px_rgba(15,23,42,0.45)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative">
              <img
                src={service.imagePath}
                alt={service.name}
                className="h-full min-h-[26rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 backdrop-blur">
                  ${service.price}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  <FiStar className="text-amber-300" />
                  4.9
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                <FiClock />
                {service.duration} min service
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {service.name}
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">Price</div>
                  <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-950">
                    <FiDollarSign className="text-slate-400" />
                    {service.price}
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">Duration</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-950">{service.duration} min</div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">How it works</div>
                <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>1. Pick a date and time slot.</li>
                  <li>2. Confirm the booking in a few taps.</li>
                  <li>3. Track it later from your bookings page.</li>
                </ol>
              </div>

              <button
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3.5 font-medium text-white transition hover:bg-slate-800"
                onClick={handleOpenModal}
              >
                Book now
              </button>
            </div>
          </div>
        </div>

        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
          <BookingCard serviceId={id} />
        </Modal>
      </div>
    </div>
  );
};

export default ServiceDetail;
