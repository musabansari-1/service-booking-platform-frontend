"use client";

import { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { DataCarousel, TimeSlot } from '.';
import { toast } from 'react-toastify';

import { getSlots } from '@/services/slots';


// Define the slot type if not already available
import {Slot,BookingCardProps} from '@/types';



const BookingCard = ({ serviceId }: BookingCardProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('Asia/Kolkata');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [error, setError] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const fetchSlots = async () => {
    try {
      const slots: Slot[] = await getSlots(serviceId);
      console.log('slots', slots);
      const uniqueDates = [...new Set(slots.map(slot => slot.date))];
      console.log('uniqueDates', uniqueDates);
      setDates(uniqueDates);
      setSelectedDate(uniqueDates[0] || '');
      setTimeSlots(slots);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }

    try {
      const response = await axios.post('/api/bookings', {
        serviceId,
        slotId: selectedSlot._id,
        userId: '6696133852d485188b7ab267', // Replace with dynamic ID in production
      });

      console.log('Booking confirmed:', response.data);
      toast.success("Booking successful!");
      setError('');
    } catch (error) {
      setError('Failed to book the service.');
      console.error('Error booking service:', error);
    }
  };

  return (
    // <div className="mx-auto border-2 rounded-lg shadow-lg w-[50%] h-screen overflow-auto">
    // <div className="mx-auto max-w-5xl w-full border-2 rounded-lg shadow-lg p-4">
    <div className="mx-auto max-w-4xl w-full h-[90vh] overflow-y-auto border rounded-lg shadow-lg p-4 bg-white">
      <DataCarousel
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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

      <center>
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md hover:bg-blue-600"
        >
          Confirm Booking
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </center>
    </div>
  );
};

export default BookingCard;
