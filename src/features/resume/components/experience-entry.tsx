import { BriefcaseIcon, CalendarIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { Experience } from '../types';
import TimelineCard from './shared/timeline-card';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface ExperienceEntryProps {
  experience: Experience;
  isLast?: boolean;
}

/**
 * Experience component
 * Displays information about a single work experience entry.
 *
 * @param {ExperienceEntryProps} param0 - Props for the ExperienceEntry component.
 * @param {Experience} param0.experience - The experience data to display.
 * @param {boolean} param0.isLast - Whether this is the last entry in the timeline.
 * @returns {React.ReactNode} The rendered ExperienceEntry component.
 */
const ExperienceEntry = ({
  experience,
  isLast = false,
}: ExperienceEntryProps): React.ReactNode => {
  const { company, role, startDate, endDate, stacks, accomplishments } =
    experience;
  const { start, durationText } = calculateDuration(startDate, endDate);

  return (
    <TimelineCard
      logo={company.logo}
      logoAlt={company.name}
      fallbackIcon={<BriefcaseIcon className="size-5" />}
      url={company.url}
      isLast={isLast}
    >
      {/* Header content */}
      <div className="flex flex-col gap-1">
        <h2 className="font-cal text-foreground m-0 text-lg font-semibold">
          {role}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={company.url}
            target="_blank"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {company.name}
          </Link>
          <Badge variant="secondary" className="text-xs">
            {company.jobType}
          </Badge>
        </div>
      </div>

      {/* Meta information */}
      <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" />
          <span>{formatDateRange(start, endDate)}</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="text-primary/80 font-medium">{durationText}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPinIcon className="size-3.5" />
          <span>{company.location}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{company.workingArrangement}</span>
        </div>
      </div>

      {/* Tech stack */}
      {stacks.length > 0 && (
        <div className="mt-4 flex flex-row flex-wrap gap-1.5">
          {stacks.map(({ name, icon }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <div className="hover:bg-secondary border-border/30 flex items-center justify-center rounded-lg border p-2 transition-colors">
                  {icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>{name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}

      {/* Accomplishments */}
      {accomplishments.length > 0 && (
        <ul className="mt-4 space-y-2 pl-0">
          {accomplishments.map((accomplishment, index) => (
            <li
              key={index}
              className="text-muted-foreground before:bg-primary/50 relative pl-4 text-sm leading-relaxed before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-full"
            >
              {accomplishment}
            </li>
          ))}
        </ul>
      )}
    </TimelineCard>
  );
};

export default ExperienceEntry;
