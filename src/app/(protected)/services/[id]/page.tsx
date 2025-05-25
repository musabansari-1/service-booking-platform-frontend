"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getServiceById } from '@/services/service';
import { BookingCard, DataCarousel, Modal, TimeSlot } from '@/components';
import {Service, ServiceDetailProps} from '@/types';

const ServiceDetail = ({ params}:ServiceDetailProps) => {
    const router = useRouter();
    const id = params.id;
    const [service, setService] = useState<Service>();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    const fetchService = async (id: string) => {
        try {
            console.log('Here');
            const response = await getServiceById(id);
            console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/${response.imagePath.replace(/\\/g, '/')}`);
            setService(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchService(id);
        }
    }, [id]);

    const handleBooking = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!date || !time) {
            setError('Date and Time are required.');
            return;
        }

        try {
            const response = await axios.post('/api/book-service', {
                serviceId: id,
                date,
                time,
                userId: 'YOUR_USER_ID' // Replace with the actual user ID from your authentication system
            });
            // Handle successful booking (e.g., show a confirmation message)
            console.log('Booking confirmed:', response.data);
        } catch (error) {
            setError('Failed to book the service.');
            console.error('Error booking service:', error);
        }
    };

    if (!service) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
                {service.imagePath && (
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${service.imagePath.replace(/\\/g, '/')}`}
                        alt={service.name}
                        className="w-full md:w-1/2 object-cover rounded-lg mb-6 md:mb-0 md:mr-6"
                    />
                )}
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="mb-4">
                        <span className="text-xl font-semibold">Price: </span>
                        <span className="text-xl">${service.price}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-xl font-semibold">Duration: </span>
                        <span className="text-xl">{service.duration} hours</span>
                    </div>

                    {/* Booking Form */}
                    {/* <form onSubmit={handleBooking} className="mt-6">
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time:</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Book Service
                        </button>
                    </form> */}
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={handleOpenModal}
                    >
                        Book Service
                    </button>

                </div>
            </div>
            {/* <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                        <h1>Hello World</h1>
            </Modal> */}
            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <BookingCard  serviceId = {id}/>
            </Modal>
        </div>
    );
};

export default ServiceDetail;
