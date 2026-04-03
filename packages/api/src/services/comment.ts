// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';
import { commentReactions, comments, user } from '@xbrk/db/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';
import { z } from 'zod/v4';

type DbClient = typeof DB;

const baseJSONContent = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any(), z.any()).optional(),
  marks: z
    .array(
      z.object({
        type: z.string(),
        attrs: z.record(z.any(), z.any()).optional(),
      }),
    )
    .optional(),
  text: z.string().optional(),
});

/** Recursive Zod schema for TipTap/ProseMirror JSON content nodes. */
export const JSONContentSchema: z.ZodType<z.infer<typeof baseJSONContent>> = baseJSONContent.extend({
  content: z.array(z.lazy(() => JSONContentSchema)).optional(),
});

/** Creates a new comment on an article. Supports nested replies via `parentId`. */
export function create(
  db: DbClient,
  input: {
    articleId: string;
    content: z.infer<typeof JSONContentSchema>;
    parentId?: string;
  },
  userId: string,
) {
  return db.insert(comments).values({
    userId,
    articleId: input.articleId,
    content: input.content,
    parentId: input.parentId,
  });
}

/**
 * Returns top-level comments (or replies if `parentId` is provided) for an article.
 * Includes reply count, like/dislike counts, and the current user's reaction via subqueries.
 */
export async function getAll(
  db: DbClient,
  input: {
    articleId: string;
    parentId?: string;
    sort?: 'asc' | 'desc';
  },
  userId?: string,
) {
  try {
    const commentsWithCounts = await db
      .select({
        comment: comments,
        user,
        repliesCount: sql<number>`(SELECT COUNT(*) FROM ${comments} c2 WHERE c2.parent_id = ${comments.id})`,
        likesCount: sql<number>`(SELECT COUNT(*) FROM ${commentReactions} cr WHERE cr.comment_id = ${comments.id} AND cr.like = true)`,
        dislikesCount: sql<number>`(SELECT COUNT(*) FROM ${commentReactions} cr WHERE cr.comment_id = ${comments.id} AND cr.like = false)`,
        userReaction: commentReactions,
      })
      .from(comments)
      .leftJoin(user, eq(comments.userId, user.id))
      .leftJoin(
        commentReactions,
        and(eq(commentReactions.commentId, comments.id), eq(commentReactions.userId, userId ?? '')),
      )
      .where(
        input.parentId
          ? and(eq(comments.articleId, input.articleId), eq(comments.parentId, input.parentId))
          : and(eq(comments.articleId, input.articleId), isNull(comments.parentId)),
      );

    return commentsWithCounts;
  } catch (error) {
    Sentry.captureException(error);
    console.error('[comment.getAll] Database error:', error);
    return [];
  }
}

/**
 * Deletes a comment. Only the comment owner or an admin can delete.
 * @throws {Error} If comment not found or requester lacks permission.
 */
export async function remove(db: DbClient, input: { id: string }, userId: string, userRole: string) {
  try {
    const { id } = input;
    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, id),
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId && userRole !== 'admin') {
      throw new Error('You are not allowed to delete this comment');
    }

    return db.delete(comments).where(eq(comments.id, id));
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Comment not found' || error.message === 'You are not allowed to delete this comment')
    ) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[comment.remove] Database error:', error);
    throw new Error('Failed to delete comment');
  }
}

/**
 * Adds or updates a like/dislike reaction on a comment.
 * Users cannot react to their own comments.
 * If a reaction already exists, it is updated in place.
 * @throws {Error} If comment not found or user tries to react to their own comment.
 */
export async function react(db: DbClient, input: { id: string; like: boolean }, userId: string) {
  try {
    const { id, like: isLike } = input;
    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, id),
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId === userId) {
      throw new Error('You are not allowed to react to your own comment');
    }

    const existingReaction = await db.query.commentReactions.findFirst({
      where: and(eq(commentReactions.commentId, id), eq(commentReactions.userId, userId)),
    });

    if (existingReaction) {
      return db.update(commentReactions).set({ like: isLike }).where(eq(commentReactions.id, existingReaction.id));
    }

    return db.insert(commentReactions).values({
      commentId: id,
      userId,
      like: isLike,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Comment not found' || error.message === 'You are not allowed to react to your own comment')
    ) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[comment.react] Database error:', error);
    throw new Error('Failed to react to comment');
  }
}
