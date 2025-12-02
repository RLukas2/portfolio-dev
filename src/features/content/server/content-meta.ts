'use server';

import type { ContentType } from '@prisma/client';

import db from '@/lib/db';

/**
 * Create or update content metadata
 */
export const upsertContentMeta = async ({
  slug,
  type,
  title,
  published = true,
  publishedAt,
}: {
  slug: string;
  type: ContentType;
  title?: string;
  published?: boolean;
  publishedAt?: Date;
}) => {
  return await db.contentMeta.upsert({
    where: { slug },
    update: {
      type,
      title,
      published,
      publishedAt,
      updatedAt: new Date(),
    },
    create: {
      slug,
      type,
      title,
      published,
      publishedAt: publishedAt || (published ? new Date() : null),
    },
  });
};

/**
 * Get content metadata by slug
 */
export const getContentMeta = async (slug: string) => {
  return await db.contentMeta.findFirst({
    where: { slug, deletedAt: null },
    include: {
      _count: {
        select: {
          views: { where: { deletedAt: null } },
          shares: { where: { deletedAt: null } },
          reactions: { where: { deletedAt: null } },
        },
      },
    },
  });
};

/**
 * Get all published content metadata
 */
export const getAllPublishedContent = async (type?: ContentType) => {
  return await db.contentMeta.findMany({
    where: {
      published: true,
      deletedAt: null,
      ...(type && { type }),
    },
    orderBy: { publishedAt: 'desc' },
    include: {
      _count: {
        select: {
          views: { where: { deletedAt: null } },
          shares: { where: { deletedAt: null } },
          reactions: { where: { deletedAt: null } },
        },
      },
    },
  });
};

/**
 * Get content by type
 */
export const getContentByType = async (type: ContentType) => {
  return await db.contentMeta.findMany({
    where: {
      type,
      published: true,
      deletedAt: null,
    },
    orderBy: { publishedAt: 'desc' },
  });
};

/**
 * Publish content
 */
export const publishContent = async (slug: string) => {
  return await db.contentMeta.update({
    where: { slug },
    data: {
      published: true,
      publishedAt: new Date(),
    },
  });
};

/**
 * Unpublish content
 */
export const unpublishContent = async (slug: string) => {
  return await db.contentMeta.update({
    where: { slug },
    data: {
      published: false,
    },
  });
};

/**
 * Soft delete content
 */
export const deleteContent = async (slug: string) => {
  return await db.contentMeta.update({
    where: { slug },
    data: {
      deletedAt: new Date(),
    },
  });
};

/**
 * Get content statistics
 */
export const getContentStats = async () => {
  const [totalContent, publishedContent, contentByType] = await Promise.all([
    db.contentMeta.count({
      where: { deletedAt: null },
    }),
    db.contentMeta.count({
      where: { published: true, deletedAt: null },
    }),
    db.contentMeta.groupBy({
      by: ['type'],
      where: { deletedAt: null },
      _count: true,
    }),
  ]);

  return {
    total: totalContent,
    published: publishedContent,
    draft: totalContent - publishedContent,
    byType: contentByType.reduce(
      (acc, item) => {
        acc[item.type] = item._count;
        return acc;
      },
      {} as Record<ContentType, number>,
    ),
  };
};

/**
 * Search content by title
 */
export const searchContent = async (query: string) => {
  return await db.contentMeta.findMany({
    where: {
      published: true,
      deletedAt: null,
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: { publishedAt: 'desc' },
    take: 10,
  });
};

/**
 * Get trending content (most views in last 7 days)
 */
export const getTrendingContent = async (limit = 10) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const contentWithViews = await db.contentMeta.findMany({
    where: {
      published: true,
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          views: {
            where: {
              deletedAt: null,
              createdAt: { gte: sevenDaysAgo },
            },
          },
        },
      },
    },
    orderBy: {
      views: {
        _count: 'desc',
      },
    },
    take: limit,
  });

  return contentWithViews;
};
