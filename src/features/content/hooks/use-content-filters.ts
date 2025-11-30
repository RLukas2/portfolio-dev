'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type { SortOption, SortOptionItem } from '@/features/content/components';

/** All available sort options */
export const ALL_SORT_OPTIONS: SortOptionItem[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Sort A to Z' },
  { value: 'title-desc', label: 'Sort Z to A' },
  { value: 'views-desc', label: 'Most Views' },
  { value: 'views-asc', label: 'Least Views' },
];

/** Sort options for blog posts: date and views */
export const BLOG_SORT_OPTIONS: SortOptionItem[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'views-desc', label: 'Sort by Views' },
];

/** Sort options for shorts: title and views */
export const SHORTS_SORT_OPTIONS: SortOptionItem[] = [
  { value: 'title-asc', label: 'Sort A to Z' },
  { value: 'title-desc', label: 'Sort Z to A' },
  { value: 'views-desc', label: 'Sort by Views' },
];

/** @deprecated Use BLOG_SORT_OPTIONS or SHORTS_SORT_OPTIONS instead */
export const SORT_OPTIONS = ALL_SORT_OPTIONS;

/**
 * Base interface that content items must satisfy to use the filters hook.
 */
export interface FilterableContent {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
}

export interface UseContentFiltersOptions<T extends FilterableContent> {
  /**
   * Function to extract searchable text from a content item.
   * Defaults to using title and tags.
   */
  getSearchableText?: (item: T) => string;
  /**
   * Default sort option to use.
   * Defaults to 'date-desc'.
   */
  defaultSortOption?: SortOption;
}

export interface UseContentFiltersReturn<T extends FilterableContent> {
  query: string;
  setQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  allTags: string[];
  filteredItems: T[];
}

/**
 * Default function to get searchable text from a content item.
 */
const defaultGetSearchableText = <T extends FilterableContent>(
  item: T,
): string => {
  return item.title + (item.tags?.join(' ') ?? '');
};

/**
 * Filters content items based on search query and selected tags.
 */
const filterItems = <T extends FilterableContent>(
  items: T[],
  query: string,
  selectedTags: string[],
  getSearchableText: (item: T) => string,
): T[] => {
  if (!items) return [];

  let filteredItems = items;

  // Filter by search query
  if (query) {
    filteredItems = filteredItems.filter((item) => {
      const searchContent = getSearchableText(item);
      return searchContent
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }

  // Filter by selected tags
  if (selectedTags.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      selectedTags.some((tag) => item.tags?.includes(tag)),
    );
  }

  return filteredItems;
};

/**
 * Sorts content items based on the selected sort option.
 */
const sortItems = <T extends FilterableContent>(
  items: T[],
  sortOption: SortOption,
  viewCounts: Record<string, number>,
): T[] => {
  const sorted = [...items];

  switch (sortOption) {
    case 'date-desc':
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    case 'date-asc':
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'views-desc':
      return sorted.sort(
        (a, b) => (viewCounts[b.slug] ?? 0) - (viewCounts[a.slug] ?? 0),
      );
    case 'views-asc':
      return sorted.sort(
        (a, b) => (viewCounts[a.slug] ?? 0) - (viewCounts[b.slug] ?? 0),
      );
    default:
      return sorted;
  }
};

/**
 * Gets all unique tags from a list of content items.
 */
const getAllTags = <T extends FilterableContent>(items: T[]): string[] => {
  const tagSet = new Set<string>();
  items.forEach((item) => {
    item.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

/**
 * Generic hook to manage content filtering and sorting.
 * Works with any content type that has title, date, and optional tags.
 *
 * @param items - Array of content items to manage
 * @param options - Optional configuration for customizing filter behavior
 * @returns Object containing filter and sort state and handlers
 *
 * @example
 * // For posts
 * const { filteredItems, ...filters } = useContentFilters(posts, {
 *   getSearchableText: (post) => post.title + post.excerpt + post.tags?.join(' '),
 * });
 *
 * @example
 * // For shorts
 * const { filteredItems, ...filters } = useContentFilters(shorts, {
 *   getSearchableText: (short) => short.title + short.description + short.tags?.join(' '),
 * });
 */
export const useContentFilters = <T extends FilterableContent>(
  items: T[],
  options: UseContentFiltersOptions<T> = {},
): UseContentFiltersReturn<T> => {
  const {
    getSearchableText = defaultGetSearchableText,
    defaultSortOption = 'date-desc',
  } = options;

  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(defaultSortOption);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  // Fetch view counts on mount
  useEffect(() => {
    const fetchViewCounts = async () => {
      try {
        const response = await fetch('/api/views');
        if (response.ok) {
          const data = await response.json();
          setViewCounts(data);
        }
      } catch (error) {
        console.error('Failed to fetch view counts:', error);
      }
    };

    fetchViewCounts();
  }, []);

  const allTags = useMemo(() => getAllTags(items), [items]);

  const filteredItems = useMemo(() => {
    const filtered = filterItems(items, query, selectedTags, getSearchableText);
    return sortItems(filtered, sortOption, viewCounts);
  }, [items, query, selectedTags, sortOption, getSearchableText, viewCounts]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedTags([]);
    setSortOption(defaultSortOption);
  }, [defaultSortOption]);

  const hasActiveFilters =
    !!query || selectedTags.length > 0 || sortOption !== defaultSortOption;

  return {
    query,
    setQuery,
    sortOption,
    setSortOption,
    selectedTags,
    toggleTag,
    clearFilters,
    hasActiveFilters,
    allTags,
    filteredItems,
  };
};
