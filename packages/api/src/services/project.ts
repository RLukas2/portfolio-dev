// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';
import { CreateProjectSchema, project, UpdateProjectSchema } from '@xbrk/db/schema';
import { getTOC } from '@xbrk/utils';
import { desc, eq } from 'drizzle-orm';
import type { z } from 'zod/v4';
import { deleteFile, uploadImage } from '../storage';

type DbClient = typeof DB;

/** Returns all projects including drafts. For admin use only. */
export async function getAll(db: DbClient) {
  try {
    return await db.query.project.findMany({
      orderBy: desc(project.id),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[project.getAll] Database error:', error);
    return [];
  }
}

/** Returns only published projects, ordered by featured status. */
export async function getAllPublic(db: DbClient) {
  try {
    return await db.query.project.findMany({
      orderBy: desc(project.isFeatured),
      where: eq(project.isDraft, false),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[project.getAllPublic] Database error:', error);
    return [];
  }
}

/**
 * Returns a single project by slug with a generated TOC from its markdown content.
 * Draft projects are only accessible to admins.
 * @throws {Error} If project not found or is a draft and requester is not admin.
 */
export async function getBySlug(db: DbClient, input: { slug: string }, session?: { user: { role: string } } | null) {
  try {
    const result = await db.query.project.findFirst({
      where: eq(project.slug, input.slug),
    });

    if (!result) {
      throw new Error('Project not found');
    }

    if (result.isDraft && session?.user.role !== 'admin') {
      throw new Error('Project is not public');
    }

    const toc = getTOC(result.content ?? '');

    return { ...result, toc };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Project not found' || error.message === 'Project is not public')
    ) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[project.getBySlug] Database error:', error);
    throw new Error('Failed to fetch project');
  }
}

/** Returns a single project by ID. Returns `undefined` if not found. */
export async function getById(db: DbClient, input: { id: string }) {
  try {
    return await db.query.project.findFirst({
      where: eq(project.id, input.id),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[project.getById] Database error:', error);
    return undefined;
  }
}

/**
 * Creates a new project. If a thumbnail is provided, it is uploaded to storage
 * and saved as `imageUrl`.
 */
export async function create(db: DbClient, input: z.infer<typeof CreateProjectSchema>) {
  const { thumbnail, ...projectData } = input;

  if (thumbnail) {
    try {
      const imageUrl = await uploadImage('projects', thumbnail, input.slug);
      projectData.imageUrl = imageUrl;
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return db.insert(project).values(projectData);
}

/**
 * Updates a project. If a new thumbnail is provided, uploads it and deletes the old one.
 * Old image is only deleted after the new upload succeeds.
 */
export async function update(db: DbClient, input: z.infer<typeof UpdateProjectSchema>) {
  const { thumbnail, id, ...projectData } = input;

  if (thumbnail) {
    try {
      const existingProject = await db.query.project.findFirst({
        where: eq(project.id, id),
      });
      const oldImageUrl = existingProject?.imageUrl;

      const imageUrl = await uploadImage('projects', thumbnail, input.slug ?? id);
      projectData.imageUrl = imageUrl;

      if (oldImageUrl) {
        await deleteFile(oldImageUrl);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return db.update(project).set(projectData).where(eq(project.id, id));
}

/** Deletes a project and its associated image from storage if present. */
export async function remove(db: DbClient, id: string) {
  const projectToDelete = await db.query.project.findFirst({
    where: eq(project.id, id),
  });

  if (projectToDelete?.imageUrl) {
    await deleteFile(projectToDelete.imageUrl);
  }

  return db.delete(project).where(eq(project.id, id));
}
