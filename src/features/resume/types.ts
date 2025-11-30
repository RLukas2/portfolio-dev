import type { JSX } from 'react';

export interface Company {
  name: string;
  logo: string;
  url: string;
  location: string;
  workingArrangement: 'Remote' | 'Hybrid' | 'On-Site';
  jobType: 'Full-time' | 'Freelance';
}

export interface Institution {
  name: string;
  logo?: string; // Optional - falls back to book icon
  url?: string; // Optional - link to institution website
  location: string;
}

export interface Education {
  institution: Institution;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  accomplishments?: string[]; // Optional - coursework, achievements, projects, etc.
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
