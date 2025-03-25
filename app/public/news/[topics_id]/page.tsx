import { Metadata } from 'next';
import React, { Suspense } from 'react';
import PublicNewsDetailClient from './PublicNewsDetailClient';

// Metadata generation for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { topics_id: string } 
}): Promise<Metadata> {
  return {
    title: `News ${params.topics_id} | Quick Guide`,
    description: `Details for news item ${params.topics_id}`,
  };
}

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  try {
    // Fetch news items for pre-rendering
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      // Fallback to some default IDs if API fails
      return [
        { topics_id: '1' },
        { topics_id: '2' },
        { topics_id: '3' },
      ];
    }
    
    const data = await response.json();
    return data.list.map((item: { topics_id: string }) => ({
      topics_id: String(item.topics_id),
    }));
  } catch (error) {
    console.error('Error fetching static params:', error);
    // Fallback to some default IDs
    return [
      { topics_id: '1' },
      { topics_id: '2' },
      { topics_id: '3' },
    ];
  }
}

export default function PublicNewsDetailPage({ 
  params 
}: {
  params: { topics_id: string }
}) {
  return (
    <Suspense fallback={<p>読み込み中です...</p>}>
      <PublicNewsDetailClient topicsId={params.topics_id} />
    </Suspense>
  );
}
