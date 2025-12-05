'use client';

import { GitHub } from '@/components/common/icons';
import { Badge } from '@/components/ui/badge';
import Contributions from '@/features/dashboard/components/contributions';
import { useStats } from '@/features/dashboard/hooks/use-stats';
import type { GitHubStats } from '@/features/dashboard/types/stats';
import { cn } from '@/lib/utils';

interface GitHubWidgetProps {
  className?: string;
}

export function GitHubWidget({ className = '' }: GitHubWidgetProps) {
  const { stats, isLoading } = useStats<GitHubStats>('github');

  const contributions =
    stats?.contributions.contributionsCollection.contributionCalendar;

  const totalContributions = contributions?.totalContributions ?? 0;
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-4 overflow-hidden p-4',
        'relative justify-between',
        'max-md:gap-4',
        className,
      )}
    >
      {/* Header Row */}
      <div className="max-xs:flex-col flex items-baseline justify-between gap-4">
        {/* Badge */}
        <Badge variant="wide" className="gap-2 text-sm">
          <GitHub className="size-6" />
          <span className="text-sm">GitHub Activity</span>
        </Badge>

        {/* Contribution Count */}
        {!isLoading && (
          <p className="line-clamp-1 flex flex-col items-end text-right text-sm">
            {`${totalContributions} contributions in the last year`}
          </p>
        )}
      </div>{' '}
      {/* Heatmap */}
      <div className="flex-1">
        {isLoading ? (
          <div className="bg-muted flex h-full items-center justify-center rounded-lg">
            <span className="text-muted-foreground text-sm">Loading...</span>
          </div>
        ) : (
          <Contributions data={contributions} className="bg-transparent p-0" />
        )}
      </div>
    </div>
  );
}
