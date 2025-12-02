'use server';

import type { Prisma, ReactionType } from '@prisma/client';

import db from '@/server/db';

export const countAllReactions = async (): Promise<number> => {
  const count = await db.reaction.aggregate({
    where: { deletedAt: null },
    _sum: { count: true },
  });

  return count._sum.count ?? 0;
};

const mapReactions = (
  reactions: (Prisma.PickEnumerable<
    Prisma.ReactionGroupByOutputType,
    'type'[]
  > & {
    _sum: { count: number | null };
  })[],
): Record<ReactionType, number> => {
  const records: Record<ReactionType, number> = {
    LIKED: 0,
    CLAPPING: 0,
    LOVED: 0,
    THINKING: 0,
  };

  reactions.forEach(({ type, _sum }) => {
    if (type) {
      records[type] = _sum.count ?? 0;
    }
  });

  return records;
};

export const getReactions = async (slug: string, sessionId?: string) => {
  const conditions: any = {
    deletedAt: null,
    content: { slug, deletedAt: null },
  };

  if (sessionId) {
    Object.assign(conditions, { sessionId });
  }

  const reactions = await db.reaction.groupBy({
    by: ['type'],
    where: conditions,
    _sum: { count: true },
  });

  return mapReactions(reactions);
};

export const addReaction = async ({
  slug,
  sessionId,
  type,
  count,
}: {
  slug: string;
  sessionId: string;
  type: ReactionType;
  count: number;
}) => {
  // Detect content type from slug
  const { detectContentType } =
    await import('@/features/content/utils/content-type-detector');
  const contentType = detectContentType(slug);

  // First, ensure ContentMeta exists or get its ID
  const contentMeta = await db.contentMeta.upsert({
    where: { slug },
    update: { deletedAt: null },
    create: {
      slug,
      type: contentType,
    },
  });

  // Then create or update the reaction
  try {
    await db.reaction.create({
      data: {
        sessionId,
        type,
        count,
        contentId: contentMeta.id,
      },
    });
  } catch (error: any) {
    // If unique constraint error, update existing reaction
    if (error.code === 'P2002') {
      await db.reaction.updateMany({
        where: {
          contentId: contentMeta.id,
          sessionId,
          type,
        },
        data: {
          count: {
            increment: count,
          },
        },
      });
    } else {
      throw error;
    }
  }
};
