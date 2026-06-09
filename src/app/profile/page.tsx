'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';
import { FiEdit3, FiLogOut, FiMail, FiUser, FiCalendar } from 'react-icons/fi';

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

  const formatDate = (value?: string) => {
    if (!value) return 'Not available';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eff6ff_45%,_#f8fafc)] px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_30px_100px_-45px_rgba(15,23,42,0.45)]">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-56 rounded-full bg-slate-200" />
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
              <div className="h-72 rounded-[2rem] bg-slate-200" />
              <div className="space-y-4">
                <div className="h-6 w-40 rounded-full bg-slate-200" />
                <div className="h-4 w-full rounded-full bg-slate-200" />
                <div className="h-4 w-5/6 rounded-full bg-slate-200" />
                <div className="h-4 w-2/3 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eff6ff_45%,_#f8fafc)] px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_-45px_rgba(15,23,42,0.45)]">
        <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your profile</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            View and manage your account information from one place.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-slate-200 bg-slate-50 p-8 md:border-b-0 md:border-r">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-slate-950 text-3xl font-semibold text-white shadow-lg">
                {user?.firstName?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
            </div>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Member since</div>
                <div className="mt-2 font-medium text-slate-900">{formatDate(user?.createdAt)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Account status</div>
                <div className="mt-2 font-medium text-emerald-600">Active</div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <FiUser />
                  Full name
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">
                  {user?.firstName} {user?.lastName}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <FiMail />
                  Email
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">{user?.email}</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <FiUser />
                  Gender
                </div>
                <div className="mt-3 text-lg font-semibold capitalize text-slate-900">
                  {user?.gender || 'Not available'}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <FiCalendar />
                  Date of birth
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">{formatDate(user?.dob)}</div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Account actions</h3>
                  <p className="mt-1 text-sm text-slate-600">Update your details or sign out of your account.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push('/edit-profile')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    <FiEdit3 />
                    Edit profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
                  >
                    <FiLogOut />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
