'use server';

import db from '@/lib/db';

export const countAllViews = async (): Promise<number> => {
  return await db.view.count({
    where: { deletedAt: null },
  });
};

/**
 * Get view counts for all content, grouped by slug.
 * Returns a map of slug -> view count.
 */
export const getAllViewCounts = async (): Promise<Record<string, number>> => {
  const results = await db.contentMeta.findMany({
    where: { deletedAt: null },
    include: {
      _count: {
        select: { views: { where: { deletedAt: null } } },
      },
    },
  });

  return results.reduce(
    (acc, item) => {
      acc[item.slug] = item._count.views;
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const countViewsBySlug = async (slug: string): Promise<number> => {
  const result = await db.contentMeta.findFirst({
    where: { slug, deletedAt: null },
    include: {
      _count: {
        select: { views: { where: { deletedAt: null } } },
      },
    },
  });

  return result?._count.views ?? 0;
};

export const countViewsBySlugAndSessionId = async (
  slug: string,
  sessionId: string,
): Promise<number> => {
  const result = await db.view.count({
    where: {
      sessionId,
      deletedAt: null,
      content: { slug, deletedAt: null },
    },
  });

  return result ?? 0;
};

export const addView = async (
  slug: string,
  sessionId: string,
  analytics?: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    country?: string;
  },
): Promise<void> => {
  // Detect content type from slug
  const { detectContentType } =
    await import('@/features/content/utils/content-type-detector');
  const contentType = detectContentType(slug);

  // First, ensure ContentMeta exists or get its ID
  const contentMeta = await db.contentMeta.upsert({
    where: { slug },
    update: {}, // No update needed if exists
    create: {
      slug,
      type: contentType,
    },
  });

  // Then create the view with analytics data
  try {
    await db.view.create({
      data: {
        sessionId,
        contentId: contentMeta.id,
        ipAddress: analytics?.ipAddress,
        userAgent: analytics?.userAgent,
        referrer: analytics?.referrer,
        country: analytics?.country,
      },
    });
  } catch (error: any) {
    // Ignore unique constraint errors (view already exists for this session)
    if (!error.code || error.code !== 'P2002') {
      throw error;
    }
  }
};

/**
 * Get view analytics by slug
 */
export const getViewAnalytics = async (slug: string) => {
  const views = await db.view.findMany({
    where: {
      deletedAt: null,
      content: { slug, deletedAt: null },
    },
    select: {
      ipAddress: true,
      userAgent: true,
      referrer: true,
      country: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Aggregate analytics
  const countryStats = views.reduce(
    (acc, view) => {
      if (view.country) {
        acc[view.country] = (acc[view.country] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const referrerStats = views.reduce(
    (acc, view) => {
      if (view.referrer) {
        const url = new URL(view.referrer).hostname;
        acc[url] = (acc[url] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    totalViews: views.length,
    countryStats,
    referrerStats,
    recentViews: views.slice(0, 10),
  };
};
