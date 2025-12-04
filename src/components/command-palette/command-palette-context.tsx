'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface CommandPaletteContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * CommandPaletteContext
 * Context for managing the state of the command palette.
 *
 * @type {*}
 */
export const CommandPaletteContext = createContext<CommandPaletteContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

/**
 * useCommandPaletteContext
 * Custom hook to access the CommandPaletteContext.
 *
 * @returns {*}
 */
export const useCommandPaletteContext = () => {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(
      'useCommandPaletteContext must be used within a CommandPaletteProvider',
    );
  }

  return context;
};

/**
 * CommandPaletteProvider
 * Provides the command palette context to its children.
 *
 * @param {{
 *   children: React.ReactNode;
 * }} param0
 * @param {React.ReactNode} param0.children
 * @returns {*}
 */
export const CommandPaletteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
};
