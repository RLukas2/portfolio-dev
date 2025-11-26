'use client';

import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { JavaScript, NextJS, PostgreSQL, TypeScript } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Stack {
  title: string;
  className: string;
  icon: JSX.Element;
}

const animation = {
  hide: { x: -8, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
};

const stacks: Stack[] = [
  {
    title: 'TypeScript',
    className: 'hover:text-[#3178C6]',
    icon: <TypeScript />,
  },
  {
    title: 'JavaScript',
    className: 'hover:text-[#F7DF1E]',
    icon: <JavaScript />,
  },
  {
    title: 'Next.js',
    className: 'hover:text-black dark:hover:text-white',
    icon: <NextJS />,
  },
  {
    title: 'PostgreSQL',
    className: 'hover:text-[#4169E1]',
    icon: <PostgreSQL />,
  },
];

const CurrentTechStacks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3 lg:justify-start"
      role="list"
      aria-label="Technologies I work with"
    >
      {stacks.map(({ title, className, icon }) => (
        <Tooltip key={title}>
          <TooltipTrigger asChild>
            <motion.div
              className={cn(
                'text-muted-foreground size-5 rounded-md transition-transform duration-200 hover:scale-110 md:size-6',
                className,
              )}
              variants={animation}
            >
              {icon}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      ))}
    </motion.div>
  );
};

CurrentTechStacks.displayName = 'CurrentTechStacks';

export default CurrentTechStacks;
