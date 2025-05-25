// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';  // Your axios instance file
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
        setUser(response.data.user); // Assuming user data is returned in response.data.user
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
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {user?.name}</h1>
        <p className="email">{user?.email}</p>
      </div>

      <div className="profile-info">
        <div className="profile-card">
          <h2>Profile Details</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            {/* Add any other profile info you'd like to display */}
          </div>
        </div>

        <div className="profile-card">
          <h2>Account Settings</h2>
          <button className="edit-btn">Edit Profile</button>
          {/* Logout button logic */}
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
