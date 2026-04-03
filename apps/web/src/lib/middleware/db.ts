import { createMiddleware } from '@tanstack/react-start';
import { db } from '@xbrk/db/client';
import { sentryMiddleware } from './sentry';

export const dbMiddleware = createMiddleware()
  .middleware([sentryMiddleware])
  .server(({ next }) => {
    return next({ context: { db } });
  });
