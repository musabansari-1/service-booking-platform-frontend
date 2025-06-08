"use client";

import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  id: string; // since backend uses decoded.id
}


const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const decoded = jwtDecode<CustomJwtPayload>(token);
        const userId = decoded.id;

        console.log(decoded.id);

        if (!userId) {
          setError('Invalid token: user ID not found.');
          setLoading(false);
          return;
        }

        console.log('userId');
        console.log(userId);

        const response = await axios.get(`/api/bookings/6696133852d485188b7ab267`);

        console.log('Bookings');
        console.log(response.data);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // Uncomment below if you want time as well
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: true
  });
};

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  const statusStyles = {
    confirmed: 'text-green-600 font-semibold',
    pending: 'text-yellow-500 font-semibold',
    canceled: 'text-red-600 font-semibold'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {bookings.map((booking) => (
        <div
          key={booking._id}
          className="flex bg-white rounded-xl shadow-md p-4 mb-4 items-center"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${booking.serviceId.imagePath.replace(/\\/g, '/')}`}
            alt="Service"
            className="w-[40%] h-[100%] object-cover rounded-lg mr-4"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{booking.serviceId.name}</h3>
            <p className="text-gray-600">Provider: {booking.provider}</p>
            <p className="text-gray-600">Date: {formatDate(booking.slotId.date)}</p>
            <p className="text-gray-600">Time: {booking.slotId.startTime} - {booking.slotId.endTime}</p>
            <p>
              Status:{' '}
              <span className={statusStyles[booking.status.toLowerCase()]}>
                {booking.status}
              </span>
            </p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Reschedule
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Cancel
              </button>
              {/* <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                View Details
              </button> */}
            </div>
          </div>
        </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
