// src/types/service.types.ts

export interface Availability {
    isOff: boolean;
    startTime: string;
    endTime: string;
  }
  
  export interface ServiceAvailability {
    Monday: Availability;
    Tuesday: Availability;
    Wednesday: Availability;
    Thursday: Availability;
    Friday: Availability;
    Saturday: Availability;
    Sunday: Availability;
  }
  
  export interface Service {
    _id: string; // MongoDB ObjectId as a string
    providerId: string; // Provider's user ID
    name: string;
    description: string;
    imagePath: string;
    price: number;
    duration: number;
    availability: ServiceAvailability;
    __v?: number; // Optional, since it’s removed when sending to client
  }


export interface ServiceDetailProps {
  params: {
    id: string;
  };
};
  
  