'use client';

import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ENV } from '../../env';

type Topic = {
  topics_id: string;
  subject: string;
  inst_ymdhi: string;
  ext_8: {
    url: string;
  };
};

export default function PublicNewsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Topic[]>();
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentPage = searchParams.get('page') || '1';

    setIsLoading(true);
    console.log(`Fetching news list: ${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list?pageID=${currentPage}`);
    
    fetch(
      `${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list?pageID=${currentPage}`,
      {
        method: 'GET',
        // No credentials for public access
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.errors && data.errors.length) {
          setError(data.errors[0].message || 'Error loading news');
          return;
        }
        setItems(data.list);
        setPageCount(data.pageInfo?.totalPageCnt || 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
        setIsLoading(false);
      });
  }, [searchParams]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', String(page));
    router.push(`/public/news?${newParams.toString()}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!items || items.length === 0) return <p>No news items found</p>;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1">
        News
      </Typography>

      <Box>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.topics_id} item xs={12} sm={6} md={4}>
              <Card>
                <Link href={`/public/news/${item.topics_id}`} passHref>
                  <CardActionArea>
                    {item.ext_8 && (
                      <CardMedia
                        component="img"
                        height="194"
                        image={item.ext_8.url}
                        alt=""
                      />
                    )}
                    <Box sx={{ p: 2 }}>
                      <Typography>{item.subject}</Typography>
                      <Typography>
                        {format(new Date(item.inst_ymdhi), 'yyyy/MM/dd')}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pagination
        onChange={handlePageChange}
        count={pageCount}
      />
    </Stack>
  );
}
