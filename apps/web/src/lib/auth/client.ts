import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { getBaseUrl } from '@/lib/utils';
import type { auth } from './server';

const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

export default authClient;
