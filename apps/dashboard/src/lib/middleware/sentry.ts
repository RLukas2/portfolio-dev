// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/tanstackstart-react';
import { createMiddleware } from '@tanstack/react-start';

/**
 * Sentry Middleware
 *
 * Wraps server functions with Sentry error tracking and performance monitoring.
 * Creates a Sentry span for each server function execution and automatically
 * captures any exceptions that occur.
 *
 * Features:
 * - Performance monitoring with spans
 * - Automatic error capture
 * - Request context tracking
 * - Distributed tracing support
 *
 * This middleware should be included in all middleware stacks to ensure
 * comprehensive error tracking across the application.
 *
 * @example
 * ```ts
 * export const myMiddleware = createMiddleware()
 *   .middleware([sentryMiddleware])
 *   .server(({ next }) => next());
 * ```
 *
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/tanstack-start/ Sentry TanStack Start Docs}
 */
export const sentryMiddleware = createMiddleware().server(({ next }) => {
  return Sentry.startSpan({ name: 'server-function', op: 'function' }, async () => {
    try {
      return await next();
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  });
});
