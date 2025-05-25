import React from 'react';
import Link from 'next/link';
import { AiFillStar } from "react-icons/ai";
import {Service} from '@/types';


const ServiceCard = ({ service}: {service: Service}) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden ">
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${service.imagePath.replace(/\\/g, '/')}`}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className='flex justify-between'>
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <span className="text-lg font-bold">${service.price}</span>
        </div>
        <p className="text-gray-700 mb-4 truncate">{service.description}</p>
        <div className="flex items-center justify-between w-full">
            <div className='flex items-center'>
            <AiFillStar />
            <p className="text-gray-700 ">5</p>
            <p className="ml-1 text-gray-400 ">(60)</p>
            </div>
        
          <Link href={`/services/${service._id}`} passHref>
            <button className=" bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
