"use client";

import { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { DataCarousel, TimeSlot } from '.';
import { toast } from 'react-toastify';
import { getSlots } from '@/services/slots';
import { Slot, BookingCardProps } from '@/types';
import { FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  _id?: string;
}

const BookingCard = ({ serviceId }: BookingCardProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('Asia/Kolkata');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [error, setError] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [userId, setUserId] = useState<string>('');

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const slots: Slot[] = await getSlots(serviceId);
      const uniqueDates = [...new Set(slots.map((slot) => slot.date))];
      setDates(uniqueDates);
      setSelectedDate(uniqueDates[0] || '');
      setTimeSlots(slots);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setError('Failed to load available slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in to book a service.');
      return;
    }

    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setUserId(decoded.id || decoded._id || '');
    } catch (err) {
      setError('Your session is invalid. Please log in again.');
    }
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }

    try {
      setBooking(true);
      if (!userId) {
        setError('Please log in again to continue.');
        return;
      }

      await axios.post('/api/bookings', {
        serviceId,
        slotId: selectedSlot._id,
        userId,
      });

      toast.success('Booking successful!');
      setError('');
    } catch (error) {
      setError('Failed to book the service.');
      console.error('Error booking service:', error);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-full bg-slate-200" />
          <div className="h-40 rounded-[1.5rem] bg-slate-200" />
          <div className="h-16 rounded-[1.5rem] bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_25px_80px_-45px_rgba(15,23,42,0.5)]">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Choose a slot</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Book your appointment</h2>
        <p className="mt-2 text-sm text-slate-600">Pick a date and time that works best for you.</p>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <FiCalendar />
              Selected date
            </div>
            <div className="mt-3 text-lg font-semibold text-slate-950">
              {selectedDate || 'Choose a date'}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <FiClock />
              Selected time
            </div>
            <div className="mt-3 text-lg font-semibold text-slate-950">
              {selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : 'Choose a slot'}
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <DataCarousel
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <TimeSlot
            startTime="05:00"
            endTime="20:00"
            intervalMinutes={30}
            slots={timeSlots}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            selectedTimeZone={selectedTimeZone}
            setSelectedTimeZone={setSelectedTimeZone}
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleBooking}
            disabled={booking || !selectedSlot}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiCheckCircle />
            {booking ? 'Confirming...' : 'Confirm booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
