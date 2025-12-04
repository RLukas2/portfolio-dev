/** @file experiences.tsx
 *
 * This file contains a list of professional experiences, each represented as an object
 * with properties such as company, role, startDate, endDate, stacks, and accomplishments.
 *
 * Each experience object adheres to the Experience interface defined in src/features/resume/types.ts.
 * - company: The name and details of the company or organization.
 * - role: The job title or position held.
 * - startDate: The date when the experience began, formatted as 'YYYY-MM'.
 * - endDate: The date when the experience ended, formatted as 'YYYY-MM' or null for present.
 * - stacks: A list of technologies and tools used during the experience.
 * - accomplishments: A list of notable achievements or contributions made during the experience.
 *
 */

import type { Experience } from '../types';

export const EXPERIENCES: Experience[] = [
  // {
  //   company: {
  //     name: 'Sample Corp',
  //     logo: '/media/resume/samplecorp.jpg',
  //     url: 'https://samplecorp.com',
  //     location: 'Sample City',
  //     workingArrangement: 'Remote',
  //     jobType: 'Full-time',
  //   },
  //   role: 'Software Engineer',
  //   startDate: '2025-12',
  //   endDate: null, // Present
  //   stacks: [
  //     {
  //       name: 'TypeScript',
  //       icon: <TypeScript className="size-5 fill-[#3178C6]" />,
  //     },
  //     {
  //       name: 'React.js',
  //       icon: <ReactJS className="size-5 fill-[#61DAFB]" />,
  //     },
  //   ],
  //   accomplishments: [
  //     'Developed and maintained web applications using React and TypeScript.',
  //     'Collaborated with cross-functional teams to define, design, and ship new features.',
  //   ],
  // },
];
