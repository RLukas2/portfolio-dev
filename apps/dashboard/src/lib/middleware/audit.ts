import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { createAuditor } from '@xbrk/api';

/**
 * Audit Middleware
 *
 * Injects a bound `audit()` helper into the request context.
 * Must be placed after both `dbMiddleware` and `authMiddleware` in the chain
 * so that `context.db` and `context.user` are already available.
 *
 * Automatically captures the client IP address (respecting Cloudflare,
 * reverse proxies, and direct connections) and the user-agent string from
 * the incoming request, so call sites don't need to pass them manually.
 *
 * Gracefully degrades to a no-op if db or user are missing from context
 * (should not happen in normal usage given the middleware ordering).
 *
 * @example
 * ```ts
 * export const $createArticle = createServerFn({ method: 'POST' })
 *   .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
 *   .handler(async ({ context, data }) => {
 *     const result = await blogService.create(context.db, data);
 *     context.audit('article.create', 'article', result.id, { title: result.title });
 *     return result;
 *   });
 * ```
 */
export const auditMiddleware = createMiddleware().server(({ next, context }) => {
  const ctx = context as unknown as Record<string, unknown>;
  const db = ctx.db as Parameters<typeof createAuditor>[0];
  const user = ctx.user as { id: string } | undefined;

  const request = getRequest();
  const ipAddress =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    undefined;
  const userAgent = request.headers.get('user-agent') ?? undefined;

  const audit = db && user ? createAuditor(db, user.id, ipAddress, userAgent) : () => Promise.resolve();

  return next({ context: { audit } });
});
