'use client';

import { motion } from 'framer-motion';
import {
  AwardIcon,
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { AWARDS } from '../constants/awards';
import { CERTIFICATIONS } from '../constants/certifications';
import { EXPERIENCES } from '../constants/experiences';
import { SKILLS } from '../constants/skills';

// Helper function to calculate years of experience
function calculateYearsOfExperience(): string {
  if (EXPERIENCES.length === 0) return '0';

  const sortedExperiences = [...EXPERIENCES].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const firstJob = sortedExperiences[0];
  if (!firstJob) return '0';

  const startDate = new Date(firstJob.startDate);
  const today = new Date();

  const years = today.getFullYear() - startDate.getFullYear();
  const months = today.getMonth() - startDate.getMonth();

  if (years === 0) {
    return `${months} mo`;
  }

  if (months < 0) {
    return years - 1 === 0 ? '< 1 year' : `${years - 1}+ year`;
  }

  return `${years}+ year`;
}

const stats = [
  {
    label: 'Experience',
    value: EXPERIENCES.length > 0 ? calculateYearsOfExperience() : '0',
    icon: BriefcaseIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Skills',
    value: SKILLS.reduce((acc, cat) => acc + cat.skills.length, 0),
    icon: CodeIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    label: 'Certs',
    value: CERTIFICATIONS.length,
    icon: AwardIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Awards',
    value: AWARDS.length,
    icon: GraduationCapIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

interface ResumeStatsProps {
  className?: string;
}

const ResumeStats = ({ className }: ResumeStatsProps) => {
  return (
    <div className={cn('grid grid-cols-2 gap-4 lg:grid-cols-4', className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-xl border px-2 py-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className={`${stat.bgColor} rounded-lg p-3`}>
              <stat.icon className={`size-6 ${stat.color}`} />
            </div>
            <div>
              <p className="font-cal m-0 text-2xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground m-0 text-sm">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeStats;
