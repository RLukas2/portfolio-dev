import type { db as DB } from '@xbrk/db/client';

type DbClient = typeof DB;

export function getAll(db: DbClient) {
  return db.query.user.findMany();
}
