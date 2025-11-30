'use client';

import { ExternalLink } from 'lucide-react';

import { GitHub } from '@/components/common/icons';
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
    readingTime,
    url,
    repositoryUrl,
    playStoreUrl,
    // stacks,
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
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
        >
          <GitHub className="size-4" />
          Repository
        </a>
      )}
      {liveSiteUrl && (
        <a
          href={liveSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ExternalLink className="size-4" />
          Open Live Site
        </a>
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
        {/* {stacks && stacks.length > 0 && (
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
        )} */}

        {/* Title & Description */}
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        {/* Meta (date, reading time, views) with action buttons */}
        <ContentMeta
          readingTime={readingTime}
          slug={slug}
          actions={actionButtons}
        />
      </ContentHeader>

      {/* Reading Section */}
      <ContentBody
        slug={slug}
        code={code}
        headings={headings}
        engagements={false}
      />
    </>
  );
};

export default Project;
