// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';
import { CreateServiceSchema, service, UpdateServiceSchema } from '@xbrk/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { z } from 'zod/v4';
import { deleteFile, uploadImage } from '../storage';

type DbClient = typeof DB;

/** Returns all services including drafts. For admin use only. */
export async function getAll(db: DbClient) {
  try {
    return await db.query.service.findMany({
      orderBy: desc(service.id),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[service.getAll] Database error:', error);
    return [];
  }
}

/** Returns only published (non-draft) services. */
export async function getAllPublic(db: DbClient) {
  try {
    return await db.query.service.findMany({
      where: eq(service.isDraft, false),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[service.getAllPublic] Database error:', error);
    return [];
  }
}

/**
 * Returns a single service by slug.
 * Draft services are only accessible to admins.
 * @throws {Error} If service not found or is a draft and requester is not admin.
 */
export async function getBySlug(db: DbClient, input: { slug: string }, session?: { user: { role: string } } | null) {
  try {
    const serviceResult = await db.query.service.findFirst({
      where: eq(service.slug, input.slug),
    });

    if (!serviceResult) {
      throw new Error('Service not found');
    }

    // if service is draft, throw an error unless user is admin
    if (serviceResult.isDraft && session?.user.role !== 'admin') {
      throw new Error('Service is not public');
    }

    return serviceResult;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Service not found' || error.message === 'Service is not public')
    ) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[service.getBySlug] Database error:', error);
    throw new Error('Failed to fetch service');
  }
}

/** Returns a single service by ID. Returns `undefined` if not found. */
export async function getById(db: DbClient, input: { id: string }) {
  try {
    return await db.query.service.findFirst({
      where: eq(service.id, input.id),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[service.getById] Database error:', error);
    return undefined;
  }
}

/**
 * Creates a new service. If a thumbnail is provided, it is uploaded to storage
 * and saved as `imageUrl`.
 */
export async function create(db: DbClient, input: z.infer<typeof CreateServiceSchema>) {
  const { thumbnail, ...serviceData } = input;

  if (thumbnail) {
    try {
      const imageUrl = await uploadImage('projects', thumbnail, input.slug);
      serviceData.imageUrl = imageUrl;
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return db.insert(service).values(serviceData);
}

/**
 * Updates a service. If a new thumbnail is provided, uploads it and deletes the old one.
 * Old image is only deleted after the new upload succeeds.
 */
export async function update(db: DbClient, input: z.infer<typeof UpdateServiceSchema>) {
  const { thumbnail, id, ...serviceData } = input;

  if (thumbnail) {
    try {
      const existingService = await db.query.service.findFirst({
        where: eq(service.id, id),
      });
      const oldImageUrl = existingService?.imageUrl;

      const imageUrl = await uploadImage('services', thumbnail, input.slug ?? id);
      serviceData.imageUrl = imageUrl;

      if (oldImageUrl) {
        await deleteFile(oldImageUrl);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return db.update(service).set(serviceData).where(eq(service.id, id));
}

/** Deletes a service and its associated image from storage if present. */
export async function remove(db: DbClient, id: string) {
  const serviceToDelete = await db.query.service.findFirst({
    where: eq(service.id, id),
  });

  if (serviceToDelete?.imageUrl) {
    await deleteFile(serviceToDelete.imageUrl);
  }

  return db.delete(service).where(eq(service.id, id));
}
