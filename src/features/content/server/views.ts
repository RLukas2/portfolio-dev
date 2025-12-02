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
): Promise<void> => {
  // First, ensure ContentMeta exists or get its ID
  const contentMeta = await db.contentMeta.upsert({
    where: { slug },
    update: {}, // No update needed if exists
    create: {
      slug,
      type: 'POST', // Default type, adjust based on your content type logic
    },
  });

  // Then create the view, but handle duplicate case
  try {
    await db.view.create({
      data: {
        sessionId,
        contentId: contentMeta.id,
      },
    });
  } catch (error: any) {
    // Ignore unique constraint errors (view already exists for this session)
    if (!error.code || error.code !== 'P2002') {
      throw error;
    }
  }
};
