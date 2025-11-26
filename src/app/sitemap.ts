import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';

import {
  allPosts,
  allProjects,
  allSnippets,
} from '.content-collections/generated';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.date.split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const snippets = allSnippets
    .filter((snippet) => snippet.published)
    .map((snippet) => ({
      url: `${BASE_URL}${ROUTES.snippets}/${snippet.slug}`,
      lastModified: snippet.date.split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const routePriorities: Record<string, { priority: number; changeFrequency: 'weekly' | 'monthly' }> = {
    '': { priority: 1.0, changeFrequency: 'weekly' },
    [ROUTES.blog]: { priority: 0.9, changeFrequency: 'weekly' },
    [ROUTES.projects]: { priority: 0.9, changeFrequency: 'weekly' },
    [ROUTES.snippets]: { priority: 0.8, changeFrequency: 'weekly' },
    [ROUTES.tags]: { priority: 0.7, changeFrequency: 'monthly' },
    [ROUTES.endorsements]: { priority: 0.6, changeFrequency: 'monthly' },
    [ROUTES.guestbook]: { priority: 0.6, changeFrequency: 'monthly' },
    [ROUTES.about]: { priority: 0.8, changeFrequency: 'monthly' },
    [ROUTES.resume]: { priority: 0.8, changeFrequency: 'monthly' },
    [ROUTES.uses]: { priority: 0.6, changeFrequency: 'monthly' },
  };

  const projects = allProjects
    .filter((project) => project.published)
    .map((project) => ({
      url: `${BASE_URL}${ROUTES.projects}/${project.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const routes = [
    '',
    ROUTES.blog,
    ROUTES.projects,
    ROUTES.snippets,
    ROUTES.tags,
    ROUTES.endorsements,
    ROUTES.guestbook,
    ROUTES.about,
    ROUTES.resume,
    ROUTES.uses,
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: routePriorities[route]?.changeFrequency ?? 'monthly',
    priority: routePriorities[route]?.priority ?? 0.5,
  }));

  return [...routes, ...posts, ...snippets, ...projects];
};

export default sitemap;