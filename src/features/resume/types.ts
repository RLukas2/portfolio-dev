import type { JSX } from 'react';

export interface Company {
  name: string;
  logo: string;
  url: string;
  location: string;
  workingArrangement: 'Remote' | 'Hybrid' | 'On-Site';
  jobType: 'Full-time' | 'Freelance';
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  location: string;
}

export interface Stack {
  name: string;
  icon?: JSX.Element;
}

export interface Experience {
  company: Company;
  role: string;
  startDate: string;
  endDate: string | null;
  stacks: Stack[];
  accomplishments: string[];
}

// Timeline entry types with discriminants
export type ExperienceEntry = Experience & { type: 'experience' };
export type EducationEntry = Education & { type: 'education' };

// Union type for timeline entries
export type TimelineEntry = ExperienceEntry | EducationEntry;
