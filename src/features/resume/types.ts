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

// Certification type
export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

// Award type
export interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  icon?: string;
}

// Skill types
export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
  icon?: JSX.Element;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}
