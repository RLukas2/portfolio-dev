'use client';

import { ClockIcon, ExternalLink, EyeIcon } from 'lucide-react';
import { useRef } from 'react';

import { GitHub } from '@/components/common/icons';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import IncrementCounter from '@/components/increment-counter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import BackButton from '@/features/content/components/back-button';
import { useViews } from '@/features/content/hooks/use-views';
import StickyTitle from '@/features/posts/components/sticky-title';
import { formatDate } from '@/lib/utils';

import { useProjectContext } from './project-provider';

const ProjectHeader = () => {
  const {
    slug,
    title,
    description,
    date,
    readingTime,
    url,
    repositoryUrl,
    playStoreUrl,
    stacks,
  } = useProjectContext();
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });
  const projectHeaderRef = useRef<HTMLDivElement>(null);

  const publishedDate = formatDate(date);
  const liveSiteUrl = url ?? playStoreUrl;

  return (
    <Container className="py-4">
      <BackButton href={ROUTES.projects} />

      {/* Sticky Title on Header */}
      <PageHeader
        title={title}
        description={description}
        ref={projectHeaderRef}
      />
      <StickyTitle title={title} elementRef={projectHeaderRef} />

      <div className="mt-6">
        {stacks && stacks.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {stacks.map((stack) => (
              <span
                key={stack}
                className="bg-secondary text-muted-foreground rounded-lg px-1 py-1 text-xs"
              >
                {stack}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        <div className="mt-6 flex flex-col justify-between gap-4 border-y py-4 text-sm sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
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
          </div>
          <div className="flex items-center gap-2">
            {repositoryUrl && (
              <Button asChild variant="outline" size="sm">
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub className="mr-2 size-4" />
                  Repository
                </a>
              </Button>
            )}
            {liveSiteUrl && (
              <Button asChild variant="default" size="sm">
                <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 size-4" />
                  Live Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProjectHeader;
