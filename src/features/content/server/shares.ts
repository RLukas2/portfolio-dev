'use server';

import type { ShareType } from '@prisma/client';

import db from '@/lib/db';

export const countSharesBySlug = async (slug: string): Promise<number> => {
  const result = await db.contentMeta.findFirst({
    where: { slug, deletedAt: null },
    include: {
      _count: {
        select: { shares: { where: { deletedAt: null } } },
      },
    },
  });

  return result?._count.shares ?? 0;
};

export const countUserShares = async (
  slug: string,
  sessionId: string,
  type: ShareType,
): Promise<number> => {
  const count = await db.share.count({
    where: {
      sessionId,
      type,
      deletedAt: null,
      content: { slug, deletedAt: null },
    },
  });

  return count ?? 0;
};

export const addShare = async (
  slug: string,
  sessionId: string,
  type: ShareType,
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

  // Then create the share
  await db.share.create({
    data: {
      sessionId,
      type,
      contentId: contentMeta.id,
    },
  });
};
