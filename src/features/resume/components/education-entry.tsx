import {
  BookOpenIcon,
  CalendarIcon,
  GraduationCapIcon,
  MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

import type { Education } from '../types';
import TimelineCard from './shared/timeline-card';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface EducationEntryProps {
  education: Education;
  isLast?: boolean;
}

/**
 * Education component
 * Displays information about a single educational entry.
 *
 * @param {EducationEntryProps} param0 - Props for the EducationEntry component.
 * @param {Education} param0.education - The education data to display.
 * @param {boolean} param0.isLast - Whether this is the last entry in the timeline.
 * @returns {React.ReactNode} The rendered EducationEntry component.
 */
const EducationEntry = ({
  education,
  isLast = false,
}: EducationEntryProps): React.ReactNode => {
  const {
    institution,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    accomplishments,
  } = education;
  const { start } = calculateDuration(startDate, endDate);

  return (
    <TimelineCard
      logo={institution.logo}
      logoAlt={institution.name}
      fallbackIcon={<GraduationCapIcon className="size-5" />}
      url={institution.url}
      isLast={isLast}
    >
      {/* Header content */}
      <div className="flex flex-col gap-1">
        <h2 className="font-cal text-foreground m-0 text-lg font-semibold">
          {institution.url ? (
            <Link
              href={institution.url}
              target="_blank"
              className="text-foreground hover:text-primary transition-colors"
            >
              {institution.name}
            </Link>
          ) : (
            institution.name
          )}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground font-medium">{degree}</span>
          <Badge variant="outline" className="text-xs">
            <BookOpenIcon className="mr-1 size-3" />
            {fieldOfStudy}
          </Badge>
        </div>
      </div>

      {/* Meta information */}
      <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" />
          <span>{formatDateRange(start, endDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPinIcon className="size-3.5" />
          <span>{institution.location}</span>
        </div>
      </div>

      {/* Accomplishments */}
      {accomplishments && accomplishments.length > 0 && (
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

export default EducationEntry;
