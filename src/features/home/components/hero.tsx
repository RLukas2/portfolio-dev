'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import ProfileImage from './profile-image';
import CurrentTechStacks from './tech-stack';

const Hero = () => {
  return (
    <motion.div
      className={cn(
        'layout min-h-screen py-8 text-center md:mt-16 md:py-16 lg:py-32',
      )}
      id="hero"
      aria-label="Hero section"
    >
      <div
        className={cn('flex w-full flex-col items-center gap-10 md:flex-row')}
      >
        <motion.div
          className={cn(
            'mt-12 flex flex-col items-center space-y-6 text-center md:mb-0 md:w-1/2 md:items-start md:text-left',
          )}
          viewport={{ once: true }}
        >
          {/* Text Content */}
          <motion.div
            className="mb-0 text-xl font-medium tracking-wide text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Hello, I&apos;m
          </motion.div>

          <motion.h1
            className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Ngô Hoàng Tuấn
          </motion.h1>

          <motion.h2
            className={cn(
              'text-xl font-semibold tracking-tight md:text-2xl lg:text-3xl',
              'text-blue-600 dark:text-blue-400',
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Aspiring Backend Developer
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-xl text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            I&apos;m a forth-year Computer Science student at HCMUS with
            practical experience in building backend systems through academic
            and personal projects.
          </motion.p>

          <CurrentTechStacks />

          <motion.div
            className="relative flex justify-center gap-4 lg:justify-start"
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild variant="shadow" className="group">
              <Link href={'/#highlighted-projects'}>
                Learn How{' '}
                <ChevronDownIcon className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="group">
              <Link href={'/about'}>More About Me</Link>
            </Button>
          </motion.div>
        </motion.div>

        <ProfileImage />
      </div>
    </motion.div>
  );
};

export default Hero;
