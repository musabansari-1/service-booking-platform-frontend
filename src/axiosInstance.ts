// src/axiosInstance.ts

import axios from 'axios';

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,  // Replace with your backend URL
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // If token exists, attach it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Return the modified config object
  },
  (error) => {
    return Promise.reject(error); // Reject if there's an error in the request
  }
);

export default axiosInstance;
