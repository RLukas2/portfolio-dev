// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import { deleteFile, uploadImage } from '../storage';

export interface PaginationInput {
  limit?: number;
  page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Handles image upload for create operations.
 * Returns the uploaded image URL or undefined if upload fails.
 */
export async function handleImageUpload(
  folder: string,
  thumbnail: string | undefined,
  slug: string,
  entityName: string,
): Promise<string | undefined> {
  if (!thumbnail || typeof thumbnail !== 'string') {
    return undefined;
  }

  try {
    return await uploadImage(folder, thumbnail, slug);
  } catch (error) {
    Sentry.captureException(error);
    console.error(`[${entityName}] Image upload failed:`, error);
    return undefined;
  }
}

/**
 * Handles image update for update operations.
 * Uploads new image and deletes old one if successful.
 * Returns the new image URL or undefined.
 */
export async function handleImageUpdate(
  folder: string,
  thumbnail: string | undefined,
  slug: string,
  oldImageUrl: string | null | undefined,
  entityName: string,
): Promise<string | undefined> {
  if (!thumbnail || typeof thumbnail !== 'string') {
    return undefined;
  }

  try {
    const imageUrl = await uploadImage(folder, thumbnail, slug);

    // Delete old image after successful upload
    if (oldImageUrl) {
      try {
        await deleteFile(oldImageUrl);
      } catch (error) {
        Sentry.captureException(error);
        console.error(`[${entityName}] Old image deletion failed:`, error);
        // Don't fail the operation if old image deletion fails
      }
    }

    return imageUrl;
  } catch (error) {
    Sentry.captureException(error);
    console.error(`[${entityName}] Image upload failed:`, error);
    return undefined;
  }
}
