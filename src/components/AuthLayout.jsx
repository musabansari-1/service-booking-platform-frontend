// components/AuthLayout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    }
  }, []);

  return <>{children}</>;
}
