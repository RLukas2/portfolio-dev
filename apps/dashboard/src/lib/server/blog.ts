import { createServerFn } from '@tanstack/react-start';
import { blogService } from '@xbrk/api';
import { CreateArticleSchema, UpdateArticleSchema } from '@xbrk/db/schema';
import { z } from 'zod/v4';
import { adminMiddleware, authMiddleware } from '@/lib/auth/middleware';
import { auditMiddleware } from '@/lib/middleware/audit';
import { dbMiddleware } from '@/lib/middleware/db';
import { sentryMiddleware } from '@/lib/middleware/sentry';

export const $getAllArticles = createServerFn({ method: 'GET' })
  .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
  .handler(({ context }) => blogService.getAll(context.db));

export const $getArticleById = createServerFn({ method: 'GET' })
  .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(({ context, data }) => blogService.getById(context.db, data));

export const $createArticle = createServerFn({ method: 'POST' })
  .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
  .inputValidator(CreateArticleSchema)
  .handler(async ({ context, data }) => {
    const result = await blogService.create(context.db, data);
    context.audit('article.create', 'article', result?.id, { title: result?.title });
    return result;
  });

export const $updateArticle = createServerFn({ method: 'POST' })
  .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
  .inputValidator(UpdateArticleSchema)
  .handler(async ({ context, data }) => {
    const result = await blogService.update(context.db, data);
    context.audit('article.update', 'article', result?.id, { title: result?.title });
    return result;
  });

export const $deleteArticle = createServerFn({ method: 'POST' })
  .middleware([sentryMiddleware, dbMiddleware, authMiddleware, adminMiddleware, auditMiddleware])
  .inputValidator(z.string())
  .handler(async ({ context, data }) => {
    const result = await blogService.remove(context.db, data);
    context.audit('article.delete', 'article', data);
    return result;
  });
