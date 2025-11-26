import { FileTextIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { cn, formatDate } from '@/lib/utils';

import { EDUCATION } from '../education';
import { EXPERIENCES } from '../experiences';
import type { Experience } from '../types';
import EducationEntry from './education-entry';
import ExperienceEntry from './experience-entry';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

const CareerJourney = () => {
  const lastUpdated = formatDate('2025-11-16');

  // Helper function to check if an entry is an experience
  const isExperience = (entry: any): entry is Experience => {
    return 'company' in entry && 'role' in entry;
  };

  // Combine experiences and education into a single timeline
  const timelineEntries = [
    ...EXPERIENCES.map((exp) => ({ ...exp, type: 'experience' as const })),
    ...EDUCATION.map((edu) => ({ ...edu, type: 'education' as const })),
  ].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-end">
        <Button asChild variant="shadow">
          <Link
            href={`${ROUTES.resume}/download`}
            target="_blank"
            className="gap-x-1"
          >
            <FileTextIcon />
            Download resume
          </Link>
        </Button>
      </div>

      {timelineEntries && timelineEntries.length > 0 ? (
        <div className="prose dark:prose-dark max-w-none px-4">
          <ol className="border-border list-none space-y-4 border-l pl-10">
            {timelineEntries.map((entry) => {
              if (isExperience(entry)) {
                return (
                  <ExperienceEntry
                    key={`exp-${entry.company.name}-${entry.role}-${entry.startDate}`}
                    experience={entry}
                  />
                );
              } else {
                return (
                  <EducationEntry
                    key={`edu-${entry.institution}-${entry.degree}-${entry.startDate}`}
                    education={entry}
                  />
                );
              }
            })}
          </ol>
          <div className="mt-12">
            <p className="text-muted-foreground">
              Last updated at{' '}
              <time dateTime={lastUpdated} className="font-cal">
                {lastUpdated}
              </time>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1
            className={cn(
              'animate-glitch text-4xl font-semibold',
              'before:animate-glitch-top before:absolute before:left-0 before:content-[attr(title)] before:[clip-path:polygon(0%_0%,100%_0%,100%_33%,0%_33%)]',
              'after:animate-glitch-bottom after:absolute after:left-0 after:content-[attr(title)] after:[clip-path:polygon(0%_67%,100%_67%,100%_100%,0%_100%)]',
            )}
          >
            No Timeline Entries Found
          </h1>
          <p className="text-foreground mt-4 text-center">
            It seems there are no career experiences or education entries to
            display at the moment...
          </p>
          <p className="text-foreground mt-2 text-center">
            Maybe you can check back later?
          </p>
        </div>
      )}
    </>
  );
};

export default CareerJourney;
