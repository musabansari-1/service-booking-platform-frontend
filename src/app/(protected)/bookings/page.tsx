'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import ConfirmationModal from '@/components/ConfirmationModal';
import { deleteBooking } from '@/services/booking';
import { BookingCard, Modal } from '@/components';
import { Booking } from '@/types/booking.type';
import { FiCalendar, FiClock, FiTrash2, FiRefreshCw, FiSearch } from 'react-icons/fi';

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  _id?: string;
}

const statusStyles: Record<Booking['status'], string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  canceled: 'bg-red-50 text-red-700 border-red-200',
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const decoded = jwtDecode<CustomJwtPayload>(token);
      const userId = decoded.id || decoded._id;

      if (!userId) {
        setError('Unable to identify your account.');
        return;
      }

      const response = await axios.get(`/api/bookings/${userId}`);
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    await deleteBooking(selectedBooking._id);
    fetchBookings();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-12 w-64 animate-pulse rounded-full bg-slate-200" />
          <div className="grid gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-48 animate-pulse rounded-[1.75rem] bg-white shadow-sm" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eff6ff_45%,_#f8fafc)] px-4 py-10">
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <BookingCard serviceId={selectedBooking?.serviceId._id || ''} />
      </Modal>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Cancel booking?"
        message="This will cancel the selected booking."
      />

      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_-45px_rgba(15,23,42,0.45)]">
          <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Bookings</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">My bookings</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Review upcoming appointments, reschedule when needed, or cancel a booking.
            </p>
          </div>

          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <FiCalendar />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Total bookings</div>
                  <div className="text-2xl font-semibold text-slate-950">{bookings.length}</div>
                </div>
              </div>

              <button
                onClick={fetchBookings}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <FiRefreshCw />
                Refresh
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {bookings.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <FiSearch className="text-2xl" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-slate-950">No bookings yet</h2>
                <p className="mx-auto mt-2 max-w-md text-slate-600">
                  Your upcoming appointments will appear here once you book a service.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {bookings.map((booking) => (
                  <article
                    key={booking._id}
                    className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
                  >
                    <div className="grid gap-0 sm:grid-cols-[0.95fr_1.05fr]">
                      <img
                        src={booking.serviceId.imagePath}
                        alt={booking.serviceId.name}
                        className="h-full min-h-56 w-full object-cover"
                      />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-950">{booking.serviceId.name}</h3>
                            <p className="mt-1 text-sm text-slate-600">{booking.serviceId.description}</p>
                          </div>
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                              statusStyles[booking.status]
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-slate-400" />
                            <span>{formatDate(booking.slotId.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiClock className="text-slate-400" />
                            <span>
                              {booking.slotId.startTime} - {booking.slotId.endTime}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              handleOpenModal();
                            }}
                            className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsOpen(true);
                            }}
                            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                          >
                            <FiTrash2 />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
