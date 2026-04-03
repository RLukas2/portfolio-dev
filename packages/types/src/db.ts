import {
  type articles,
  type commentReactions,
  type comments,
  type experience,
  type guestbook,
  type project,
  type service,
  type snippet,
  type user,
} from '@xbrk/db/schema';

/**
 * Database entity types
 * Inferred from Drizzle schema definitions
 */

export type Project = typeof project.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Snippet = typeof snippet.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type User = typeof user.$inferSelect;
export type CommentReaction = typeof commentReactions.$inferSelect;
export type Guestbook = typeof guestbook.$inferSelect;
export type Service = typeof service.$inferSelect;

/**
 * Comment with related data (user, reactions, replies)
 * Used for displaying comments with full context
 */
export interface CommentWithRelations {
  comment: Comment;
  dislikesCount: number;
  likesCount: number;
  repliesCount: number;
  user: User | null;
  userReaction: CommentReaction | null;
}
