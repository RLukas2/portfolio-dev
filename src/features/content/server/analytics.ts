'use server';

import type { ContentType } from '@prisma/client';

import db from '@/lib/db';

/**
 * Get comprehensive analytics for a specific content
 */
export const getContentAnalytics = async (slug: string) => {
  const content = await db.contentMeta.findFirst({
    where: { slug, deletedAt: null },
    include: {
      views: {
        where: { deletedAt: null },
        select: {
          country: true,
          referrer: true,
          createdAt: true,
        },
      },
      shares: {
        where: { deletedAt: null },
        select: {
          type: true,
          createdAt: true,
        },
      },
      reactions: {
        where: { deletedAt: null },
        select: {
          type: true,
          count: true,
        },
      },
    },
  });

  if (!content) return null;

  // Views by country
  const viewsByCountry = content.views.reduce(
    (acc, view) => {
      if (view.country) {
        acc[view.country] = (acc[view.country] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Views by referrer
  const viewsByReferrer = content.views.reduce(
    (acc, view) => {
      if (view.referrer) {
        try {
          const hostname = new URL(view.referrer).hostname;
          acc[hostname] = (acc[hostname] || 0) + 1;
        } catch {
          acc['direct'] = (acc['direct'] || 0) + 1;
        }
      } else {
        acc['direct'] = (acc['direct'] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Shares by type
  const sharesByType = content.shares.reduce(
    (acc, share) => {
      const type = share.type || 'OTHERS';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Reactions by type
  const reactionsByType = content.reactions.reduce(
    (acc, reaction) => {
      const type = reaction.type || 'LIKED';
      acc[type] = (acc[type] || 0) + (reaction.count || 1);
      return acc;
    },
    {} as Record<string, number>,
  );

  // Views over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const viewsOverTime = content.views
    .filter((view) => view.createdAt >= thirtyDaysAgo)
    .reduce<Record<string, number>>((acc, view) => {
      const date = view.createdAt.toISOString().split('T')[0]!;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

  return {
    slug: content.slug,
    type: content.type,
    title: content.title,
    published: content.published,
    publishedAt: content.publishedAt,
    totalViews: content.views.length,
    totalShares: content.shares.length,
    totalReactions: content.reactions.reduce(
      (sum, r) => sum + (r.count || 1),
      0,
    ),
    viewsByCountry,
    viewsByReferrer,
    sharesByType,
    reactionsByType,
    viewsOverTime,
  };
};

/**
 * Get dashboard analytics (overview)
 */
export const getDashboardAnalytics = async () => {
  const [
    totalViews,
    totalShares,
    totalReactions,
    totalContent,
    publishedContent,
  ] = await Promise.all([
    db.view.count({ where: { deletedAt: null } }),
    db.share.count({ where: { deletedAt: null } }),
    db.reaction.aggregate({
      where: { deletedAt: null },
      _sum: { count: true },
    }),
    db.contentMeta.count({ where: { deletedAt: null } }),
    db.contentMeta.count({
      where: { published: true, deletedAt: null },
    }),
  ]);

  // Get views by content type
  const viewsByType = await db.view.groupBy({
    by: ['contentId'],
    where: { deletedAt: null },
    _count: true,
  });

  const contentTypes = await db.contentMeta.findMany({
    where: {
      id: { in: viewsByType.map((v) => v.contentId) },
      deletedAt: null,
    },
    select: { id: true, type: true },
  });

  const viewsByContentType = viewsByType.reduce(
    (acc, view) => {
      const content = contentTypes.find((c) => c.id === view.contentId);
      if (content) {
        acc[content.type] = (acc[content.type] || 0) + view._count;
      }
      return acc;
    },
    {} as Record<ContentType, number>,
  );

  // Get top content by views (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const topContent = await db.contentMeta.findMany({
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
              createdAt: { gte: thirtyDaysAgo },
            },
          },
        },
      },
    },
    orderBy: {
      views: { _count: 'desc' },
    },
    take: 10,
  });

  return {
    overview: {
      totalViews,
      totalShares,
      totalReactions: totalReactions._sum.count || 0,
      totalContent,
      publishedContent,
      draftContent: totalContent - publishedContent,
    },
    viewsByContentType,
    topContent: topContent.map((c) => ({
      slug: c.slug,
      title: c.title,
      type: c.type,
      views: c._count.views,
    })),
  };
};

/**
 * Get analytics by date range
 */
export const getAnalyticsByDateRange = async (
  startDate: Date,
  endDate: Date,
) => {
  const [views, shares, reactions] = await Promise.all([
    db.view.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        createdAt: true,
        country: true,
        content: { select: { type: true } },
      },
    }),
    db.share.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        createdAt: true,
        type: true,
      },
    }),
    db.reaction.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        createdAt: true,
        type: true,
        count: true,
      },
    }),
  ]);

  // Group by date
  const viewsByDate = views.reduce<Record<string, number>>((acc, view) => {
    const date = view.createdAt.toISOString().split('T')[0]!;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sharesByDate = shares.reduce<Record<string, number>>((acc, share) => {
    const date = share.createdAt.toISOString().split('T')[0]!;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const reactionsByDate = reactions.reduce<Record<string, number>>(
    (acc, reaction) => {
      const date = reaction.createdAt.toISOString().split('T')[0]!;
      acc[date] = (acc[date] || 0) + (reaction.count || 1);
      return acc;
    },
    {},
  );

  return {
    viewsByDate,
    sharesByDate,
    reactionsByDate,
    totalViews: views.length,
    totalShares: shares.length,
    totalReactions: reactions.reduce((sum, r) => sum + (r.count || 1), 0),
  };
};

/**
 * Get geographic analytics
 */
export const getGeographicAnalytics = async () => {
  const views = await db.view.findMany({
    where: {
      deletedAt: null,
      country: { not: null },
    },
    select: {
      country: true,
      content: {
        select: {
          type: true,
          slug: true,
        },
      },
    },
  });

  const viewsByCountry = views.reduce(
    (acc, view) => {
      if (view.country) {
        acc[view.country] = (acc[view.country] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Sort by count
  const sortedCountries = Object.entries(viewsByCountry)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  return {
    viewsByCountry: Object.fromEntries(sortedCountries),
    totalCountries: Object.keys(viewsByCountry).length,
    topCountry: sortedCountries[0]?.[0],
  };
};

/**
 * Get referrer analytics
 */
export const getReferrerAnalytics = async () => {
  const views = await db.view.findMany({
    where: {
      deletedAt: null,
      referrer: { not: null },
    },
    select: {
      referrer: true,
    },
  });

  const viewsByReferrer = views.reduce(
    (acc, view) => {
      if (view.referrer) {
        try {
          const hostname = new URL(view.referrer).hostname;
          acc[hostname] = (acc[hostname] || 0) + 1;
        } catch {
          acc['invalid'] = (acc['invalid'] || 0) + 1;
        }
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Sort by count
  const sortedReferrers = Object.entries(viewsByReferrer)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  return {
    viewsByReferrer: Object.fromEntries(sortedReferrers),
    totalReferrers: Object.keys(viewsByReferrer).length,
    topReferrer: sortedReferrers[0]?.[0],
  };
};
