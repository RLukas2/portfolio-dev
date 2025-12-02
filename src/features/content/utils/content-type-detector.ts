import type { ContentType } from '@prisma/client';

/**
 * Detect content type from slug or path
 */
export function detectContentType(slug: string): ContentType {
  const lowerSlug = slug.toLowerCase();

  // Check for common patterns
  if (
    lowerSlug.startsWith('blog/') ||
    lowerSlug.includes('/posts/') ||
    lowerSlug.includes('/post/') ||
    lowerSlug.includes('/article/')
  ) {
    return 'POST';
  }

  if (
    lowerSlug.startsWith('project/') ||
    lowerSlug.includes('/projects/') ||
    lowerSlug.includes('/work/')
  ) {
    return 'PROJECT';
  }

  if (
    lowerSlug.startsWith('short/') ||
    lowerSlug.includes('/shorts/') ||
    lowerSlug.includes('/snippet/') ||
    lowerSlug.includes('/tip/')
  ) {
    return 'SHORT';
  }

  // Default to PAGE for everything else
  return 'PAGE';
}

/**
 * Get content type from file path (for content collections)
 */
export function getContentTypeFromPath(filePath: string): ContentType {
  if (filePath.includes('/posts/') || filePath.includes('/blog/')) {
    return 'POST';
  }

  if (filePath.includes('/projects/')) {
    return 'PROJECT';
  }

  if (filePath.includes('/shorts/')) {
    return 'SHORT';
  }

  return 'PAGE';
}

/**
 * Get content type display name
 */
export function getContentTypeLabel(type: ContentType): string {
  const labels: Record<ContentType, string> = {
    POST: 'Blog Post',
    PROJECT: 'Project',
    SHORT: 'Short',
    PAGE: 'Page',
  };

  return labels[type];
}

/**
 * Get content type icon/emoji
 */
export function getContentTypeIcon(type: ContentType): string {
  const icons: Record<ContentType, string> = {
    POST: '📝',
    PROJECT: '🚀',
    SHORT: '⚡',
    PAGE: '📄',
  };

  return icons[type];
}

/**
 * Get content type color (for UI)
 */
export function getContentTypeColor(type: ContentType): string {
  const colors: Record<ContentType, string> = {
    POST: 'blue',
    PROJECT: 'purple',
    SHORT: 'yellow',
    PAGE: 'gray',
  };

  return colors[type];
}
