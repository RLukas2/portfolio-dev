/** @file awards.tsx
 *
 * This file contains a list of awards received, each represented as an object
 * with properties such as title, issuer, date, description, and icon.
 *
 * Each award object adheres to the Award interface defined in src/features/resume/types.ts.
 * - title: The name of the award.
 * - issuer: The organization or entity that granted the award.
 * - date: The date when the award was received, formatted as 'YYYY-MM'.
 * - description: A brief description of the award and its significance.
 * - icon: An optional emoji or icon representing the award.
 *
 */

import type { Award } from '../types';

export const AWARDS: Award[] = [
  {
    title: 'Consolation Prize',
    issuer: 'Vietnam National Olympiad in Informatics',
    date: '2022-03',
    description:
      'Awarded for outstanding performance in the national programming competition',
    icon: '🏆',
  },
  {
    title: 'ICPC Vietnam National Contest - Rank 25/358',
    issuer: 'ICPC Vietnam',
    date: '2021-11',
    description:
      'Ranked 25th out of 358 teams in the high school division of the national programming contest',
    icon: '🥈',
  },
  {
    title: 'ICPC Vietnam National Contest - Rank 133/415',
    issuer: 'ICPC Vietnam',
    date: '2023-11',
    description:
      'Ranked 133rd out of 415 teams in the university division of the national programming contest',
    icon: '🎖️',
  },
  // Add more awards here
];
