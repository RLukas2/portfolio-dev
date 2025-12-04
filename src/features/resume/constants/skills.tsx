/** @file skills.tsx
 *
 * This file contains a list of technical skills, each represented as an object
 * with properties such as name, level, and icon.
 *
 * Each skill object adheres to the Skill interface defined in src/features/resume/types.ts.
 * - name: The name of the skill.
 * - level: The proficiency level of the skill, typically on a scale from 1 to 5.
 * - icon: An optional icon representing the skill.
 *
 */

import {
  CSharp,
  Docker,
  ExpressJS,
  Git,
  GoLang,
  JavaScript,
  MongoDB,
  NextJS,
  NodeJS,
  PostgreSQL,
  Postman,
  Python,
  ReactJS,
  Redis,
  TypeScript,
} from '@/components/common/icons';

import type { SkillCategory } from '../types';

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      {
        name: 'TypeScript',
        level: 5,
        icon: <TypeScript className="size-5 fill-[#3178C6]" />,
      },
      {
        name: 'JavaScript',
        level: 5,
        icon: <JavaScript className="size-5 fill-[#F7DF1E]" />,
      },
      {
        name: 'React',
        level: 5,
        icon: <ReactJS className="size-5 fill-[#61DAFB]" />,
      },
      {
        name: 'Next.js',
        level: 5,
        icon: <NextJS className="size-5" />,
      },
    ],
  },
  {
    category: 'Backend',
    skills: [
      {
        name: 'Golang',
        level: 4,
        icon: <GoLang className="size-5 fill-[#00ADD8]" />,
      },
      {
        name: 'Python',
        level: 4,
        icon: <Python className="size-5 fill-[#3776AB]" />,
      },
      {
        name: 'Node.js',
        level: 5,
        icon: <NodeJS className="size-5 fill-[#339933]" />,
      },
      {
        name: 'Express.js',
        level: 5,
        icon: <ExpressJS className="size-5" />,
      },
      {
        name: 'C#',
        level: 3,
        icon: <CSharp className="size-5 fill-[#239120]" />,
      },
    ],
  },
  {
    category: 'Database',
    skills: [
      {
        name: 'PostgreSQL',
        level: 4,
        icon: <PostgreSQL className="size-5 fill-[#4169E1]" />,
      },
      {
        name: 'MongoDB',
        level: 4,
        icon: <MongoDB className="size-5 fill-[#47A248]" />,
      },
      {
        name: 'Redis',
        level: 3,
        icon: <Redis className="size-5 fill-[#DC382D]" />,
      },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      {
        name: 'Docker',
        level: 4,
        icon: <Docker className="size-5 fill-[#2496ED]" />,
      },
      {
        name: 'Git',
        level: 5,
        icon: <Git className="size-5 fill-[#F05032]" />,
      },
      {
        name: 'Postman',
        level: 4,
        icon: <Postman className="size-5 fill-[#FF6C37]" />,
      },
    ],
  },
];
