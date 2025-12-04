'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { CommandPaletteProvider } from '../command-palette/command-palette';
import { TooltipProvider } from '../ui/tooltip';

/**
 * AppProvider component to wrap the application with necessary providers.
 * This includes ThemeProvider, SessionProvider, CommandPaletteProvider, and TooltipProvider.
 *
 * @param {{ children: React.ReactNode }} param0
 * @param {React.ReactNode} param0.children
 * @returns {*}
 */
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <CommandPaletteProvider>
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </CommandPaletteProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
