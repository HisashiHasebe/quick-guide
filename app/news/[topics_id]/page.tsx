import React, { Suspense } from 'react';
import NewsDetailClient from './NewsDetailClient';

// サーバーコンポーネントがクライアントコンポーネントをSuspenseでラップ
export default function NewsDetailPage({ params }: { params: { topics_id: string } }) {
  return (
    <Suspense fallback={<p>読み込み中です...</p>}>
      <NewsDetailClient topicsId={params.topics_id} />
    </Suspense>
  );
}