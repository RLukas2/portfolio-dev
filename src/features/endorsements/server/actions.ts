'use server';

import type { Prisma } from '@prisma/client';

import db from '@/lib/db';

import type { SkillCategory } from '../types';

export const countAllEndorsements = async (): Promise<number> => {
  return await db.endorsement.count({
    where: { deletedAt: null },
  });
};

export const getEndorsements = async (): Promise<SkillCategory[]> => {
  const data = await db.skillCategory.findMany({
    where: { deletedAt: null },
    include: {
      skills: {
        where: { deletedAt: null },
        include: {
          endorsements: {
            where: { deletedAt: null },
            include: { user: true },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      },
    },
  });

  return data.map(({ name, skills }) => ({
    name,
    skills: skills.map(({ id, name: skillName, endorsements }) => ({
      id: id.toString(),
      name: skillName,
      users: endorsements
        .filter((endorsement) => endorsement.userId)
        .map(({ user: endorser }) => ({
          id: endorser?.id!,
          name: endorser?.name!,
          email: endorser?.email!,
          image: endorser?.image!,
        })),
    })),
  }));
};

export const countEndorsement = async (
  where: Prisma.EndorsementWhereInput,
): Promise<number> => {
  return await db.endorsement.count({
    where,
  });
};

export const createEndorsement = async ({
  userId,
  skillId,
}: {
  userId: string;
  skillId: number;
}): Promise<void> => {
  await db.endorsement.create({
    data: {
      userId,
      skillId,
    },
  });
};
