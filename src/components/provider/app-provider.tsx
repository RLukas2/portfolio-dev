'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

import { CommandPaletteProvider } from '../command-palette/command-palette';

/**
 * AppProvider component to wrap the application with necessary providers.
 * This includes ThemeProvider, SessionProvider, CommandPaletteProvider, and TooltipProvider.
 *
 * @param {{ children: React.ReactNode }} param0
 * @param {React.ReactNode} param0.children
 * @returns {*}
 */
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const isMounted = useMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <CommandPaletteProvider>{children}</CommandPaletteProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
