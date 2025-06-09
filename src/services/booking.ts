import { axiosInstance } from "@/utils";

export const deleteBooking = async (bookingId: string) => {
    console.log('Here inside delete booking service');
    try {
        const response = await axiosInstance.delete(`/api/bookings/${bookingId}`);
        console.log(response);
    } catch (error) {
        throw error;
    }
};