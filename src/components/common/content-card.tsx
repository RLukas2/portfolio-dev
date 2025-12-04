import { ClockIcon, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import type { ComponentProps } from 'react';

import IncrementCounter from '@/components/increment-counter';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ContentCardImageProps {
  src: string;
  alt: string;
  imageProps?: Partial<
    Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'fill'>
  >;
  className?: string;
}

/**
 * Reusable image component for content cards
 */
export const ContentCardImage = ({
  src,
  alt,
  imageProps = {},
  className,
}: ContentCardImageProps) => {
  const { className: imageClassName, ...restImageProps } = imageProps;

  return (
    <figure
      className={cn('bg-card relative aspect-video overflow-hidden', className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          'object-cover transition-transform group-hover:scale-105',
          imageClassName,
        )}
        priority
        {...restImageProps}
      />
    </figure>
  );
};

interface ContentCardMetaProps {
  readingTime?: string;
  views?: number;
  isLoadingViews?: boolean;
  className?: string;
}

/**
 * Reusable metadata component showing reading time and views
 */
export const ContentCardMeta = ({
  readingTime,
  views,
  isLoadingViews,
  className,
}: ContentCardMetaProps) => (
  <div
    className={cn(
      'text-muted-foreground flex items-center gap-4 text-sm',
      className,
    )}
  >
    {readingTime && (
      <div className="flex items-center gap-1">
        <ClockIcon className="text-primary size-4" />
        <span title="Estimated read time">{readingTime}</span>
      </div>
    )}
    {views !== undefined && (
      <div className="flex items-center gap-1" title="Number of view(s)">
        <EyeIcon className="text-primary size-4" />
        {isLoadingViews ? (
          <Skeleton className="h-5 w-16" />
        ) : (
          <>
            <IncrementCounter to={views} /> views
          </>
        )}
      </div>
    )}
  </div>
);

interface ContentCardTagsProps {
  tags: string[];
  maxTags?: number;
  className?: string;
}

/**
 * Reusable tags component for content cards
 */
export const ContentCardTags = ({
  tags,
  maxTags,
  className,
}: ContentCardTagsProps) => {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;

  if (!tags.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayTags.map((tag) => (
        <span
          key={tag}
          className="bg-secondary text-muted-foreground rounded-lg px-2 py-1 text-xs"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
