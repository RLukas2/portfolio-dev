'use client';

import { ChevronRightIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cloneElement, useMemo } from 'react';

import { GitHub } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTES } from '@/constants/routes';
import { STACKS } from '@/constants/stacks';
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

  const parsedImageMeta: {
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  } = JSON.parse(imageMeta);

  const extraImageProps = useMemo(() => {
    if (image && parsedImageMeta?.blurDataURL) {
      return {
        placeholder: 'blur',
        blurDataURL: parsedImageMeta?.blurDataURL,
      } as {
        placeholder: 'blur' | 'empty';
        blurDataURL?: string;
      };
    }

    return {};
  }, [image, parsedImageMeta?.blurDataURL]);

  const projectDetailUrl = `${ROUTES.projects}/${slug}`;
  const liveSiteUrl = url ?? playStoreUrl;

  return (
    <div
      className={cn(
        'group md:rounded-0 gap-0 rounded-2xl md:gap-8 lg:flex',
        className,
      )}
    >
      {/* Image */}
      <div className="bg-card relative aspect-video md:aspect-square md:w-64 md:shrink-0 md:rounded-2xl">
        <div className="absolute size-full" />
        <Image
          src={image as string}
          alt={title}
          fill
          className="group-hover:scale-105s rounded-t-lg object-cover transition-transform md:rounded-2xl"
          priority
          {...extraImageProps}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col rounded-b-xl border border-dashed px-4 py-4 md:rounded-2xl">
        {/* Title & Description */}
        <div className="flex flex-col space-y-2 p-4">
          <Link href={projectDetailUrl}>
            <h2 className="font-cal text-card-foreground m-0 text-3xl hover:underline">
              {title}
            </h2>
          </Link>
          <p className="text-muted-foreground m-0">{description}</p>
        </div>

        {/* Stacks */}
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

        {/* CTA */}
        <div className="mt-auto flex flex-wrap items-center gap-2 px-4 pb-4">
          <Button asChild variant="shadow" size="sm">
            <Link href={projectDetailUrl}>
              View Project <ChevronRightIcon />
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-4">
            {repositoryUrl && (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
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
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <ExternalLink className="size-4" />
                Open Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
