'use server';

import db from '@/lib/db';

/**
 * Soft delete helpers for all models
 */

// Guestbook
export const restoreGuestbookEntry = async (id: number) => {
  return await db.guestbook.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const getDeletedGuestbookEntries = async () => {
  return await db.guestbook.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
    include: { user: true },
  });
};

export const permanentlyDeleteGuestbookEntry = async (id: number) => {
  return await db.guestbook.delete({ where: { id } });
};

// Endorsements
export const restoreEndorsement = async (id: number) => {
  return await db.endorsement.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const getDeletedEndorsements = async () => {
  return await db.endorsement.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
    include: { user: true, skill: true },
  });
};

// Skills
export const softDeleteSkill = async (id: number) => {
  return await db.skill.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const restoreSkill = async (id: number) => {
  return await db.skill.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const getDeletedSkills = async () => {
  return await db.skill.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
    include: { skillCategory: true },
  });
};

// Skill Categories
export const softDeleteSkillCategory = async (id: number) => {
  return await db.skillCategory.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const restoreSkillCategory = async (id: number) => {
  return await db.skillCategory.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const getDeletedSkillCategories = async () => {
  return await db.skillCategory.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });
};

// Content Meta
export const restoreContent = async (slug: string) => {
  return await db.contentMeta.update({
    where: { slug },
    data: { deletedAt: null },
  });
};

export const getDeletedContent = async () => {
  return await db.contentMeta.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });
};

// Views
export const restoreView = async (id: number) => {
  return await db.view.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const softDeleteViewsByContent = async (contentId: bigint) => {
  return await db.view.updateMany({
    where: { contentId },
    data: { deletedAt: new Date() },
  });
};

// Shares
export const restoreShare = async (id: number) => {
  return await db.share.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const softDeleteSharesByContent = async (contentId: bigint) => {
  return await db.share.updateMany({
    where: { contentId },
    data: { deletedAt: new Date() },
  });
};

// Reactions
export const restoreReaction = async (id: number) => {
  return await db.reaction.update({
    where: { id },
    data: { deletedAt: null },
  });
};

export const softDeleteReactionsByContent = async (contentId: bigint) => {
  return await db.reaction.updateMany({
    where: { contentId },
    data: { deletedAt: new Date() },
  });
};

/**
 * Bulk operations
 */

// Get all deleted items across all models
export const getAllDeletedItems = async () => {
  const [
    guestbook,
    endorsements,
    skills,
    skillCategories,
    content,
    views,
    shares,
    reactions,
  ] = await Promise.all([
    getDeletedGuestbookEntries(),
    getDeletedEndorsements(),
    getDeletedSkills(),
    getDeletedSkillCategories(),
    getDeletedContent(),
    db.view.count({ where: { deletedAt: { not: null } } }),
    db.share.count({ where: { deletedAt: { not: null } } }),
    db.reaction.count({ where: { deletedAt: { not: null } } }),
  ]);

  return {
    guestbook,
    endorsements,
    skills,
    skillCategories,
    content,
    viewsCount: views,
    sharesCount: shares,
    reactionsCount: reactions,
  };
};

// Clean up old deleted items (permanently delete items deleted > 30 days ago)
export const cleanupOldDeletedItems = async (daysOld = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const [guestbook, endorsements, skills, skillCategories, content] =
    await Promise.all([
      db.guestbook.deleteMany({
        where: {
          deletedAt: { not: null, lt: cutoffDate },
        },
      }),
      db.endorsement.deleteMany({
        where: {
          deletedAt: { not: null, lt: cutoffDate },
        },
      }),
      db.skill.deleteMany({
        where: {
          deletedAt: { not: null, lt: cutoffDate },
        },
      }),
      db.skillCategory.deleteMany({
        where: {
          deletedAt: { not: null, lt: cutoffDate },
        },
      }),
      db.contentMeta.deleteMany({
        where: {
          deletedAt: { not: null, lt: cutoffDate },
        },
      }),
    ]);

  return {
    guestbook: guestbook.count,
    endorsements: endorsements.count,
    skills: skills.count,
    skillCategories: skillCategories.count,
    content: content.count,
  };
};
