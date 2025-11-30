'use client';

import { ROUTES } from '@/constants/routes';
import {
  BackButton,
  ContentBody,
  ContentHeader,
  ContentMeta,
} from '@/features/content/components';

import { useShortContext } from './short-provider';

const Short = () => {
  const { slug, title, description, date, readingTime, code, headings, tags } =
    useShortContext();

  return (
    <div className="relative">
      {/* Header Section */}
      <ContentHeader leftSection={<BackButton href={ROUTES.shorts} />}>
        {/* Tags */}
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

        {/* Title & Description */}
        <h1 className="font-cal m-0 mt-6 text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        {/* Meta (date, reading time, views) */}
        <ContentMeta date={date} readingTime={readingTime} slug={slug} />
      </ContentHeader>

      {/* Body Section */}
      <ContentBody slug={slug} code={code} headings={headings} />
    </div>
  );
};

export default Short;
