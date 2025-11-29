'use client';

import { ExternalLink } from 'lucide-react';

import { GitHub } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import {
  BackButton,
  ContentBody,
  ContentHeader,
  ContentMeta,
  ContentThumbnail,
} from '@/features/content/components';

import { useProjectContext } from './project-provider';

const Project = () => {
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
    image,
    imageMeta,
    code,
    headings,
  } = useProjectContext();

  const liveSiteUrl = url ?? playStoreUrl;

  // Action buttons for the header
  const actionButtons = (
    <>
      {repositoryUrl && (
        <Button asChild variant="outline" size="sm">
          <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
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
    </>
  );

  return (
    <>
      {/* Hero Image */}
      <ContentThumbnail image={image} title={title} imageMeta={imageMeta} />

      {/* Project Details */}
      <ContentHeader leftSection={<BackButton href={ROUTES.projects} />}>
        {/* Stacks/Tags */}
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

        {/* Title & Description */}
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        {/* Meta (date, reading time, views) with action buttons */}
        <ContentMeta
          date={date}
          readingTime={readingTime}
          slug={slug}
          actions={actionButtons}
        />
      </ContentHeader>

      {/* Reading Section */}
      <ContentBody slug={slug} code={code} headings={headings} />
    </>
  );
};

export default Project;
