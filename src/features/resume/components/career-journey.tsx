import { DownloadIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { cn, formatDate } from '@/lib/utils';

import { EDUCATION } from '../constants/education';
import { EXPERIENCES } from '../constants/experiences';
import type { Experience } from '../types';
import EducationEntry from './education-entry';
import ExperienceEntry from './experience-entry';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

interface CareerJourneyProps {
  header?: boolean;
  downloadButton?: boolean;
}

const CareerJourney = ({ header, downloadButton }: CareerJourneyProps) => {
  /**
   * Last updated date formatted as a string
   * Update this date whenever you make changes to your resume
   */
  const lastUpdated = formatDate('2025-11-30');

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
    <div className="space-y-8">
      {/* Header with download button */}
      {header && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-cal text-3xl">Career Journey</h2>
            <p className="text-muted-foreground m-0 mt-2">
              A timeline of my professional experience and education.
            </p>

            <p className="text-muted-foreground m-0 text-sm">
              Last updated:{' '}
              <time dateTime={lastUpdated} className="font-medium">
                {lastUpdated}
              </time>
            </p>
          </div>
          {downloadButton && (
            <Button asChild variant="shadow" size="default">
              <Link
                href={`${ROUTES.resume}/download`}
                target="_blank"
                className="gap-x-2"
              >
                <DownloadIcon className="size-4" />
                Download PDF
              </Link>
            </Button>
          )}
        </div>
      )}

      {timelineEntries && timelineEntries.length > 0 ? (
        <div className="relative">
          {/* Timeline entries */}
          <ol className="m-0 list-none space-y-6 p-0">
            {timelineEntries.map((entry, index) => {
              const isLast = index === timelineEntries.length - 1;
              if (isExperience(entry)) {
                return (
                  <ExperienceEntry
                    key={`exp-${entry.company.name}-${entry.role}-${entry.startDate}`}
                    experience={entry}
                    isLast={isLast}
                  />
                );
              } else {
                return (
                  <EducationEntry
                    key={`edu-${entry.institution.name}-${entry.degree}-${entry.startDate}`}
                    education={entry}
                    isLast={isLast}
                  />
                );
              }
            })}
          </ol>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <h1
            className={cn(
              'animate-glitch text-4xl font-semibold',
              'before:animate-glitch-top before:absolute before:left-0 before:content-[attr(title)] before:[clip-path:polygon(0%_0%,100%_0%,100%_33%,0%_33%)]',
              'after:animate-glitch-bottom after:absolute after:left-0 after:content-[attr(title)] after:[clip-path:polygon(0%_67%,100%_67%,100%_100%,0%_100%)]',
            )}
          >
            No Timeline Entries Found
          </h1>
          <p className="text-muted-foreground mt-4 text-center">
            It seems there are no career experiences or education entries to
            display at the moment...
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerJourney;
