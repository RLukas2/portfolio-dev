'use client';

import { ChevronRightIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cloneElement } from 'react';

import { ContentCardImage } from '@/components/common/content-card';
import ExternalLinkComponent from '@/components/common/external-link';
import { GitHub } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTES } from '@/constants/routes';
import { STACKS } from '@/constants/stacks';
import { useImageMeta } from '@/hooks/use-image-meta';
import { cn } from '@/lib/utils';

import type { Project } from '.content-collections/generated';

type ProjectCardProps = {
  project: Project;
  className?: string;
};

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const {
    title,
    description,
    slug,
    image,
    imageMeta,
    url,
    repositoryUrl,
    playStoreUrl,
    stacks,
  } = project;

  const { imageProps } = useImageMeta(imageMeta);
  const projectDetailUrl = `${ROUTES.projects}/${slug}`;
  const liveSiteUrl = url ?? playStoreUrl;

  return (
    <div
      className={cn(
        'group md:rounded-0 gap-0 rounded-2xl md:flex md:gap-8',
        className,
      )}
    >
      <ContentCardImage
        src={image as string}
        alt={title}
        imageProps={{
          ...imageProps,
          className: 'rounded-t-lg object-center md:rounded-2xl',
        }}
        className="md:aspect-square md:w-64 md:shrink-0 md:rounded-2xl"
      />

      <div className="flex flex-1 flex-col rounded-b-xl border border-dashed px-4 py-4 md:rounded-2xl">
        <div className="flex flex-col space-y-2 p-4">
          <Link href={projectDetailUrl}>
            <h2 className="font-cal text-card-foreground m-0 text-3xl hover:underline">
              {title}
            </h2>
          </Link>
          <p className="text-muted-foreground m-0">{description}</p>
        </div>

        {stacks && stacks.length > 0 && (
          <div className="mx-4 mb-4 flex items-center gap-2">
            <p className="text-sm">Tools: </p>
            <ul className="flex gap-2">
              {stacks.map((stack) => (
                <li key={stack}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {STACKS[stack] &&
                        cloneElement(STACKS[stack], {
                          className: cn(
                            `${STACKS[stack].props.className ?? ''} size-5`,
                          ),
                        })}
                    </TooltipTrigger>
                    <TooltipContent>{stack}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 px-4 pb-4">
          <Button asChild variant="shadow" size="default">
            <Link href={projectDetailUrl}>
              View Project <ChevronRightIcon />
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-4">
            {repositoryUrl && (
              <ExternalLinkComponent href={repositoryUrl}>
                <GitHub className="size-4" />
                Repository
              </ExternalLinkComponent>
            )}
            {liveSiteUrl && (
              <ExternalLinkComponent href={liveSiteUrl}>
                <ExternalLink className="size-4" />
                Open Live Site
              </ExternalLinkComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
