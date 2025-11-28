'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import Link from '@/components/common/link';
import Container from '@/components/core/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <Container
      className={cn(
        'font-cal h-[calc(100vh-272px)] items-center justify-center gap-4',
      )}
    >
      <h1
        title="Error"
        className={cn(
          'animate-glitch text-7xl',
          'before:animate-glitch-top before:absolute before:left-0 before:content-[attr(title)] before:[clip-path:polygon(0%_0%,100%_0%,100%_33%,0%_33%)]',
          'after:animate-glitch-bottom after:absolute after:left-0 after:content-[attr(title)] after:[clip-path:polygon(0%_67%,100%_67%,100%_100%,0%_100%)]',
        )}
      >
        Oops!
      </h1>
      <h2 className={cn('text-center text-xl')}>Something went wrong! 😵</h2>
      <p className={cn('text-muted-foreground text-center text-sm')}>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className={cn('mt-4 flex gap-4')}>
        <Button variant="secondary" onClick={reset}>
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Go home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
