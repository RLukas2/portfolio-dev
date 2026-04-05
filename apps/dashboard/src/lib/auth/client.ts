import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { getBaseUrl } from '@/lib/utils';
import type { auth } from './server';

/**
 * Better Auth Client Configuration
 *
 * Creates the authentication client for use in React components.
 * Includes admin plugin for user management and type inference for additional fields.
 *
 * @example
 * ```tsx
 * import authClient from '@/lib/auth/client';
 *
 * // Sign in
 * await authClient.signIn.email({ email, password });
 *
 * // Sign out
 * await authClient.signOut();
 *
 * // Get session
 * const { data: session } = authClient.useSession();
 * ```
 *
 * @see {@link https://www.better-auth.com/docs Better Auth Documentation}
 */
const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

export default authClient;
