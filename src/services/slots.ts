import { axiosInstance } from "@/utils";
import axios from 'axios';

export const getSlots = async (serviceId: string) => {
    const data = {
        serviceId,
    }
    try {
        const response = await axiosInstance.post('/api/services/slots', data);
        return response.data;
    }
    catch(error) {
        throw error;
    }
    
}