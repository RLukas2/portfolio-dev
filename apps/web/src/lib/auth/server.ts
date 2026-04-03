import { initAuth } from '@xbrk/auth';
import { env } from '@/lib/env/server';
import { getBaseUrl } from '@/lib/utils';

// `productionUrl` is the canonical URL registered with OAuth providers (fixed per deployment).
// `baseUrl` is the runtime URL (may differ in preview deployments).
const productionUrl = env.VITE_APP_URL ?? getBaseUrl();

export const auth = initAuth({
  baseUrl: getBaseUrl(),
  productionUrl,

  secret: env.BETTER_AUTH_SECRET,
  githubClientId: env.GITHUB_CLIENT_ID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET,
  twitterClientId: env.TWITTER_CLIENT_ID,
  twitterClientSecret: env.TWITTER_CLIENT_SECRET,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  facebookClientId: env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: env.FACEBOOK_CLIENT_SECRET,
});
