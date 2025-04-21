"use client";

import React, { useState } from 'react';
import moment from 'moment-timezone';

const getGMTOffset = (zone: string) => {
  const offset = moment.tz(zone).format('Z'); // Format like '+05:30'
  return `GMT ${offset}`;
};

const TimeSlot = ({ selectedDate, slots, startTime, endTime, intervalMinutes, selectedSlot, setSelectedSlot, selectedTimeZone, setSelectedTimeZone }) => {


  // List of time zones
  const timeZones = moment.tz.names(); // Get all time zone names

  // Generate options with labels including GMT offsets
  const timeZoneOptions = timeZones.map((zone) => ({
    label: `${zone} (${getGMTOffset(zone)})`,
    value: zone
  }));

  // Function to generate time slots
  const generateTimeSlots = (start: string, end: string, interval: number) => {
    const slots = [];
    let currentTime = moment.tz(`1970-01-01T${start}:00`, selectedTimeZone).toDate();
    const endTime = moment.tz(`1970-01-01T${end}:00`, selectedTimeZone).toDate();

    while (currentTime <= endTime) {
      slots.push(formatTime(currentTime));
      currentTime = new Date(currentTime.getTime() + interval * 60000); // Add interval
    }

    return slots;
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
  const handleSlotClick = (slot: string) => {
    console.log(slot);
    setSelectedSlot(slot);
  };

  return (
    <div className=" mx-auto p-6 bg-white ">
      <h2 className=" text-center text-2xl font-bold mb-4">Select Time Slot</h2>

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

      <div className="flex flex-wrap gap-4 h-64 overflow-auto">
        {slots.map((slot, index) => {
          if (slot.date === selectedDate) {
            return (
              <div
                key={index}
                onClick={() => handleSlotClick(slot)}
                className={`p-3 rounded-lg shadow-md cursor-pointer transition-colors ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {slot.startTime}
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default TimeSlot;
