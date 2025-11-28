'use client';

import { ClockIcon, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import IncrementCounter from '@/components/increment-counter';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { useViews } from '@/features/content/hooks/use-views';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

import type { Post } from '.content-collections/generated';

type PostCardProps = {
  post: Post;
  className?: string;
};

const PostCard = ({ post, className }: PostCardProps) => {
  const { title, slug, date, excerpt, readingTime, image, imageMeta, tags } =
    post;

  const { views, isLoading: isLoadViews } = useViews({ slug });
  const parsedImageMeta: {
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  } = JSON.parse(imageMeta);

  const extraImageProps = useMemo(() => {
    if (parsedImageMeta?.blurDataURL) {
      return {
        placeholder: 'blur',
        blurDataURL: parsedImageMeta?.blurDataURL,
      } as {
        placeholder: 'blur' | 'empty';
        blurDataURL?: string;
      };
    }

    return {};
  }, [parsedImageMeta?.blurDataURL]);

  const publishedAt = formatDate(date);

  return (
    <Link href={`${ROUTES.blog}/${slug}`} className={cn('block rounded-md')}>
      <div
        className={cn(
          'group flex flex-col gap-4 rounded-2xl py-2 md:flex-row-reverse',
          className,
        )}
      >
        {/* Image */}
        <figure className="bg-card relative aspect-video overflow-hidden md:w-64 md:shrink-0 md:rounded-2xl">
          <Image
            src={image as string}
            alt={title}
            fill
            className="rounded-t-lg object-cover transition-transform group-hover:scale-105 md:rounded-2xl"
            priority
            {...extraImageProps}
          />
        </figure>

        {/* Detail */}
        <div className="w-full">
          {/* Released Date */}
          <time
            dateTime={publishedAt}
            className="text-muted-foreground px-4 text-sm"
          >
            {publishedAt}
          </time>

          {/* Title */}
          <h3 className="font-cal text-card-foreground m-0 mt-2 px-4 text-2xl group-hover:underline md:text-3xl">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground m-0 mt-2 px-4">{excerpt}</p>

          {/* Reading Time, Views, Tags */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ClockIcon className="text-primary size-4" />
                <span title="Estimated read time">{readingTime}</span>
              </div>
              <div
                className="flex items-center gap-1"
                title="Number of view(s)"
              >
                <EyeIcon className="text-primary size-4" />
                {isLoadViews ? (
                  <Skeleton className="h-5 w-16" />
                ) : (
                  <>
                    <IncrementCounter to={views} /> views
                  </>
                )}
              </div>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-muted-foreground rounded-lg px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
