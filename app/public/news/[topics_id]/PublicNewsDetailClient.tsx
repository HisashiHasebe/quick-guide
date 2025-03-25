"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Link from 'next/link';
import { ENV } from '../../../env';

type NewsDetailResponse = {
  details: {
    topics_id: number;
    ymd: string;
    subject: string;
    contents: string;
    ext_8: {
      id: string;
      url: string;
      desc: string;
      url_org: string;
    };
  };
};

export default function PublicNewsDetailClient({ topicsId }: { topicsId: string }) {
  const [detail, setDetail] = useState<NewsDetailResponse["details"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log(`Fetching news detail: ${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${topicsId}`);
        
        const res = await fetch(
          `${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${topicsId}`,
          {
            method: 'GET',
            // No credentials for public access
          }
        );
        
        if (!res.ok) {
          throw new Error(`Failed to fetch news detail: ${res.status}`);
        }
        
        const data: NewsDetailResponse = await res.json();
        setDetail(data.details);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setError('Failed to load news detail. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [topicsId]);

  if (isLoading) {
    return <p>読み込み中です...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!detail) {
    return <p>データが見つかりませんでした。</p>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            {detail.subject}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {detail.ymd}
          </Typography>
          
          <Typography variant="body1" paragraph 
            sx={{ mt: 3 }}
            dangerouslySetInnerHTML={{ __html: detail.contents }}
          />

          {detail.ext_8 && (
            <CardMedia
              component="img"
              sx={{ mt: 2, mb: 2 }}
              image={detail.ext_8.url}
              alt={detail.ext_8.desc || 'メイン画像'}
            />
          )}
          
          <Button 
            component={Link} 
            href="/public/news"
            variant="outlined" 
            sx={{ mt: 2 }}
          >
            Back to News List
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
