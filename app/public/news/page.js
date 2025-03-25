import React from 'react';
import Link from 'next/link';

export default function PublicNewsPage() {
  // Mock news data for SSG
  const newsItems = [
    { id: '1', title: 'サンプルニュース1', date: '2025-03-20' },
    { id: '2', title: 'サンプルニュース2', date: '2025-03-19' },
    { id: '3', title: 'サンプルニュース3', date: '2025-03-18' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <Link 
                href={`/public/news/${item.id}`}
                className="text-lg font-semibold hover:text-blue-600"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
