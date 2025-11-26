import type { Education } from '../types';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface EducationEntryProps {
  education: Education;
}

const EducationEntry = ({ education }: EducationEntryProps) => {
  const { institution, degree, fieldOfStudy, startDate, endDate, location } =
    education;
  const { start } = calculateDuration(startDate, endDate);

  return (
    <li
      key={`${institution}-${degree}-${startDate}`}
      className="relative mt-8 h-full"
    >
      <div className="absolute bottom-0 -left-[60px] mt-0 h-full">
        <div className="sticky top-20 flex items-start">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-semibold">
            📚
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 md:flex-row">
        <div className="flex flex-col space-y-1 leading-snug">
          <h2 className="font-cal my-0 text-lg">{institution}</h2>
          <div className="text-muted-foreground flex items-center gap-1">
            <span className="text-muted-foreground hover:text-foreground">
              {degree}
            </span>
            <span>&middot;</span>
            <span>{fieldOfStudy}</span>
          </div>{' '}
          <div className="text-muted-foreground flex gap-1">
            <div className="flex gap-1">
              <span>{formatDateRange(start, endDate)}</span>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <span>{location}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EducationEntry;
