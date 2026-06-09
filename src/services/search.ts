import { axiosInstance } from "@/utils";

export interface SearchFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
}

export interface SearchResult {
  _id: string;
  providerId: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  duration: number;
  availability: any;
}

export const searchServices = async (filters: SearchFilters) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.duration !== undefined) params.append('duration', filters.duration.toString());
    
    const response = await axiosInstance.get(`/api/services/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularDurations = () => [30, 45, 60, 90, 120];