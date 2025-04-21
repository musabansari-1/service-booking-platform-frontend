"use client";

import { useState } from 'react';
import Slider from 'react-slick';

const DateCarousel = ({dates, selectedDate, setSelectedDate}) => {
    
    // Generate an array of dates (for example, next 30 days)
    const today = new Date();
    // const dates = Array.from({ length: 30 }, (_, i) => {
    //     const date = new Date(today);
    //     date.setDate(today.getDate() + i);
    //     return date;
    // });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        swipeToSlide: true,
        touchThreshold: 15,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    const formatDate = (date) => {
        date = date.split('T')[0];
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="mx-auto w-[500px]   mt-10 ">
            <h2 className="text-2xl font-bold mb-4 text-center">Select a Date</h2>
                <Slider {...settings} className='react-slick-slider'>
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`p-4 border rounded-lg ${formatDate(selectedDate) === formatDate(date) ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
                        onClick={() => {
                            setSelectedDate(date);
                        }
                       }
                    >
                        <span className="text-md font-semibold">{formatDate(date)}</span>
                    </div>
                ))}
                </Slider> 
         </div>
    );
};

export default DateCarousel;
