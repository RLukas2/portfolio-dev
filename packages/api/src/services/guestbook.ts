// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';
import { guestbook } from '@xbrk/db/schema';
import { desc, eq } from 'drizzle-orm';

type DbClient = typeof DB;

/** Creates a new guestbook entry for the given user. */
export async function create(db: DbClient, input: { message: string }, userId: string): Promise<void> {
  try {
    await db.insert(guestbook).values({
      userId,
      message: input.message,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[guestbook.create] Database error:', error);
    throw new Error('Failed to create guestbook entry');
  }
}

/** Returns all guestbook entries ordered by newest first, with basic user info (id, name, image). */
export async function getAll(db: DbClient) {
  try {
    return await db.query.guestbook.findMany({
      orderBy: desc(guestbook.id),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[guestbook.getAll] Database error:', error);
    return [];
  }
}

/**
 * Deletes a guestbook entry. Only the entry owner or an admin can delete.
 * Uses transaction to ensure consistency.
 * @throws {Error} If entry not found or requester lacks permission.
 */
export async function remove(db: DbClient, input: { id: string }, userId: string, userRole: string): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      const entry = await tx.query.guestbook.findFirst({
        where: eq(guestbook.id, input.id),
      });

      if (!entry) {
        throw new Error('Guestbook entry not found');
      }

      if (entry.userId !== userId && userRole !== 'admin') {
        throw new Error('You are not allowed to delete this guestbook entry');
      }

      await tx.delete(guestbook).where(eq(guestbook.id, input.id));
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Guestbook entry not found' ||
        error.message === 'You are not allowed to delete this guestbook entry')
    ) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[guestbook.remove] Database error:', error);
    throw new Error('Failed to delete guestbook entry');
  }
}
