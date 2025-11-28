'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '3rem', margin: 0 }}>💥</h1>
          <h2 style={{ margin: 0 }}>Something went terribly wrong!</h2>
          <p style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
            We&apos;ve been notified and are working on a fix.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#0070f3',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
        {/* This is the default Next.js error component but hidden */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
};

export default GlobalError;
