import { queryOptions } from '@tanstack/react-query';
import { $getUser } from './functions';

/**
 * React Query Options for User Authentication
 *
 * Creates query options for fetching the current authenticated user.
 * Used with TanStack Query's useQuery or useSuspenseQuery hooks.
 *
 * @example
 * ```tsx
 * import { useSuspenseQuery } from '@tanstack/react-query';
 * import { authQueryOptions } from '@/lib/auth/queries';
 *
 * function UserProfile() {
 *   const { data: user } = useSuspenseQuery(authQueryOptions());
 *
 *   return <div>Welcome, {user?.name}</div>;
 * }
 * ```
 *
 * @returns Query options configured for user authentication
 */
export const authQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: ({ signal }) => $getUser({ signal }),
  });

/**
 * Type representing the result of the auth query
 * Returns the authenticated user object or null if not authenticated
 */
export type AuthQueryResult = Awaited<ReturnType<typeof $getUser>>;
