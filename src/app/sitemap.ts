import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';

import {
  allPosts,
  allProjects,
  allShorts,
} from '.content-collections/generated';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.modifiedDate
        ? new Date(post.modifiedDate)
        : new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: post.image ? [`${BASE_URL}${post.image}`] : undefined,
    }));

  const shorts = allShorts
    .filter((short) => short.published)
    .map((short) => ({
      url: `${BASE_URL}${ROUTES.shorts}/${short.slug}`,
      lastModified: new Date(short.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const routePriorities: Record<
    string,
    { priority: number; changeFrequency: 'weekly' | 'monthly' }
  > = {
    '': { priority: 1.0, changeFrequency: 'weekly' },
    [ROUTES.blog]: { priority: 0.9, changeFrequency: 'weekly' },
    [ROUTES.projects]: { priority: 0.9, changeFrequency: 'weekly' },
    [ROUTES.shorts]: { priority: 0.8, changeFrequency: 'weekly' },
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
      lastModified: new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: project.image ? [`${BASE_URL}${project.image}`] : undefined,
    }));

  const routes = [
    '',
    ROUTES.blog,
    ROUTES.projects,
    ROUTES.shorts,
    ROUTES.tags,
    ROUTES.endorsements,
    ROUTES.guestbook,
    ROUTES.about,
    ROUTES.resume,
    ROUTES.uses,
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: routePriorities[route]?.changeFrequency ?? 'monthly',
    priority: routePriorities[route]?.priority ?? 0.5,
  }));

  return [...routes, ...posts, ...shorts, ...projects];
};

export default sitemap;
