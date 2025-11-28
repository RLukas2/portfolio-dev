'use client';

import { ClockIcon, EyeIcon } from 'lucide-react';

import Container from '@/components/core/container';
import IncrementCounter from '@/components/increment-counter';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import BackButton from '@/features/content/components/back-button';
import { useViews } from '@/features/content/hooks/use-views';
import { formatDate } from '@/lib/utils';

import { usePostContext } from './post-provider';

const PostHeader = () => {
  const { slug, title, excerpt, date, readingTime, tags } = usePostContext();
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });

  const publishedDate = formatDate(date);

  return (
    <Container className="pt-4">
      <BackButton href={ROUTES.blog} />

      <div className="mt-6">
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
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{excerpt}</p>

        <div className="mt-6 flex flex-col justify-between gap-2 border-y py-4 text-sm sm:flex-row">
          <span>
            Published on{' '}
            <time dateTime={publishedDate} className="font-medium">
              {publishedDate}
            </time>
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="text-primary size-4" />
              <span title="Estimated read time">{readingTime}</span>
            </div>
            <div className="flex items-center gap-1" title="Number of view(s)">
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
        </div>
      </div>
    </Container>
  );
};

export default PostHeader;
