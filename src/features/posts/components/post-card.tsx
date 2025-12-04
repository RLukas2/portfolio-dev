'use client';

import Link from 'next/link';

import {
  ContentCardImage,
  ContentCardMeta,
  ContentCardTags,
} from '@/components/common/content-card';
import { ROUTES } from '@/constants/routes';
import { useViews } from '@/features/content/hooks/use-views';
import { MAX_TAG_PER_POSTS } from '@/features/posts/constants';
import { useImageMeta } from '@/hooks/use-image-meta';
import { cn, formatDate } from '@/lib/utils';

import type { Post } from '.content-collections/generated';

type PostCardProps = {
  post: Post;
  className?: string;
};

/**
 * PostCard component that displays a summary of a blog post.
 */
const PostCard = ({ post, className }: PostCardProps) => {
  const { title, slug, date, excerpt, readingTime, image, imageMeta, tags } =
    post;

  const { views, isLoading: isLoadViews } = useViews({ slug });
  const { imageProps } = useImageMeta(imageMeta);
  const publishedAt = formatDate(date);

  return (
    <Link href={`${ROUTES.blog}/${slug}`} className={cn('block rounded-md')}>
      <div
        className={cn(
          'group flex flex-col gap-4 rounded-2xl py-2',
          'md:flex-row-reverse',
          'transition-all duration-300 hover:scale-[1.02]',
          className,
        )}
      >
        <ContentCardImage
          src={image as string}
          alt={title}
          imageProps={{
            ...imageProps,
            className: 'rounded-t-lg md:rounded-2xl',
          }}
          className="md:w-48 md:shrink-0 md:rounded-2xl"
        />

        <div className="w-full">
          <time
            dateTime={publishedAt}
            className="text-muted-foreground text-sm"
          >
            {publishedAt}
          </time>

          <h3
            className={cn(
              'font-cal text-card-foreground text-2xl md:text-3xl',
              'm-0 mt-2',
              'group-hover:text-primary transition-colors duration-200 group-hover:underline',
            )}
          >
            {title}
          </h3>

          <p className="text-muted-foreground m-0 mt-2">{excerpt}</p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 py-4">
            <ContentCardMeta
              readingTime={readingTime}
              views={views}
              isLoadingViews={isLoadViews}
            />
            <ContentCardTags tags={tags || []} maxTags={MAX_TAG_PER_POSTS} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
