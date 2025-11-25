import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  /**
   * Environment variables available on the client (and server).

   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   *
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
    NEXT_PUBLIC_AVAILABLE_FOR_HIRE: z
      .preprocess((val) => val === 'true', z.boolean())
      .default(false),
  },

  /**
   * Server-side Environment variables, not available on the client. Will throw
   * if you access these variables on the client.
   *
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /** database */
    DATABASE_URL: z.url().optional(),
    DIRECT_URL: z.url().optional(),
    /** next-auth */
    NEXTAUTH_URL: z.url().optional(),
    NEXTAUTH_SECRET: z.string().trim().min(1).optional(),
    /** sentry */
    SENTRY_DSN: z.url().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    /** google */
    GOOGLE_ID: z.string().optional(),
    GOOGLE_SECRET: z.string().optional(),
    /** github */
    GITHUB_ID: z.string().optional(),
    GITHUB_SECRET: z.string().optional(),
    GITHUB_READ_USER_TOKEN_PERSONAL: z.string().optional(),
    /** spotify */
    SPOTIFY_CLIENT_ID: z.string().optional(),
    SPOTIFY_CLIENT_SECRET: z.string().optional(),
    SPOTIFY_CLIENT_REFRESH_TOKEN: z.string().optional(),
    /** wakatime */
    WAKATIME_API_KEY: z.string().optional(),
  },

  /**
   * Shared between server and client
   */
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },

  runtimeEnv: {
    /** Client */
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_AVAILABLE_FOR_HIRE: process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE,

    /** Server */

    /** database */
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,

    /** next-auth */
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    /** sentry */
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,

    /** google */
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    /** github */
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GITHUB_READ_USER_TOKEN_PERSONAL:
      process.env.GITHUB_READ_USER_TOKEN_PERSONAL,

    /** spotify */
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_CLIENT_REFRESH_TOKEN: process.env.SPOTIFY_CLIENT_REFRESH_TOKEN,

    /** wakatime */
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,

    /** Shared */
    NODE_ENV: process.env.NODE_ENV,
  },
});

export default env;
