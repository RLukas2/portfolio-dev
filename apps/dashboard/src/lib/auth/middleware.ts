import { createMiddleware } from '@tanstack/react-start';
import { getRequest, setResponseStatus } from '@tanstack/react-start/server';
import { auth } from '@/lib/auth/server';

/**
 * Authentication Middleware
 *
 * Enforces authentication on server functions and API routes.
 * Validates the user session and adds the authenticated user to the request context.
 *
 * If no valid session exists:
 * - Sets HTTP 401 status
 * - Throws an error to halt execution
 *
 * Session caching is disabled to ensure fresh session data on every request,
 * which is important for admin operations.
 *
 * @example
 * ```ts
 * export const Route = createFileRoute('/api/admin/users')({
 *   server: {
 *     middleware: [authMiddleware],
 *     handlers: {
 *       GET: async ({ context }) => {
 *         // context.user is guaranteed to exist here
 *         console.log(context.user.id);
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @throws {Error} Throws "Unauthorized" if no valid session exists
 * @see {@link https://tanstack.com/start/latest/docs/framework/react/middleware TanStack Middleware Docs}
 * @see {@link https://www.better-auth.com/docs/concepts/session-management Better Auth Session Management}
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: getRequest().headers,
    query: {
      // ensure session is fresh
      // https://www.better-auth.com/docs/concepts/session-management#session-caching
      disableCookieCache: true,
    },
  });

  if (!session) {
    setResponseStatus(401);
    throw new Error('Unauthorized');
  }

  return next({ context: { user: session.user } });
});
