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

import { SiCelery, SiDjango, SiNginx } from 'react-icons/si';

import { Python } from '@/components/common/icons';

import type { Experience } from '../types';

export const EXPERIENCES: Experience[] = [
  {
    company: {
      name: 'Le Hong Phong Online Judge',
      logo: '/media/resume/lhpoj.png',
      url: 'https://lhpoj.io.vn',
      location: 'Ho Chi Minh City, Vietnam',
      workingArrangement: 'Remote',
      jobType: 'Freelance',
    },
    role: 'Full-Stack Developer',
    startDate: '2020-09',
    endDate: null, // Present
    stacks: [
      {
        name: 'Python',
        icon: <Python className="size-5 fill-[#3776AB]" />,
      },
      {
        name: 'Django',
        icon: <SiDjango className="size-5 fill-[#092E20]" />,
      },
      {
        name: 'Celery',
        icon: <SiCelery className="size-5 fill-[#376E02]" />,
      },
      {
        name: 'Nginx',
        icon: <SiNginx className="size-5 fill-[#009639]" />,
      },
    ],
    accomplishments: [
      'Co-developed and maintained an online judge platform forked from DMOJ/VNOJ, serving over 1,000 active users.',
      'Optimized judging pipeline to reliably handle 1,000+ submissions per minute during contests.',
      'Managed production deployment using Docker, Nginx, and CI/CD workflows.',
    ],
  },

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
