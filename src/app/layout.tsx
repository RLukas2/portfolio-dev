import '@/styles/global.css';

import type { Metadata, Viewport } from 'next';
import {
  Fira_Code as FiraCode,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import localFont from 'next/font/local';

import Analytics from '@/components/analytics';
import AppProvider from '@/components/app-provider';
import HomePageStars from '@/components/background';
import Footer from '@/components/core/footer';
import Header from '@/components/core/header';
import { Toaster } from '@/components/ui/toaster';
import GuestbookWidget from '@/features/guestbook/components/guestbook-widget';
import NowPlaying from '@/features/now-playing/components/now-playing';
import { DEFAULT_METADATA, seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

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
});

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = FiraCode({
  subsets: ['latin'],
  variable: '--font-mono',
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className="scroll-smooth" suppressHydrationWarning>
    <head>
      <meta
        name="apple-mobile-web-app-title"
        content={DEFAULT_METADATA.applicationName ?? ''}
      />

      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css"
        integrity="sha384-WcoG4HRXMzYzfCgiyfrySxx90XSl2rxY5mnVY5TwtWE6KLrArNKn0T/mOgNL0Mmi"
        crossOrigin="anonymous"
      />

      {/* KaTeX JS */}
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.js"
        integrity="sha384-J+9dG2KMoiR9hqcFao0IBLwxt6zpcyN68IgwzsCSkbreXUjmNVRhPFTssqdSGjwQ"
        crossOrigin="anonymous"
      />
    </head>
    <body
      className={cn(fontSans.variable, fontMono.variable, fontCal.variable)}
      suppressHydrationWarning
    >
      <AppProvider>
        <div id="__app" className={cn('flex min-h-screen flex-col')}>
          <HomePageStars />
          <Header />
          <main>{children}</main>
          <Footer />
          <GuestbookWidget />
          <NowPlaying />
        </div>
        <Analytics />
        <Toaster />
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
