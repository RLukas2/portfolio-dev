import { revalidateTag } from 'next/cache';

/**
 * Cache tags used throughout the application.
 * Use these to invalidate specific caches when data changes.
 */
export const CACHE_TAGS = {
  views: 'views',
  guestbook: 'guestbook',
  endorsements: 'endorsements',
} as const;

/**
 * Revalidate the views cache.
 * Call this after a new view is recorded.
 */
export const revalidateViews = () => {
  revalidateTag(CACHE_TAGS.views, 'page');
};

/**
 * Revalidate the guestbook cache.
 * Call this after a new entry is created or deleted.
 */
export const revalidateGuestbook = () => {
  revalidateTag(CACHE_TAGS.guestbook, 'page');
};

/**
 * Revalidate the endorsements cache.
 * Call this after a new endorsement is created.
 */
export const revalidateEndorsements = () => {
  revalidateTag(CACHE_TAGS.endorsements, 'page');
};
