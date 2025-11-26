import { withContentCollections } from '@content-collections/next';
import MillionLint from '@million/lint';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

import appHeaders from './src/config/next/headers';
import redirects from './src/config/next/redirects';

const SentryWebpackPluginOptions = { silent: true };

const isDevelopment = process.env.NODE_ENV === 'development';

// Derive the application URL based on environment variables
const derivedUrl =
  (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  (process.env.RAILWAY_PUBLIC_DOMAIN &&
    `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`) ||
  process.env.RENDER_EXTERNAL_URL ||
  process.env.COOLIFY_URL ||
  `http://localhost:${process.env.PORT ?? 3000}`;

const serverUrl = process.env.SERVER_URL || derivedUrl;

if (process.env.NODE_ENV === 'production') {
  console.log('Derived server URL → ', derivedUrl);
  console.log('SERVER_URL → ', serverUrl);
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Environment variables
  env: {
    // Pass the URL here so it can be used on server and client side
    NEXT_PUBLIC_APP_URL: serverUrl,
    NEXTAUTH_URL: serverUrl,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'utfs.io',
        pathname: '/f/**', // Allow images from the /f/ path on utfs.io
      },
      // Google user content (for google avatars)
      { hostname: 'lh3.googleusercontent.com' },
      // GitHub avatars
      { hostname: 'avatars.githubusercontent.com', protocol: 'https' },
      { hostname: 'i.scdn.co' },
      { hostname: 'spotify.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'ui-avatars.com' },
    ],
    // Add caching headers for images
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  crossOrigin: 'anonymous',
  // Headers for better caching
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           key: "X-XSS-Protection",
  //           value: "1; mode=block",
  //         },
  //         // Cache static assets
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //           regex: "^/static/.*",
  //         },
  //       ],
  //     }
  //   ]
  // },

  async headers() {
    return appHeaders;
  },
  async redirects() {
    return redirects;
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons'],
  },

  // TurboPack configuration
  turbopack: {
    // Configure module resolution aliases
    resolveAlias: {
      // Add any aliases you need here
      '@': './src',
    },

    // Configure file extensions to resolve
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],

    // Configure loaders for special file types
    rules: {
      // Example: SVG as React components
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      // Add other custom loaders here if needed
    },
  },

  // Transpile packages
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core', 'zod'],
};

const millionConfig = {
  mute: true,
  // auto: { rsc: true },
  rsc: true,
};

export default isDevelopment
  ? withContentCollections(MillionLint.next(millionConfig)(nextConfig))
  : withContentCollections(
    MillionLint.next(millionConfig)(
      withSentryConfig(nextConfig, SentryWebpackPluginOptions),
    ),
  );
