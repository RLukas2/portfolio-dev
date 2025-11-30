'use server';

import db from '@/lib/db';

export const countAllViews = async (): Promise<number> => {
  return await db.view.count();
};

/**
 * Get view counts for all content, grouped by slug.
 * Returns a map of slug -> view count.
 */
export const getAllViewCounts = async (): Promise<Record<string, number>> => {
  const results = await db.contentMeta.findMany({
    include: {
      _count: {
        select: { views: true },
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
    where: { slug },
    include: {
      _count: {
        select: { views: true },
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
      content: { slug },
    },
  });

  return result ?? 0;
};

export const addView = async (
  slug: string,
  sessionId: string,
): Promise<void> => {
  await db.view.create({
    data: {
      sessionId,
      content: {
        connectOrCreate: {
          where: { slug },
          create: { slug },
        },
      },
    },
    include: { content: true },
  });
};
