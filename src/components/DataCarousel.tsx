// "use client";

// import { useState } from 'react';
// import Slider from 'react-slick';

// const DateCarousel = ({dates, selectedDate, setSelectedDate}) => {
    
//     // Generate an array of dates (for example, next 30 days)
//     const today = new Date();
//     // const dates = Array.from({ length: 30 }, (_, i) => {
//     //     const date = new Date(today);
//     //     date.setDate(today.getDate() + i);
//     //     return date;
//     // });

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         arrows: true,
//         draggable: true,
//         swipeToSlide: true,
//         touchThreshold: 15,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 3,
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 2,
//                 }
//             }
//         ]
//     };

//     const formatDate = (date) => {
//         date = date.split('T')[0];
//         const [year, month, day] = date.split('-');
//         return `${day}-${month}-${year}`;
//     }

//     return (
//         <div className="mx-auto w-[500px]   mt-10 ">
//             <h2 className="text-2xl font-bold mb-4 text-center">Select a Date</h2>
//                 <Slider {...settings} className='react-slick-slider'>
//                 {dates.map((date, index) => (
//                     <div
//                         key={index}
//                         className={`p-4 border rounded-lg ${formatDate(selectedDate) === formatDate(date) ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
//                         onClick={() => {
//                             setSelectedDate(date);
//                         }
//                        }
//                     >
//                         <span className="text-md font-semibold">{formatDate(date)}</span>
//                     </div>
//                 ))}
//                 </Slider> 
//          </div>
//     );
// };

// export default DateCarousel;


"use client";

import Slider from 'react-slick';

interface DateCarouselProps {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DateCarousel: React.FC<DateCarouselProps> = ({ dates, selectedDate, setSelectedDate }) => {
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

  const formatDate = (date: string): string => {
    date = date.split('T')[0];
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Select a Date</h2>
      <div className="shadow-lg rounded-xl bg-white p-4">
        <Slider {...settings} className="react-slick-slider">
          {dates.map((date, index) => {
            const isSelected = formatDate(selectedDate) === formatDate(date);
            return (
              <div key={index} className="px-2">
                <div
                  className={`
                    min-w-[100px] sm:min-w-[120px] md:min-w-[140px] 
                    text-center p-4 rounded-lg cursor-pointer border 
                    transition duration-300 
                    ${isSelected 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-700 border-gray-300'}
                  `}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-sm sm:text-base font-medium">{formatDate(date)}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default DateCarousel;






