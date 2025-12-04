'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';

import env from '@/lib/env';

/**
 * Analytics Component - Performance Optimized
 * Uses 'lazyOnload' strategy to defer analytics loading until after page is interactive.
 * This prevents analytics from blocking initial page render and improves TBT.
 */
const Analytics = () => {
  const GA_ID = env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <>
      <VercelAnalytics />

      {GA_ID && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />

          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
};

export default Analytics;
