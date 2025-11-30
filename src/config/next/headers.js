const ContentSecurityPolicy = `
  default-src 'self' vercel.live;
  worker-src 'self' blob:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
  style-src 'self' *.googleapis.com 'unsafe-inline' 'unsafe-eval';
  img-src 'self' *.gstatic.com * blob: data:;
  object-src 'none';
  base-uri 'none';
  media-src 'self';
  connect-src *;
  font-src 'self' *.gstatic.com data:;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
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

module.exports = [
  {
    source: '/(.*)',
    headers: securityHeaders,
  },
  {
    source: '/feed.xml',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/rss+xml;charset=utf-8',
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
