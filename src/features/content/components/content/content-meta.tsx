'use client';

import { ClockIcon, EyeIcon } from 'lucide-react';

import IncrementCounter from '@/components/increment-counter';
import { Skeleton } from '@/components/ui/skeleton';
import { useViews } from '@/features/content/hooks/use-views';
import { formatDate } from '@/lib/utils';

import type { ContentMetaProps } from '../../types/content';

const ContentMeta = ({
  date,
  readingTime,
  slug,
  actions,
}: ContentMetaProps) => {
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });
  const publishedDate = date ? formatDate(date) : '';

  return (
    <div className="mt-6 flex flex-col justify-between gap-4 border-y py-4 text-sm sm:flex-row sm:items-center">
      {/* Left section: Published date + stats (when actions exist) or just date (when no actions) */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        {publishedDate && (
          <span>
            Published on{' '}
            <time dateTime={publishedDate} className="font-medium">
              {publishedDate}
            </time>
          </span>
        )}
        {actions && (
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
        )}
      </div>

      {/* Right section: Actions (if provided) or stats (default) */}
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : (
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
      )}
    </div>
  );
};

export default ContentMeta;
