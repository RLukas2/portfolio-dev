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
import {
  TimelineEntryAccomplishments,
  TimelineEntryMetaItem,
} from './shared/timeline-entry';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface EducationEntryProps {
  education: Education;
  isLast?: boolean;
}

/**
 * Education component - displays a single educational entry
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

      <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <TimelineEntryMetaItem icon={<CalendarIcon className="size-3.5" />}>
          <span>{formatDateRange(start, endDate)}</span>
        </TimelineEntryMetaItem>
        <TimelineEntryMetaItem icon={<MapPinIcon className="size-3.5" />}>
          <span>{institution.location}</span>
        </TimelineEntryMetaItem>
      </div>

      <TimelineEntryAccomplishments accomplishments={accomplishments || []} />
    </TimelineCard>
  );
};

export default EducationEntry;
