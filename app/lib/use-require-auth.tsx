'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/auth';

const useRequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/signin');
    }
  }, [isLoggedIn, router]);

  return isLoggedIn;
};

export default useRequireAuth;