/** @file certifications.tsx
 *
 * This file contains a list of certifications earned, each represented as an object
 * with properties such as name, issuer, issueDate, expiryDate, and credentialId.
 *
 * Each certification object adheres to the Certification interface defined in src/features/resume/types.ts.
 * - name: The name of the certification.
 * - issuer: The organization or entity that issued the certification.
 * - issueDate: The date when the certification was issued, formatted as 'YYYY-MM'.
 * - expiryDate: The date when the certification expires, formatted as 'YYYY-MM'.
 * - credentialId: The unique identifier for the certification.
 * - credentialUrl: The URL for verifying the certification.
 * - logo: The logo or emblem representing the certification.
 *
 */

import type { Certification } from '../types';

export const CERTIFICATIONS: Certification[] = [
  // {
  //   name: 'AWS Certified Solutions Architect',
  //   issuer: 'Amazon Web Services',
  //   issueDate: '2024-06',
  //   expiryDate: '2027-06',
  //   credentialId: 'AWS-CSA-2024-XXXXX',
  //   credentialUrl: 'https://aws.amazon.com/verification',
  //   logo: '/media/resume/aws.png',
  // },
  // Add more certifications here
];
