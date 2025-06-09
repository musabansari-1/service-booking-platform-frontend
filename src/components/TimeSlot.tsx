"use client";

import React from 'react';
import moment from 'moment-timezone';

import { Slot} from '@/types';



interface TimeSlotProps {
  selectedDate: string;
  slots: Slot[];
  startTime: string;           // e.g. '05:00'
  endTime: string;             // e.g. '20:00'
  intervalMinutes: number;
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot) => void;
  selectedTimeZone: string;
  setSelectedTimeZone: (zone: string) => void;
}

const getGMTOffset = (zone: string) => {
  const offset = moment.tz(zone).format('Z'); // Format like '+05:30'
  return `GMT ${offset}`;
};

const TimeSlot: React.FC<TimeSlotProps> = ({
  selectedDate,
  slots,
  startTime,
  endTime,
  intervalMinutes,
  selectedSlot,
  setSelectedSlot,
  selectedTimeZone,
  setSelectedTimeZone
}) => {

  // List of time zones
  const timeZones = moment.tz.names(); // Get all time zone names

  // Generate options with labels including GMT offsets
  const timeZoneOptions = timeZones.map((zone) => ({
    label: `${zone} (${getGMTOffset(zone)})`,
    value: zone
  }));

  // Function to generate time slots (not used currently, but can be used if needed)
  const generateTimeSlots = (start: string, end: string, interval: number) => {
    const generatedSlots: string[] = [];
    let currentTime = moment.tz(`1970-01-01T${start}:00`, selectedTimeZone).toDate();
    const endTimeDate = moment.tz(`1970-01-01T${end}:00`, selectedTimeZone).toDate();

    while (currentTime <= endTimeDate) {
      generatedSlots.push(formatTime(currentTime));
      currentTime = new Date(currentTime.getTime() + interval * 60000); // Add interval
    }

    return generatedSlots;
  };

  // Function to format time in 12-hour format with AM/PM
  const formatTime = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesFormatted} ${ampm}`;
  };

  // Handle slot click
  const handleSlotClick = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className=" p-6 bg-white">
      <h2 className="text-center text-2xl font-bold mb-4">Select Time Slot</h2>

      <div className="mb-6">
        <label htmlFor="timeZone" className="block text-lg font-medium mb-2">
          Select Time Zone:
        </label>
        <select
          id="timeZone"
          value={selectedTimeZone}
          onChange={(e) => setSelectedTimeZone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeZoneOptions.map((zone) => (
            <option key={zone.value} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4  overflow-auto">
        {slots.map((slot) => {
          if (slot.date === selectedDate) {
            return (
              <div
                key={slot._id}
                onClick={() => handleSlotClick(slot)}
                className={`p-3 rounded-lg shadow-md cursor-pointer transition-colors ${
                  selectedSlot?._id === slot._id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {slot.startTime}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TimeSlot;
