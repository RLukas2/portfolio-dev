import Image from 'next/image';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { Experience } from '../types';
import { calculateDuration, formatDateRange } from './shared/timeline-utils';

interface ExperienceEntryProps {
  experience: Experience;
}

const ExperienceEntry = ({ experience }: ExperienceEntryProps) => {
  const { company, role, startDate, endDate, stacks, accomplishments } =
    experience;
  const { start, durationText } = calculateDuration(startDate, endDate);

  return (
    <li
      key={`${company.name}-${role}-${startDate}`}
      className="relative mt-8 h-full"
    >
      <div className="absolute bottom-0 -left-[60px] mt-0 h-full">
        <div className="sticky top-20 flex items-start">
          <Image
            src={company.logo}
            alt={company.name}
            width={40}
            height={40}
            className="ml-0 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 md:flex-row">
        <div className="flex flex-col space-y-1 leading-snug">
          <h2 className="font-cal my-0 text-lg">{role}</h2>
          <div className="text-muted-foreground flex items-center gap-1">
            <Link
              href={company.url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground underline"
            >
              {company.name}
            </Link>
            <span>&middot;</span>
            <span>{company.jobType}</span>
          </div>{' '}
          <div className="text-muted-foreground flex gap-1">
            <div className="flex gap-1">
              <span>{formatDateRange(start, endDate)}</span>
            </div>
            <span>&middot;</span>
            <span>{durationText}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <span>{company.location}</span>
            <span>&middot;</span>
            <span>{company.workingArrangement}</span>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-row flex-wrap gap-1">
        {stacks.map(({ name, icon }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <div className="bg-card rounded-lg p-1.5">{icon}</div>
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <ul className="pl-0">
        {accomplishments.map((accomplishment, index) => (
          <li key={index} className="my-1 leading-snug">
            <span className="text-muted-foreground">{accomplishment}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ExperienceEntry;
