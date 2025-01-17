"use client";
import React, { useState, useEffect, use } from "react";
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

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

export default function NewsDetailPage(props: { params: Promise<{ topics_id: string }> }) {
  const params = use(props.params);
  const [detail, setDetail] = useState<NewsDetailResponse["details"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${params.topics_id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!res.ok) {
          setError("エラーが発生しました。");
          return;
        }
        const data: NewsDetailResponse = await res.json();
        setDetail(data.details);
      } catch (err) {
        setError("通信エラーが発生しました。");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.topics_id]);

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
            詳細画面サンプル
          </Typography>
          <Typography variant="body1" paragraph>
            トピックス ID: {detail.topics_id}
          </Typography>
          <Typography variant="body1" paragraph>
            日付: {detail.ymd}
          </Typography>
          <Typography variant="body1" paragraph>
            タイトル: {detail.subject}
          </Typography>
          <Typography variant="body1" paragraph>
            内容: {detail.contents}
          </Typography>

          {detail.ext_8 && (
            <CardMedia
              component="img"
              sx={{ mt: 2 }}
              image={detail.ext_8.url}
              alt={detail.ext_8.desc || 'メイン画像'}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
} 