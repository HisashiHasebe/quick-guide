'use client';

import './globals.css';
import { AuthProvider } from './context/auth';
import AuthWrapper from './components/AuthWrapper';
import { ReactNode } from 'react';
import ClientRouting from './components/ClientRouting';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <AuthWrapper>
            {children}
          </AuthWrapper>
          <ClientRouting />
        </AuthProvider>
      </body>
    </html>
  );
}
