import React from 'react';
import Link from 'next/link';

export function generateStaticParams() {
  return [
    { topics_id: '1' },
    { topics_id: '2' },
    { topics_id: '3' },
  ];
}

export default function NewsDetailPage({ params }) {
  // Mock news details for SSG
  const newsDetails = {
    '1': { title: 'サンプルニュース1', date: '2025-03-20', content: '<p>これはサンプルニュースの内容です。</p>' },
    '2': { title: 'サンプルニュース2', date: '2025-03-19', content: '<p>これはサンプルニュース2の内容です。</p>' },
    '3': { title: 'サンプルニュース3', date: '2025-03-18', content: '<p>これはサンプルニュース3の内容です。</p>' }
  };

  const detail = newsDetails[params.topics_id];

  if (!detail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">データが見つかりませんでした。</p>
        <div className="mt-8">
          <Link 
            href="/public/news"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            ニュース一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{detail.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{detail.date}</p>

          <div 
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: detail.content }}
          />

          <div className="mt-8">
            <Link 
              href="/public/news"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ニュース一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}