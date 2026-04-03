import type { SimpleIcon } from 'simple-icons';

/**
 * Table of contents entry
 * Used for article/document navigation
 */
export interface TOC {
  depth: number;
  title: string;
  url: string;
}

/**
 * Content collection metadata
 * Used for grouping related content
 */
export interface Collection {
  _id: string;
  count: number;
  description: string;
  slug: string;
  title: string;
}

/**
 * Bookmark/saved link
 * Used for curated link collections
 */
export interface Bookmark {
  _id: string;
  cover: string;
  domain: string;
  excerpt: string;
  link: string;
  note: string;
  tags: string[];
  title: string;
}

/**
 * Tool/software usage data
 * Used for "uses" page showing tech stack
 */
export interface UseData {
  description: string;
  icon: SimpleIcon;
  link: string;
  name: string;
}
