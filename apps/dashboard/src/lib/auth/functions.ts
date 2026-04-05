import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { auth } from '@/lib/auth/server';

/**
 * Server Function: Get Current User
 *
 * Retrieves the currently authenticated user from the session.
 * This is a server function that can be called from client components.
 *
 * @example
 * ```tsx
 * import { $getUser } from '@/lib/auth/functions';
 *
 * async function loadUser() {
 *   const user = await $getUser();
 *   if (user) {
 *     console.log('Logged in as:', user.email);
 *   }
 * }
 * ```
 *
 * @returns The authenticated user object or null if not authenticated
 * @see {@link https://tanstack.com/start/latest/docs/framework/react/server-functions TanStack Server Functions}
 */
export const $getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getRequest().headers,
  });

  return session?.user || null;
});
