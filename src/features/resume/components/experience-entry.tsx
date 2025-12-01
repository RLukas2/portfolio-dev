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
import {
  TimelineEntryAccomplishments,
  TimelineEntryMetaItem,
} from './shared/timeline-entry';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface ExperienceEntryProps {
  experience: Experience;
  isLast?: boolean;
}

/**
 * Experience component - displays a single work experience entry
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

      <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <TimelineEntryMetaItem icon={<CalendarIcon className="size-3.5" />}>
          <span>{formatDateRange(start, endDate)}</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="text-primary/80 font-medium">{durationText}</span>
        </TimelineEntryMetaItem>
        <TimelineEntryMetaItem icon={<MapPinIcon className="size-3.5" />}>
          <span>{company.location}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{company.workingArrangement}</span>
        </TimelineEntryMetaItem>
      </div>

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

      <TimelineEntryAccomplishments accomplishments={accomplishments} />
    </TimelineCard>
  );
};

export default ExperienceEntry;
