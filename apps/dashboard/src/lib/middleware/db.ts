import { createMiddleware } from '@tanstack/react-start';
import { db } from '@xbrk/db/client';

/**
 * Database Middleware
 *
 * Injects the Drizzle database client into the request context.
 * Makes the database available to all server functions and API handlers
 * without needing to import it in every file.
 *
 * The database client is a singleton, so this doesn't create new connections
 * on each request - it reuses the existing connection pool.
 *
 * @example
 * ```ts
 * export const myServerFn = createServerFn()
 *   .middleware([dbMiddleware])
 *   .handler(async ({ context }) => {
 *     const posts = await context.db.query.posts.findMany();
 *     return posts;
 *   });
 * ```
 */
export const dbMiddleware = createMiddleware().server(({ next }) => {
  return next({ context: { db } });
});
