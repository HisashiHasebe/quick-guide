'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/auth';

const useRequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 静的エクスポートのためのより積極的なリダイレクト
    if (isLoggedIn === false) {
      // 即時リダイレクト
      router.push('/signin');
    }
  }, [isLoggedIn, router, pathname]);

  return isLoggedIn;
};

export default useRequireAuth;