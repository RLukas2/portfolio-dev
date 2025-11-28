'use client';

import { createContext, useContext, useMemo } from 'react';

import type { Project } from '.content-collections/generated';

export const ProjectContext = createContext<Project | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }

  return context;
};

export const ProjectProvider = ({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) => {
  const value = useMemo(() => project, [project]);
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
