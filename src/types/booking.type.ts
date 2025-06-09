import {Service} from './service.types';
import {Slot} from './slot.type';

export interface BookingCardProps {
  serviceId: string;
}

export type Booking = {
  _id: string;
  userId: string;
  serviceId: Service;
  slotId: Slot;
  status: 'pending' | 'confirmed' | 'canceled';
  createdAt: string;
  updatedAt: string;
  __v: number;
};