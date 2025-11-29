'use client';

import { createContext, useContext, useMemo } from 'react';

import type { Short } from '.content-collections/generated';

export const ShortContext = createContext<Short | null>(null);

export const useShortContext = () => {
  const context = useContext(ShortContext);

  if (!context) {
    throw new Error('useShortContext must be used within a ShortProvider');
  }

  return context;
};

export const ShortProvider = ({
  children,
  short,
}: {
  children: React.ReactNode;
  short: Short;
}) => {
  const value = useMemo(() => short, [short]);

  return (
    <ShortContext.Provider value={value}>{children}</ShortContext.Provider>
  );
};
