'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

import EmptyState from '@/components/common/empty-state';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

import { MAX_HIGHLIGHTED_PROJECTS_DISPLAY } from '../constants';
import ProjectCard from './project-card';
import type { Project } from '.content-collections/generated';
import allProjects from '.content-collections/generated/allProjects';

const getHighlightedProjects = (
  maxDisplay: number = MAX_HIGHLIGHTED_PROJECTS_DISPLAY,
): Array<Project> =>
  allProjects
    .filter((project) => project.published && project.highlight)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxDisplay);

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const HighlightedProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const projects = useMemo(() => getHighlightedProjects(), []);
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      id="highlighted-projects"
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{ duration: 0.5 }}
      className="will-change-[transform,opacity]"
    >
      <motion.div
        className="mb-4 flex flex-col"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-cal text-primary m-0 text-4xl tracking-wide md:text-5xl">
          Highlighted Projects
        </h2>
        <p className="font-cal text-secondary-foreground my-2 text-lg">
          A selection of projects that I've worked on.
        </p>
      </motion.div>

      {projects.length ? (
        <>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid auto-cols-fr grid-cols-1 gap-4"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                className={index % 2 === 0 ? 'flex-row-reverse' : ''}
              />
            ))}
          </motion.div>
          <div className="my-8 flex items-center justify-center">
            <Button asChild variant="outline" size="xl">
              <Link href={ROUTES.projects}>
                See all projects <ChevronRightIcon />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </motion.div>
  );
};

export default HighlightedProjects;
