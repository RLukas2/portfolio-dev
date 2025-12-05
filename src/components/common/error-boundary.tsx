'use client';

// import * as Sentry from '@sentry/nextjs';
import React, { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to Sentry with additional context
    // Sentry.withScope((scope) => {
    //   scope.setExtra('componentStack', errorInfo.componentStack);
    //   Sentry.captureException(error);
    // });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-4 p-8',
            'rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
          )}
        >
          <h3
            className={cn(
              'text-lg font-semibold text-red-600 dark:text-red-400',
            )}
          >
            Something went wrong
          </h3>
          <p className={cn('text-sm text-red-500 dark:text-red-300')}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button variant="outline" size="sm" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
