import { axiosInstance } from "@/utils";
import axios from 'axios';

export const getAllServices = async () => {
    try {
        const response = await axiosInstance.get(`/api/services`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getServiceById = async (serviceId: string) => {
    try {
        const response = await axiosInstance.get(`/api/services/${serviceId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addService = async (serviceData: FormData) => {
    try {
        const response = await axiosInstance.post('/api/services', serviceData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
};

export const updateService = async (serviceId: string, serviceData: FormData) => {
    try {
        const response = await axiosInstance.put(`/api/services/${serviceId}`, serviceData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
};


export const deleteService = async (serviceId: string) => {
    try {
        const response = await axiosInstance.delete(`/api/services/${serviceId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};