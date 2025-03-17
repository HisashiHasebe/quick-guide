import React, { Suspense } from 'react';
import NewsClient from './NewsClient';

// サーバーコンポーネントがクライアントコンポーネントをSuspenseでラップ
export default function NewsPage() {
  return (
    <Suspense fallback={<p>読み込み中です...</p>}>
      <NewsClient />
    </Suspense>
  );
}