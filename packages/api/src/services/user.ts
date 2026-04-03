// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';

type DbClient = typeof DB;

export async function getAll(db: DbClient) {
  try {
    return await db.query.user.findMany();
  } catch (error) {
    Sentry.captureException(error);
    console.error('[user.getAll] Database error:', error);
    return [];
  }
}
