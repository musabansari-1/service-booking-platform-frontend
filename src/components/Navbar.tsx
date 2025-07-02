// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { FaCircleUser } from "react-icons/fa6";


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const router = useRouter();



//   const toggleMenu = () => setIsOpen(!isOpen);
//   const toggleProfile = () => setProfileOpen(!profileOpen);

//   const handleLogout = () => {
//     // Clear token from localStorage
//     localStorage.removeItem('token');
//     // Redirect to login page
//     router.push('/login');
//   };

//   return (
//     <nav className="bg-white shadow-md relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Mobile menu button */}
//           <div className="sm:hidden">
//             <button
//               onClick={toggleMenu}
//               className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-700 focus:outline-none"
//             >
//               {isOpen ? (
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                 </svg>
//               )}
//             </button>
//           </div>

//           {/* Logo and Nav Links */}
//           <div className="flex items-center justify-between w-full">
//             <Link href="/"><span className="text-xl font-bold text-gray-900">AtUrService</span></Link>
//             {/* <div className="hidden sm:flex space-x-6 ml-6">
//               <Link href="/"><span className="text-gray-800 hover:text-blue-600">Home</span></Link>
//               <Link href="/about"><span className="text-gray-800 hover:text-blue-600">About</span></Link>
//               <Link href="/services"><span className="text-gray-800 hover:text-blue-600">Services</span></Link>
//               <Link href="/contact"><span className="text-gray-800 hover:text-blue-600">Contact</span></Link>
//             </div> */}

//             {/* Profile Icon */}
//             <div className="relative ml-4 mt-auto mb-auto">
//               <button onClick={toggleProfile} className="focus:outline-none">
//                 <FaCircleUser size={24}/>
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
//                   <Link href="/profile">
//                     <span
//                       onClick={() => setProfileOpen(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Profile
//                     </span>
//                   </Link>
//                   <Link href="/bookings">
//                     <span
//                       onClick={() => setProfileOpen(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       My Bookings
//                     </span>
//                   </Link>
//                   <Link href="/settings">
//                     <span
//                       onClick={() => setProfileOpen(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Settings
//                     </span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile dropdown */}
//       {isOpen && (
//         <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
//           <Link href="/"><span className="block text-gray-800 px-3 py-2 rounded-md">Home</span></Link>
//           <Link href="/about"><span className="block text-gray-800 px-3 py-2 rounded-md">About</span></Link>
//           <Link href="/services"><span className="block text-gray-800 px-3 py-2 rounded-md">Services</span></Link>
//           <Link href="/contact"><span className="block text-gray-800 px-3 py-2 rounded-md">Contact</span></Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
  <span className="text-2xl font-extrabold text-blue-600 tracking-wide">
    At<span className="text-gray-900">Ur</span>Service
  </span>
</Link>
          </div>

          {/* Right: Links and Profile */}
          <div className="flex items-center space-x-6">
            <Link href="/bookings">
              <span className="text-gray-800 hover:text-blue-600 cursor-pointer hidden sm:inline">My Bookings</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative align-middle mt-auto mb-auto">
              <button onClick={toggleProfile} className="focus:outline-none">
                <FaCircleUser size={24} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link href="/profile">
                    <span
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Profile
                    </span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          {/* <Link href="/">
            <span className="block text-gray-800 px-3 py-2 rounded-md">Home</span>
          </Link> */}
          <Link href="/bookings">
            <span className="block text-gray-800 px-3 py-2 rounded-md">My Bookings</span>
          </Link>
          {/* <Link href="/about">
            <span className="block text-gray-800 px-3 py-2 rounded-md">About</span>
          </Link>
          <Link href="/services">
            <span className="block text-gray-800 px-3 py-2 rounded-md">Services</span>
          </Link>
          <Link href="/contact">
            <span className="block text-gray-800 px-3 py-2 rounded-md">Contact</span>
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


