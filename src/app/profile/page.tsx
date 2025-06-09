// // // src/app/profile/page.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import axiosInstance from '../../axiosInstance';  // Your axios instance file
// // import { useRouter } from 'next/navigation';

// // const Profile = () => {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       try {
// //         const response = await axiosInstance.get('/api/auth/me');
// //         setUser(response.data.user); // Assuming user data is returned in response.data.user
// //       } catch (err) {
// //         setError('Unable to fetch profile data');
// //         router.push('/login');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [router]);

// //   const handleLogout = () => {
// //     // Clear token from localStorage
// //     localStorage.removeItem('token');
// //     // Redirect to login page
// //     router.push('/login');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="loading-screen">
// //         <p>Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <p>{error}</p>;
// //   }

// //   return (
// //     <div className="profile-container">
// //       <div className="profile-header">
// //         <h1>Welcome, {user?.name}</h1>
// //         <p className="email">{user?.email}</p>
// //       </div>

// //       <div className="profile-info">
// //         <div className="profile-card">
// //           <h2>Profile Details</h2>
// //           <div className="profile-details">
// //             <p><strong>Name:</strong> {user?.name}</p>
// //             <p><strong>Email:</strong> {user?.email}</p>
// //             {/* Add any other profile info you'd like to display */}
// //           </div>
// //         </div>

// //         <div className="profile-card">
// //           <h2>Account Settings</h2>
// //           <button className="edit-btn">Edit Profile</button>
// //           {/* Logout button logic */}
// //           <button className="logout-btn" onClick={handleLogout}>Log out</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;


// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '../../axiosInstance';
// import { useRouter } from 'next/navigation';

// const Profile = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axiosInstance.get('/api/auth/me');
//         console.log(response.data);
//         setUser(response.data.user);
//       } catch (err) {
//         setError('Unable to fetch profile data');
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="w-64 h-32 bg-gray-300 animate-pulse rounded-lg" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column */}
//           <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col items-center justify-center">
//             <div className="w-24 h-24 rounded-full bg-white text-indigo-600 font-bold text-2xl flex items-center justify-center shadow-md">
//               {user?.firstName?.charAt(0).toUpperCase()}
//             </div>
//             <h2 className="mt-4 text-2xl font-semibold">{user?.firstName}</h2>
//             <p className="text-sm">{user?.email}</p>
//           </div>

//           {/* Right Column */}
//           <div className="md:w-2/3 p-8 space-y-6">
//             <h3 className="text-xl font-bold text-gray-800">Profile Details</h3>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm text-gray-500">Full Name</p>
//                 <p className="text-md font-medium text-gray-800">{user?.firstName + " " +user?.lastName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email Address</p>
//                 <p className="text-md font-medium text-gray-800">{user?.email}</p>
//               </div>
//             </div>

//             <div className="pt-6 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
//               <div className="flex gap-4">
//                 <button
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                 >
//                   Log out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        setUser(response.data.user);
      } catch (err) {
        setError('Unable to fetch profile data');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-64 h-32 bg-gray-300 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Column */}
          <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white text-indigo-600 font-bold text-4xl flex items-center justify-center shadow-md">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{user?.firstName}</h2>
            <p className="text-sm">{user?.email}</p>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Profile Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-md font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-md font-medium text-gray-800">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-md font-medium text-gray-800 capitalize">{user?.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-md font-medium text-gray-800">{formatDate(user?.dob)}</p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="text-md font-medium text-gray-800 capitalize">{user?.type}</p>
              </div> */}
              <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="text-md font-medium text-gray-800">{formatDate(user?.createdAt)}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
              <div className="flex gap-4">
                <button onClick={() => router.push('/edit-profile')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



