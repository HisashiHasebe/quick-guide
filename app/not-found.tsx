'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button, Container, Typography, Box } from '@mui/material';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  
  // If this is a public news detail page, redirect to the news list
  useEffect(() => {
    if (pathname?.startsWith('/public/news/')) {
      // Attempt to load the page dynamically
      // The actual logic for loading will be handled by the client-side routing
    }
  }, [pathname, router]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Box mt={4}>
        <Button 
          component={Link} 
          href="/"
          variant="contained"
        >
          Go back home
        </Button>
      </Box>
    </Container>
  );
}
