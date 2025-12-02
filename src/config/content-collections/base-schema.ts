import { z } from 'zod';

import { SITE } from '@/constants/site';

/**
 * Base schema shared across all content types
 * Ensures consistency and includes all common fields
 */
export const baseContentSchema = z.object({
  // Core fields
  title: z.string().min(1, 'Title too short').max(100, 'Title too long'),
  excerpt: z.string().default(''),
  description: z.string().default(''),
  date: z.iso.datetime().or(z.iso.date()),
  published: z.boolean().default(false),
  tags: z.array(z.string()).max(10, 'Too many tags').default([]),

  // Optional common fields
  featured: z.boolean().default(false),

  // Series/Collection support
  series: z.string().optional(),
  seriesOrder: z.number().optional(),

  // Author support (for multi-author blogs)
  author: z.string().default(SITE.author.name),
  authorEmail: z.email().optional().default(SITE.author.email),
  authorUrl: z.url().optional().default(SITE.author.url),

  // Related content
  relatedSlugs: z.array(z.string()).default([]),

  // Internal
  content: z.string().optional(),
});

export type BaseContent = z.infer<typeof baseContentSchema>;

/**
 * Post-specific schema
 */
export const postSchema = baseContentSchema.extend({
  image: z.string().optional(),
  keywords: z.array(z.string()).default([]),

  modifiedDate: z.iso.datetime().or(z.iso.date()),
});

/**
 * Project-specific schema
 */
export const projectSchema = baseContentSchema.extend({
  image: z.string(),
  highlight: z.boolean().default(false),
  stacks: z.array(z.string()).default([]),
  url: z.url().nullable().optional(),
  repositoryUrl: z.url().optional(),
  playStoreUrl: z.url().optional(),
});

/**
 * Short-specific schema
 */
export const shortSchema = baseContentSchema.extend({
  // Shorts are simpler, just use base schema
});

/**
 * Page-specific schema
 */
export const pageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
});
