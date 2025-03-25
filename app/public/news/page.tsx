import React, { Suspense } from 'react';
import PublicNewsClient from './PublicNewsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | Quick Guide',
  description: 'Latest news and updates',
};

// Prefetch news data for SSG
export default function PublicNewsPage() {
  return (
    <Suspense fallback={<p>読み込み中です...</p>}>
      <PublicNewsClient />
    </Suspense>
  );
}
