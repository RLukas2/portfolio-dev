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

  // Get all published posts sorted by date
  const publishedPosts = useMemo(
    () =>
      allPosts
        ?.filter((post) => post.published)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ) ?? [],
    [],
  );

  // Get smart related posts with multiple scoring factors
  const relatedPosts = useMemo(() => {
    const currentPostDate = new Date(date).getTime();

    // Calculate similarity score for each post
    const postsWithScore = publishedPosts
      .filter((post) => post.slug !== slug)
      .map((post) => {
        let score = 0;

        // 1. Tag similarity (highest weight)
        if (tags && tags.length > 0 && post.tags && post.tags.length > 0) {
          const sharedTags = post.tags.filter((tag) => tags.includes(tag));
          score += sharedTags.length * 10; // 10 points per shared tag
        }

        // 2. Title/excerpt keyword similarity (medium weight)
        const currentWords = new Set(
          `${title} ${excerpt}`
            .toLowerCase()
            .split(/\W+/)
            .filter((word) => word.length > 4), // Only meaningful words
        );
        const postWords = new Set(
          `${post.title} ${post.excerpt}`
            .toLowerCase()
            .split(/\W+/)
            .filter((word) => word.length > 4),
        );

        const sharedWords = [...currentWords].filter((word) =>
          postWords.has(word),
        );
        score += sharedWords.length * 2; // 2 points per shared keyword

        // 3. Date proximity - posts closer in time are more related
        const postDate = new Date(post.date).getTime();
        const daysDiff =
          Math.abs(currentPostDate - postDate) / (1000 * 60 * 60 * 24);
        const proximityScore = Math.max(0, 5 - daysDiff / 60); // Closer dates get up to 5 points
        score += proximityScore;

        return { post, score };
      })
      .sort((a, b) => b.score - a.score);

    // Return top 3, or fallback to latest if no good matches
    const topPosts = postsWithScore
      .filter((item) => item.score > 0)
      .slice(0, 3);

    if (topPosts.length < 3) {
      // Fill remaining slots with latest posts
      const remaining = 3 - topPosts.length;
      const latestPosts = postsWithScore
        .filter(
          (item) => !topPosts.find((top) => top.post.slug === item.post.slug),
        )
        .slice(0, remaining);
      return [...topPosts, ...latestPosts].map((item) => item.post);
    }

    return topPosts.map((item) => item.post);
  }, [publishedPosts, slug, tags, title, excerpt, date]);

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
      <ContentBody
        slug={slug}
        code={code}
        headings={headings}
        engagements={false}
      />
      {/* Footer */}
      <Container wide>
        <div className="my-8 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Last updated: {formattedModifiedDate}
          </div>
        </div>
      </Container>{' '}
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t pt-12 print:hidden">
          <Container wide>
            <h2 className="font-cal text-2xl md:text-3xl">
              Other posts you might like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4">
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
