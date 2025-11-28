'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { COMMAND_PAGES, COMMAND_SOCIAL_MEDIA } from '@/constants/links';
import { cn } from '@/lib/utils';
import type { CommandMenuItem } from '@/types/menu';

import { Command as CommandIcon, Moon, Sun } from './common/icons';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';

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

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

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
  const pathname = usePathname();
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { resolvedTheme: theme, setTheme } = useTheme();

  const placeholders = [
    'Type a command or search',
    'Press Cmd + K anytime to access this command pallete',
    'Use arrow keys to navigate',
    'Press Enter to select an option',
  ];

  const placeholder = placeholders[placeholderIndex];

  const isActiveRoute = (path: string) => pathname === path;

  const handleOnSelect = (action: CommandMenuItem) => {
    if (action.closeOnSelect) setIsOpen(false);

    if (action.onClick) {
      action.onClick();
      return;
    }

    if (action.isExternal) {
      window.open(action.href, '_blank');
    } else {
      router.push(action.href);
    }
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [setIsOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlaceholderIndex((prev) =>
        ((next) => (next + 1) % placeholders.length)(prev),
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [placeholderIndex, placeholders.length]);

  const groups: Array<{ title: string; options: CommandMenuItem[] }> = [
    {
      title: 'Pages',
      options: COMMAND_PAGES,
    },
    {
      title: 'Social',
      options: COMMAND_SOCIAL_MEDIA,
    },
    {
      title: 'Appearance',
      options: [
        {
          label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
          href: '#',
          icon: theme === 'dark' ? <Moon /> : <Sun />,
          isExternal: false,
          eventName: `Appearance: Switch ${theme === 'dark' ? 'Light' : 'Dark'}`,
          type: 'APPEARANCE',
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
      ],
    },
  ];

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
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map(({ title, options }, index) => (
            <Fragment key={title}>
              <CommandGroup heading={title}>
                {options.map((option) => (
                  <CommandItem
                    key={option.label}
                    className={cn(
                      'group flex cursor-pointer items-center justify-between [&:not(:last-child)]:mb-0.5',
                      {
                        'bg-accent':
                          option.type === 'PAGE' && isActiveRoute(option.href),
                      },
                    )}
                    onSelect={() => handleOnSelect(option)}
                  >
                    <div className={cn('flex items-center gap-2')}>
                      <div
                        className={cn(
                          'transition-transform duration-200 group-hover:-rotate-12',
                        )}
                      >
                        {option.icon}
                      </div>
                      {option.label}
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
