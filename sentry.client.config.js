import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// Only initialize Sentry after the page has loaded to avoid blocking initial render
if (typeof window !== 'undefined') {
  // Use requestIdleCallback to defer Sentry initialization
  const initSentry = () => {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 0.2,
      // Reduce the amount of data sent to improve performance
      beforeSend(event) {
        return event;
      },
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initSentry, { timeout: 2000 });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(initSentry, 1000);
  }
}
