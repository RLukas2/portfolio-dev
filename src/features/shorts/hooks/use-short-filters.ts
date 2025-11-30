'use client';

import { useMemo, useState } from 'react';

import type { SortOption, SortOptionItem } from '@/features/content/components';

import type { Short } from '.content-collections/generated';

export const SORT_OPTIONS: SortOptionItem[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'views-desc', label: 'Most Views' },
  { value: 'views-asc', label: 'Least Views' },
];

/**
 * Filters shorts based on search query and selected tags.
 *
 * @param {Short[]} shorts - Array of shorts to filter
 * @param {string} query - Search query string
 * @param {string[]} selectedTags - Array of selected tags
 * @returns {Short[]} - Array of filtered shorts
 */
const filterShorts = (
  shorts: Short[],
  query: string,
  selectedTags: string[],
): Short[] => {
  if (!shorts) return [];

  let filteredShorts = shorts;

  // Filter by search query
  if (query) {
    filteredShorts = filteredShorts.filter((short) => {
      const searchContent =
        short.title + short.description + short.tags?.join(' ');
      return searchContent
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }

  // Filter by selected tags
  if (selectedTags.length > 0) {
    filteredShorts = filteredShorts.filter((short) =>
      selectedTags.some((tag) => short.tags?.includes(tag)),
    );
  }

  return filteredShorts;
};

/**
 * Sorts shorts based on the selected sort option.
 *
 * @param {Short[]} shorts - Array of shorts to sort
 * @param {SortOption} sortOption - Selected sort option
 * @returns {Short[]} - Array of sorted shorts
 */
const sortShorts = (shorts: Short[], sortOption: SortOption): Short[] => {
  const sorted = [...shorts];

  switch (sortOption) {
    case 'date-desc':
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    case 'date-asc':
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    case 'views-desc':
    case 'views-asc':
      // Views sorting would require fetching view counts - for now, fallback to date
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    default:
      return sorted;
  }
};

/**
 * Gets all unique tags from the list of shorts.
 *
 * @param {Short[]} shorts - Array of shorts to extract tags from
 * @returns {string[]} - Array of unique tags
 */
const getAllTags = (shorts: Short[]): string[] => {
  const tagSet = new Set<string>();
  shorts.forEach((short) => {
    short.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export interface UseShortFiltersReturn {
  query: string;
  setQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  allTags: string[];
  filteredShorts: Short[];
}

/**
 * Custom hook to manage short filtering and sorting.
 *
 * @param {Short[]} shorts - Array of shorts to manage
 * @returns {UseShortFiltersReturn} - Object containing filter and sort state and handlers
 */
export const useShortFilters = (shorts: Short[]): UseShortFiltersReturn => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => getAllTags(shorts), [shorts]);

  const filteredShorts = useMemo(() => {
    const filtered = filterShorts(shorts, query, selectedTags);
    return sortShorts(filtered, sortOption);
  }, [shorts, query, selectedTags, sortOption]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedTags([]);
    setSortOption('date-desc');
  };

  const hasActiveFilters =
    !!query || selectedTags.length > 0 || sortOption !== 'date-desc';

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
    filteredShorts,
  };
};
