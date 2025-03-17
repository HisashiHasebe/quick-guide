import React, { Suspense } from 'react';
import PreviewClient from './PreviewClient';

// サーバーコンポーネントがクライアントコンポーネントをSuspenseでラップ
export default function PreviewPage() {
  return (
    <Suspense fallback={<p>読み込み中です...</p>}>
      <PreviewClient />
    </Suspense>
  );
}