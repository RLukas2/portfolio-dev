import { ReactJS, TypeScript } from '@/components/icons';

import type { Experience } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: {
      name: 'Sample Corp',
      logo: '/media/resume/samplecorp.jpg',
      url: 'https://samplecorp.com',
      location: 'Sample City',
      workingArrangement: 'Remote',
      jobType: 'Full-time',
    },
    role: 'Software Engineer',
    startDate: '2025-12',
    endDate: null, // Present
    stacks: [
      {
        name: 'TypeScript',
        icon: <TypeScript className="size-5 fill-[#3178C6]" />,
      },
      {
        name: 'React.js',
        icon: <ReactJS className="size-5 fill-[#61DAFB]" />,
      },
    ],
    accomplishments: [
      'Developed and maintained web applications using React and TypeScript.',
      'Collaborated with cross-functional teams to define, design, and ship new features.',
    ],
  },
];
