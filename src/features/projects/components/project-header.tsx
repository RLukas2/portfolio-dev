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
  } = useProjectContext();
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });
  const pageHeaderRef = useRef<HTMLDivElement>(null);

  const publishedDate = formatDate(date);
  const liveSiteUrl = url ?? playStoreUrl;

  return (
    <>
      <BackButton href={ROUTES.projects} />
      <PageHeader title={title} description={description} ref={pageHeaderRef} />
      <Container>
        <div className="mt-4 flex flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span>
              Published on{' '}
              <time dateTime={publishedDate} className="px-1">
                {publishedDate}
              </time>
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ClockIcon className="text-primary size-5" />
                <span title="Estimated read time">{readingTime}</span>
              </div>
              <div
                className="flex items-center gap-1"
                title="Number of view(s)"
              >
                <EyeIcon className="text-primary size-5" />
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
      </Container>
    </>
  );
};

export default ProjectHeader;
