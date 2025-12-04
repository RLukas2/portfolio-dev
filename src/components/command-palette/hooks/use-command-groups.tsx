import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { Moon, Sun } from '@/components/common/icons';
import { COMMAND_PAGES, COMMAND_SOCIAL_MEDIA } from '@/constants/links';
import type { CommandMenuItem } from '@/types/menu';

interface CommandGroup {
  title: string;
  options: CommandMenuItem[];
}

export const useCommandGroups = (
  searchQuery: string,
  filteredPosts: CommandMenuItem[],
  filteredProjects: CommandMenuItem[],
  filteredShorts: CommandMenuItem[],
): CommandGroup[] => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return useMemo(() => {
    const baseGroups: CommandGroup[] = [
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
            type: 'APPEARANCE' as const,
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          },
        ],
      },
    ];

    if (!searchQuery) return baseGroups;

    const contentGroups: CommandGroup[] = [
      { title: 'Blog Posts', options: filteredPosts },
      { title: 'Projects', options: filteredProjects },
      { title: 'Shorts', options: filteredShorts },
    ].filter((group) => group.options.length > 0);

    return [...baseGroups, ...contentGroups];
  }, [
    theme,
    setTheme,
    searchQuery,
    filteredPosts,
    filteredProjects,
    filteredShorts,
  ]);
};
