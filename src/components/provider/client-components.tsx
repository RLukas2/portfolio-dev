'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical client-only components
export const StarBackground = dynamic(
  () => import('@/components/effects/background'),
  { ssr: false },
);

export const NowPlaying = dynamic(
  () => import('@/features/now-playing/components/now-playing'),
  { ssr: false },
);

export const Analytics = dynamic(
  () => import('@/components/provider/analytics'),
  { ssr: false },
);

export const AnalyticsTracker = dynamic(
  () => import('@/components/provider/analytics-tracker'),
  { ssr: false },
);

export const SpeedInsight = dynamic(
  () => import('@/components/provider/speed-insight'),
  { ssr: false },
);

export const ConsoleMessage = dynamic(
  () => import('@/components/effects/console-message'),
  { ssr: false },
);
