'use client';

import { useMemo } from 'react';

import Container from '@/components/core/container';
import { ROUTES } from '@/constants/routes';
import {
  BackButton,
  ContentBody,
  ContentHeader,
  ContentMeta,
  ContentThumbnail,
} from '@/features/content/components';
import { formatDate } from '@/lib/utils';

import PostCard from './post-card';
import { usePostContext } from './post-provider';
import { allPosts } from '.content-collections/generated';

const Post = () => {
  const {
    slug,
    title,
    excerpt,
    date,
    readingTime,
    tags,
    image,
    imageMeta,
    code,
    headings,
    modifiedDate,
  } = usePostContext();

  // Get other published posts excluding the current one
  const relatedPosts = useMemo(
    () =>
      allPosts
        ?.filter((post) => post.published && post.slug !== slug)
        .slice(0, 3) ?? [],
    [slug],
  );

  const formattedModifiedDate = formatDate(modifiedDate);

  return (
    <>
      {/* Hero Image */}
      <ContentThumbnail image={image} title={title} imageMeta={imageMeta} />
      {/* Post Details */}
      <ContentHeader leftSection={<BackButton href={ROUTES.blog} />}>
        {/* Tags */}
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-muted-foreground rounded-lg px-1 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{excerpt}</p>

        {/* Meta (date, reading time, views) */}
        <ContentMeta date={date} readingTime={readingTime} slug={slug} />
      </ContentHeader>
      {/* Reading Section */}
      <ContentBody slug={slug} code={code} headings={headings} />
      {/* Footer */}
      <Container>
        <div className="my-8 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Last updated: {formattedModifiedDate}
          </div>
        </div>
      </Container>{' '}
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t pt-12 print:hidden">
          <Container>
            <h2 className="font-cal text-2xl md:text-3xl">
              Other posts you might like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Post;
