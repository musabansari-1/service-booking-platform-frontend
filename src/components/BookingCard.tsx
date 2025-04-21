"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataCarousel, TimeSlot } from '.';
import { getSlots } from '@/services/slots';

const BookingCard = ({ serviceId }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeZone, setSelectedTimeZone] = useState('Asia/Kolkata');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [error, setError] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [dates, setDates] = useState([]);

    const fetchSlots = async () => {
        const slots = await getSlots(serviceId);
        console.log('slots', slots);
        const uniqueDates = [...new Set(slots.map(slot => slot.date))]
        console.log('uniqueDates', uniqueDates);
        setDates(uniqueDates);
        setSelectedDate(uniqueDates[0]);
        setTimeSlots(slots);
    }

    useEffect(() => {
       fetchSlots();
    },[])


    // useEffect(() => {
    //     console.log(selectedDate);
    // }, [selectedDate])

    const handleBooking = async () => {
        // e.preventDefault();
        if (!selectedSlot) {
            setError('Please select a time slot.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                serviceId,
                // date: selectedDate,
                // time: selectedSlot,
                // timeZone: selectedTimeZone,
                slotId: selectedSlot._id,
                userId: '6696133852d485188b7ab267' // Replace with the actual user ID from your authentication system
            });
            // Handle successful booking (e.g., show a confirmation message)
            console.log('Booking confirmed:', response.data);
        } catch (error) {
            setError('Failed to book the service.');
            console.error('Error booking service:', error);
        }
    };

    return (
        <div className='mx-auto border-2 rounded-lg shadow-lg w-[50%] h-screen overflow-auto'>
            <DataCarousel dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimeSlot
                startTime="05:00"
                endTime="20:00"
                intervalMinutes={30}
                slots={timeSlots}
                selectedDate = {selectedDate}
                selectedSlot = {selectedSlot}
                setSelectedSlot = {setSelectedSlot}
                selectedTimeZone = {selectedTimeZone}
                setSelectedTimeZone = {setSelectedTimeZone}
            />
            <center>
                <button
                    onClick={handleBooking}
                    className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md hover:bg-blue-600"
                >
                    Confirm Booking
                </button>
            </center>
        </div>
    );
};

export default BookingCard;
