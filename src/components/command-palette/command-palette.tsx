'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, Fragment, useContext, useMemo, useState } from 'react';

import { useCommandGroups } from '@/components/command-palette/hooks/use-command-groups';
import { useCommandPalette } from '@/components/command-palette/hooks/use-command-palette';
import { useContentSearch } from '@/components/command-palette/hooks/use-content-search';
import { useRotatingPlaceholder } from '@/components/command-palette/hooks/use-rotating-placeholder';
import { cn } from '@/lib/utils';

import { Command as CommandIcon } from '../common/icons';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';

const PLACEHOLDERS = [
  'Type a command or search',
  'Press Cmd + K anytime to access this command pallete',
  'Use arrow keys to navigate',
  'Press Enter to select an option',
];

interface CommandPaletteContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandPaletteContext = createContext<CommandPaletteContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useCommandPaletteContext = () => {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(
      'useCommandPaletteContext must be used within a CommandPaletteProvider',
    );
  }

  return context;
};

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

/**
 * CommandPalette Component
 * This component renders a command palette that allows users to navigate
 * through pages, social media links, and switch appearance modes.
 *
 * @returns {React.ReactNode} The rendered CommandPalette component.
 */
export const CommandPalette = (): React.ReactNode => {
  const { isOpen, setIsOpen } = useCommandPaletteContext();
  const [searchQuery, setSearchQuery] = useState('');

  const placeholder = useRotatingPlaceholder(PLACEHOLDERS);
  const { isActiveRoute, handleOnSelect } = useCommandPalette(
    isOpen,
    setIsOpen,
  );
  const { filteredPosts, filteredProjects, filteredShorts } =
    useContentSearch(searchQuery);
  const groups = useCommandGroups(
    searchQuery,
    filteredPosts,
    filteredProjects,
    filteredShorts,
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open command menu"
      >
        <span className="sr-only">Open command menu</span>
        <CommandIcon className="size-5" />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder={placeholder}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map(({ title, options }, index) => (
            <Fragment key={title}>
              <CommandGroup heading={title}>
                {options.map((option) => (
                  <CommandItem
                    key={option.label}
                    className={cn(
                      'group flex cursor-pointer items-center justify-between not-last:mb-0.5',
                      {
                        'bg-accent':
                          option.type === 'PAGE' && isActiveRoute(option.href),
                      },
                    )}
                    onSelect={() => handleOnSelect(option)}
                  >
                    <div className={cn('flex flex-col gap-1')}>
                      <div className={cn('flex items-center gap-2')}>
                        <div
                          className={cn(
                            'transition-transform duration-200 group-hover:-rotate-12',
                          )}
                        >
                          {option.icon}
                        </div>
                        <span>{option.label}</span>
                      </div>
                      {'description' in option && option.description && (
                        <span className="text-muted-foreground text-xs">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {option.type === 'PAGE' && isActiveRoute(option.href) && (
                      <Badge variant="secondary">You are here</Badge>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {index === groups.length - 1 ? null : <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
