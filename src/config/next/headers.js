const ContentSecurityPolicy = [
  "default-src 'self' vercel.live",
  "worker-src 'self' blob:",
  // explicit element/attribute directives for scripts
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com https://www.google-analytics.com https://*.googletagmanager.com",
  "script-src-elem 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://www.google-analytics.com cdn.vercel-insights.com vercel.live va.vercel-scripts.com",
  "script-src-attr 'unsafe-hashes' 'unsafe-inline' *",
  // styles — avoid unsafe-eval and only allow inline if you must
  "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
  // images — allow only required hosts + data/blob if you need them
  "img-src 'self' https://www.google-analytics.com https://*.googletagmanager.com https://*.gstatic.com https://*.basemaps.cartocdn.com * data: blob:",
  "font-src 'self' https://fonts.gstatic.com data:",
  // "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net cdn.vercel-insights.com vercel.live vitals.vercel-insights.com https://*.ingest.sentry.io wss://vercel.live",
  "connect-src 'self' *", // Uncommented to allow all connections
  'frame-src https://*.googletagmanager.com *',
  "object-src 'none'",
  "base-uri 'none'",
  "media-src 'self'",
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

// Cache control headers for static assets
const staticCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];

// Cache control for images
const imageCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=86400, stale-while-revalidate=31536000',
  },
];

// Cache control for HTML pages (ISR/SSG pages)
const pageCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, s-maxage=60, stale-while-revalidate=300',
  },
];

module.exports = [
  {
    source: '/(.*)',
    headers: securityHeaders,
  },
  // Cache HTML pages for better TTFB (excludes API routes and static assets)
  {
    source: '/((?!api|_next/static|_next/image|favicon.ico|feed.xml).*)',
    headers: pageCacheHeaders,
  },
  {
    source: '/feed.xml',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/rss+xml;charset=utf-8',
      },
      {
        key: 'Cache-Control',
        value: 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    ],
  },
  // Cache static assets (fonts, js, css) for 1 year
  {
    source: '/fonts/:path*',
    headers: staticCacheHeaders,
  },
  {
    source: '/_next/static/:path*',
    headers: staticCacheHeaders,
  },
  // Cache images for 1 day with stale-while-revalidate
  {
    source: '/media/:path*',
    headers: imageCacheHeaders,
  },
  {
    source: '/_next/image/:path*',
    headers: imageCacheHeaders,
  },
  // Cache emojis and other static public assets
  {
    source: '/emojis/:path*',
    headers: staticCacheHeaders,
  },
];
