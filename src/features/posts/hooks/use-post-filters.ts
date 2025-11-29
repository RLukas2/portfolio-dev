'use client';

import { useMemo, useState } from 'react';

import type { Post } from '.content-collections/generated';

export type SortOption = 'date-desc' | 'date-asc' | 'views-desc' | 'views-asc';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'views-desc', label: 'Most Views' },
  { value: 'views-asc', label: 'Least Views' },
];

/**
 * Filters posts based on search query and selected tags.
 *
 * @param {Post[]} posts - Array of posts to filter
 * @param {string} query - Search query string
 * @param {string[]} selectedTags - Array of selected tags
 * @returns {Post[]} - Array of filtered posts
 */
const filterPosts = (
  posts: Post[],
  query: string,
  selectedTags: string[],
): Post[] => {
  if (!posts) return [];

  let filteredPosts = posts;

  // Filter by search query
  if (query) {
    filteredPosts = filteredPosts.filter((post) => {
      const searchContent = post.title + post.excerpt + post.tags?.join(' ');
      return searchContent
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }

  // Filter by selected tags
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      selectedTags.some((tag) => post.tags?.includes(tag)),
    );
  }

  return filteredPosts;
};

/**
 * Sorts posts based on the selected sort option.
 *
 * @param {Post[]} posts - Array of posts to sort
 * @param {SortOption} sortOption - Selected sort option
 * @returns {Post[]} - Array of sorted posts
 */
const sortPosts = (posts: Post[], sortOption: SortOption): Post[] => {
  const sorted = [...posts];

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
 * Gets all unique tags from the list of posts.
 *
 * @param {Post[]} posts - Array of posts to extract tags from
 * @returns {string[]} - Array of unique tags
 */
const getAllTags = (posts: Post[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export interface UsePostFiltersReturn {
  query: string;
  setQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  allTags: string[];
  filteredPosts: Post[];
}

/**
 * Custom hook to manage post filtering and sorting.
 *
 * @param {Post[]} posts - Array of posts to manage
 * @returns {UsePostFiltersReturn} - Object containing filter and sort state and handlers
 */
export const usePostFilters = (posts: Post[]): UsePostFiltersReturn => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => getAllTags(posts), [posts]);

  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(posts, query, selectedTags);
    return sortPosts(filtered, sortOption);
  }, [posts, query, selectedTags, sortOption]);

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
    filteredPosts,
  };
};
