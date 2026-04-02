import { db } from '@xbrk/db/client';
import type { BetterAuthOptions } from 'better-auth';
import { betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, oAuthProxy } from 'better-auth/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

/**
 * Initializes a Better Auth instance with Drizzle adapter and optional social providers.
 *
 * Social providers (GitHub, Twitter, Google, Facebook) are only registered when
 * their respective client ID and secret are provided — omitting them disables that provider
 * without throwing an error.
 *
 * Includes the `admin` plugin for user management and `oAuthProxy` for redirect handling
 * in non-production environments.
 */
export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  githubClientId?: string;
  githubClientSecret?: string;
  twitterClientId?: string;
  twitterClientSecret?: string;
  googleClientId?: string;
  googleClientSecret?: string;
  facebookClientId?: string;
  facebookClientSecret?: string;
}) {
  const config: BetterAuthOptions = {
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    telemetry: {
      enabled: false,
    },
    plugins: [
      oAuthProxy({
        productionURL: options.productionUrl,
      }),
      admin(),
      tanstackStartCookies(),
    ],
    socialProviders: {
      ...(options.githubClientId &&
        options.githubClientSecret && {
          github: {
            clientId: options.githubClientId,
            clientSecret: options.githubClientSecret,
            redirectURI: `${options.productionUrl}/api/auth/callback/github`,
          },
        }),
      ...(options.twitterClientId &&
        options.twitterClientSecret && {
          twitter: {
            clientId: options.twitterClientId,
            clientSecret: options.twitterClientSecret,
            redirectURI: `${options.productionUrl}/api/auth/callback/twitter`,
          },
        }),
      ...(options.googleClientId &&
        options.googleClientSecret && {
          google: {
            clientId: options.googleClientId,
            clientSecret: options.googleClientSecret,
            prompt: 'select_account consent',
            redirectURI: `${options.productionUrl}/api/auth/callback/google`,
          },
        }),
      ...(options.facebookClientId &&
        options.facebookClientSecret && {
          facebook: {
            clientId: options.facebookClientId,
            clientSecret: options.facebookClientSecret,
            redirectURI: `${options.productionUrl}/api/auth/callback/facebook`,
          },
        }),
    },
    onAPIError: {
      onError(error, ctx) {
        console.error('Auth API Error:', error, ctx);
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
      additionalFields: {
        twitterHandle: {
          type: 'string',
          required: false,
        },
      },
    },
  };

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth['$Infer']['Session'];
