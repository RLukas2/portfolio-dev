'use server';

import type { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import db from '@/server/db';

import type { Guestbook } from '../types';

/**
 * Get all guestbook entries.
 * Cached for 30 seconds to improve TTFB while keeping entries relatively fresh.
 */
export const getGuestbookEntries = unstable_cache(
  async (): Promise<Guestbook[]> => {
    const entries = await db.guestbook.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
      select: { id: true, body: true, createdAt: true, user: true },
    });

    return (entries ?? []).map(({ id, body, createdAt, user }) => ({
      id: id.toString(),
      body,
      createdAt: createdAt.toISOString(),
      user: {
        id: user!.id!,
        name: user!.name!,
        email: user!.email!,
        image: user!.image!,
      },
    }));
  },
  ['guestbook-entries'],
  { revalidate: 30, tags: ['guestbook'] },
);

export const createEntry = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}): Promise<void> => {
  await db.guestbook.create({
    data: {
      body: message,
      userId,
    },
  });

  // Revalidate guestbook cache after creating entry
  const { revalidateGuestbook } = await import('@/lib/cache');
  revalidateGuestbook();
};

export const deleteEntry = async (id: number): Promise<void> => {
  // Soft delete
  await db.guestbook.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  // Revalidate guestbook cache after deleting entry
  const { revalidateGuestbook } = await import('@/lib/cache');
  revalidateGuestbook();
};

export const countGuestbook = async (
  where: Prisma.GuestbookWhereInput,
): Promise<number> => {
  return await db.guestbook.count({
    where,
  });
};
