import type { ContentType } from '@prisma/client';
import {
  allPages,
  allPosts,
  allProjects,
  allShorts,
} from 'content-collections';

/**
 * Get all content of a specific type
 */
export function getContentByType(type: ContentType) {
  switch (type) {
    case 'POST':
      return allPosts;
    case 'PROJECT':
      return allProjects;
    case 'SHORT':
      return allShorts;
    case 'PAGE':
      return allPages;
    default:
      return [];
  }
}

/**
 * Get all published content of a specific type
 */
export function getPublishedContent(type: ContentType) {
  const content = getContentByType(type);
  return content.filter((item: any) => item.published);
}

/**
 * Get content by slug
 */
export function getContentBySlug(slug: string) {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
    ...allPages.map((p) => ({ ...p, type: 'PAGE' as const })),
  ];

  return allContent.find((item) => item.slug === slug);
}

/**
 * Get content by series
 */
export function getContentBySeries(series: string) {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  return allContent
    .filter((item: any) => item.series === series)
    .sort((a: any, b: any) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

/**
 * Get related content by slugs
 */
export function getRelatedContent(slugs: string[]) {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  return slugs
    .map((slug) => allContent.find((item) => item.slug === slug))
    .filter(Boolean);
}

/**
 * Get all unique tags
 */
export function getAllTags() {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  const tags = new Set<string>();
  allContent.forEach((item: any) => {
    if (item.tags) {
      item.tags.forEach((tag: string) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Get content by tag
 */
export function getContentByTag(tag: string) {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  return allContent.filter((item: any) => item.tags?.includes(tag));
}

/**
 * Get all unique series
 */
export function getAllSeries() {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  const series = new Set<string>();
  allContent.forEach((item: any) => {
    if (item.series) {
      series.add(item.series);
    }
  });

  return Array.from(series).sort();
}

/**
 * Get featured content
 */
export function getFeaturedContent(type?: ContentType) {
  let content: any[];

  if (type) {
    content = getContentByType(type);
  } else {
    content = [
      ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
      ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
      ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
    ];
  }

  return content.filter((item: any) => item.featured && item.published);
}

/**
 * Search content by title or description
 */
export function searchContent(query: string) {
  const allContent = [
    ...allPosts.map((p) => ({ ...p, type: 'POST' as const })),
    ...allProjects.map((p) => ({ ...p, type: 'PROJECT' as const })),
    ...allShorts.map((p) => ({ ...p, type: 'SHORT' as const })),
  ];

  const lowerQuery = query.toLowerCase();

  return allContent.filter(
    (item: any) =>
      item.published &&
      (item.title?.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag: string) =>
          tag.toLowerCase().includes(lowerQuery),
        )),
  );
}

/**
 * Get content statistics
 */
export function getContentStats() {
  return {
    posts: {
      total: allPosts.length,
      published: allPosts.filter((p) => p.published).length,
    },
    projects: {
      total: allProjects.length,
      published: allProjects.filter((p) => p.published).length,
    },
    shorts: {
      total: allShorts.length,
      published: allShorts.filter((p) => p.published).length,
    },
    pages: {
      total: allPages.length,
    },
  };
}
