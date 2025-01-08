'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PreviewPage = () => {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<any>();

  useEffect(() => {
    const token = searchParams.get('preview_token');
    if (!token) return;

    fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        '/rcms-api/1/content/preview?preview_token=' +
        token,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors && data.errors.length) {
          return;
        }
        setTopic(data.details);
      });
  }, [searchParams]);

  if (!topic) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          background: '#333',
          color: 'white',
          p: 2,
          borderRadius: '8px',
        }}
      >
        Preview
      </Box>
      <Typography variant="h5" component="h1">
        {topic.subject}
      </Typography>
      <Typography
        dangerouslySetInnerHTML={{
          __html: topic.contents,
        }}
      />
    </Stack>
  );
};

export default Preview;