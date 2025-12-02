import { NextResponse } from 'next/server';
import RSS from 'rss';

import { ROUTES } from '@/constants/routes';
import { BASE_URL, SITE } from '@/constants/site';

import { allPosts } from '.content-collections/generated';

export const GET = () => {
  const feed = new RSS({
    title: SITE.title,
    description: SITE.description,
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    image_url: `${BASE_URL}/media/site/logo.png`,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${SITE.author.name}`,
    pubDate: new Date(),
    ttl: 60,
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    custom_elements: [
      {
        'atom:link': {
          _attr: {
            href: `${BASE_URL}/feed.xml`,
            rel: 'self',
            type: 'application/rss+xml',
          },
        },
      },
    ],
  });

  allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach(({ title, longExcerpt, excerpt, slug, date, keywords }) => {
      feed.item({
        title,
        description: longExcerpt ?? excerpt,
        url: `${BASE_URL}${ROUTES.blog}/${slug}`,
        guid: `${BASE_URL}${ROUTES.blog}/${slug}`,
        date,
        author: SITE.author.name,
        categories: keywords ?? [],
      });
    });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
