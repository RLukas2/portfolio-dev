import type { Education } from './types';

export const EDUCATION: Education[] = [
  {
    institution: {
      name: 'University of Science - VNUHCM',
      logo: '/media/resume/vnuhcm.png', // Optional - add your logo here
      url: 'https://hcmus.edu.vn',
      location: 'Ho Chi Minh City, Vietnam',
    },
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science',
    startDate: '2022-09',
    endDate: '2026-08',
    accomplishments: [
      'GPA: 9.25/10',
      'Relevant coursework: Data Structures, Algorithms, Database Systems',
      'Rank 133 out of 415 in The 2023 ICPC Vietnam National Programming Contest',
    ],
  },
  {
    institution: {
      name: 'Le Hong Phong High School for the Gifted',
      logo: '/media/resume/lhp.png', // Optional - add your logo here
      url: 'http://www.thpt-lehongphong-tphcm.edu.vn/', // Optional - add institution URL
      location: 'Ho Chi Minh City, Vietnam',
    },
    degree: 'High School Diploma',
    fieldOfStudy: 'Computer Science (CTIN)',
    startDate: '2019-09',
    endDate: '2022-05',
    accomplishments: [
      'Consolation Prize in The Vietnam National Olympiad in Informatics 2022',
      'Rank 25 out of 358 in The 2021 ICPC Vietnam National Programming Contest - High School Division',
    ],
  },
];
