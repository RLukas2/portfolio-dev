import { allPosts, allProjects, allShorts } from 'content-collections';
import { BookOpenIcon, FolderIcon, ZapIcon } from 'lucide-react';
import { type JSX, useMemo } from 'react';

import { ROUTES } from '@/constants/routes';
import { trim } from '@/lib/utils';
import type { CommandMenuItem } from '@/types/menu';

const MAX_RESULTS = 5;
const DESCRIPTION_LENGTH = 60;

interface SearchableContent {
  title: string;
  slug: string;
  published: boolean;
  excerpt?: string;
  description?: string;
  tags?: string[];
  stacks?: string[];
}

const searchContent = <T extends SearchableContent>(
  items: T[],
  query: string,
  route: string,
  icon: JSX.Element,
  type: 'Blog Post' | 'Project' | 'Short',
  getDescription: (item: T) => string | undefined,
): CommandMenuItem[] => {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();

  return items
    .filter((item) => item.published)
    .filter((item) => {
      const searchableText = [
        item.title,
        getDescription(item),
        ...(item.tags || []),
        ...(item.stacks || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(lowerQuery);
    })
    .slice(0, MAX_RESULTS)
    .map((item) => ({
      label: item.title,
      href: `${route}/${item.slug}`,
      icon,
      isExternal: false,
      eventName: `Search: ${type} - ${item.title}`,
      type: 'CONTENT' as const,
      description: trim(getDescription(item) || '', DESCRIPTION_LENGTH),
    }));
};

export const useContentSearch = (searchQuery: string) => {
  const filteredPosts = useMemo(
    () =>
      searchContent(
        allPosts,
        searchQuery,
        ROUTES.blog,
        <BookOpenIcon className="size-4" />,
        'Blog Post',
        (post) => post.excerpt,
      ),
    [searchQuery],
  );

  const filteredProjects = useMemo(
    () =>
      searchContent(
        allProjects,
        searchQuery,
        ROUTES.projects,
        <FolderIcon className="size-4" />,
        'Project',
        (project) => project.description,
      ),
    [searchQuery],
  );

  const filteredShorts = useMemo(
    () =>
      searchContent(
        allShorts,
        searchQuery,
        ROUTES.shorts,
        <ZapIcon className="size-4" />,
        'Short',
        (short) => short.excerpt,
      ),
    [searchQuery],
  );

  return { filteredPosts, filteredProjects, filteredShorts };
};
