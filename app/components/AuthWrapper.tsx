'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/auth';

// 認証が必要なルートを定義
const PROTECTED_ROUTES = ['/news', '/contact'];

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // 現在のパスが保護されたルートかどうかをチェック
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // ログインしていない状態で保護されたルートにアクセスした場合、サインインページにリダイレクト
    if (isLoggedIn === false && isProtectedRoute) {
      router.push('/signin');
    }

    setIsAuthChecked(true);
  }, [isLoggedIn, pathname, router]);

  // 認証チェックが完了するまで子コンポーネントをレンダリングしない
  // これにより、リダイレクト前に保護されたコンテンツが一瞬表示されるのを防ぐ
  if (!isAuthChecked) {
    return null;
  }

  // 保護されたルートの場合、ログインしている場合のみ子コンポーネントをレンダリング
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && isLoggedIn === false) {
    return null;
  }

  return <>{children}</>;
}