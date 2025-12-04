'use client';

import { motion } from 'framer-motion';

import EmptyState from '@/components/common/empty-state';
import { cn } from '@/lib/utils';

import { SKILLS } from '../constants/skills';

const PROFICIENCY_LABELS = {
  1: 'Beginner',
  2: 'Elementary',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
} as const;

const SkillsSection = () => {
  // Safety check
  if (typeof SKILLS === 'undefined' || !SKILLS || SKILLS.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-cal text-3xl font-bold">Technical Skills</h2>
          <p className="text-muted-foreground mt-2">
            My proficiency across different technologies and tools
          </p>
        </div>
        <EmptyState message="The skills I had gathered could be any where... Come back sometimes soon!" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-cal text-3xl font-bold">Technical Skills</h2>
        <p className="text-muted-foreground mt-2">
          My proficiency across different technologies and tools
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {SKILLS.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-card rounded-xl border p-6"
          >
            <h3 className="mb-4 text-xl font-semibold">{category.category}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skill.icon && (
                        <div className="flex size-6 items-center justify-center">
                          {skill.icon}
                        </div>
                      )}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {PROFICIENCY_LABELS[skill.level]}
                    </span>
                  </div>
                  <div className="bg-muted relative h-2 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.level / 5) * 100}%` }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      className={cn(
                        'h-full rounded-full',
                        skill.level === 5 && 'bg-green-500',
                        skill.level === 4 && 'bg-blue-500',
                        skill.level === 3 && 'bg-yellow-500',
                        skill.level === 2 && 'bg-orange-500',
                        skill.level === 1 && 'bg-red-500',
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
