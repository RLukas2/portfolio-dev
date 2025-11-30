import '@/styles/global.css';

import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import {
  Fira_Code as FiraCode,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import localFont from 'next/font/local';

import Footer from '@/components/core/footer';
import Header from '@/components/core/header';
import ConsoleMessage from '@/components/effects/console-message';
import Analytics from '@/components/provider/analytics';
import AppProvider from '@/components/provider/app-provider';
import SpeedInsight from '@/components/provider/speed-insight';
import { Toaster } from '@/components/ui/toaster';
import { DEFAULT_METADATA, seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

// Lazy load heavy client components to reduce initial bundle size
const StarBackground = dynamic(
  () => import('@/components/effects/background'),
  { ssr: true },
);

const GuestbookWidget = dynamic(
  () => import('@/features/guestbook/components/guestbook-widget'),
  { ssr: true },
);

const NowPlaying = dynamic(
  () => import('@/features/now-playing/components/now-playing'),
  { ssr: true },
);

export const metadata: Metadata = seo({
  ...DEFAULT_METADATA,
  openGraph: {
    images: ['/media/site/og-image.png'],
  },
  twitter: {
    images: ['/media/site/og-image.png'],
  },
});

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  width: 'device-width',
};

const fontCal = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  display: 'swap',
});

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = FiraCode({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className="scroll-smooth" suppressHydrationWarning>
    <head>
      <meta
        name="apple-mobile-web-app-title"
        content={DEFAULT_METADATA.applicationName ?? ''}
      />

      <meta
        name="google-site-verification"
        content="k6PyMiGShL7wrz11l4Nvahbt-UpiTcg4o1peE9-HOhI"
      />
    </head>
    <body
      className={cn(fontSans.variable, fontMono.variable, fontCal.variable)}
      suppressHydrationWarning
    >
      <ConsoleMessage />
      <AppProvider>
        <div id="__app" className={cn('flex min-h-screen flex-col')}>
          <StarBackground />
          <Header />
          <main>{children}</main>
          <Footer />
          <GuestbookWidget />
          <NowPlaying />
        </div>
        <Analytics />
        <SpeedInsight />
        <Toaster />
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
