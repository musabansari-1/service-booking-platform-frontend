"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { FiMenu, FiX, FiLogOut, FiUser, FiCalendar } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((current) => !current);
  const toggleProfile = () => setProfileOpen((current) => !current);

  const closeDropdowns = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeDropdowns();
    router.push("/login");
  };

  const navLinkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      pathname === href
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={closeDropdowns}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15 transition group-hover:scale-105">
            <span className="text-lg font-semibold">A</span>
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-950">
              At<span className="text-slate-500">Ur</span>Service
            </div>
            <div className="text-xs text-slate-500">Book trusted services nearby</div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/bookings" className={navLinkClass("/bookings")}>
            <span className="inline-flex items-center gap-2">
              <FiCalendar />
              My Bookings
            </span>
          </Link>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FaCircleUser size={22} />
              <span className="hidden text-sm font-medium lg:inline">Account</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.5)]">
                <Link
                  href="/profile"
                  onClick={closeDropdowns}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <FiUser />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg md:hidden">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={closeDropdowns}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Home
            </Link>
            <Link
              href="/bookings"
              onClick={closeDropdowns}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <FiCalendar />
              My Bookings
            </Link>
            <Link
              href="/profile"
              onClick={closeDropdowns}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <FiUser />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
