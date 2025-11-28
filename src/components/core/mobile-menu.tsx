'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { usePathname } from 'next/navigation';

import { MenuKebab } from '@/components/common/icons';
import Link from '@/components/common/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';

/**
 * Mobile Menu Component
 * This component renders a mobile dropdown menu for navigation links.
 * Currently not in use, being replaced by the Command Palette.
 *
 * @returns {React.ReactNode} The rendered Mobile Menu component.
 */
const MobileMenu = (): React.ReactNode => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('flex', 'md:hidden')}>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuKebab />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-56')}>
        {NAV_LINKS.map(({ path, label, icon }) => (
          <DropdownMenuItem
            key={path}
            className={cn(
              'text-muted-foreground rounded px-2 py-1.5 text-sm font-semibold transition-colors duration-150',
              'hover:bg-accent hover:text-accent-foreground',
              '[&:not(:last-child)]:mb-0.5',
              {
                'bg-accent text-accent-foreground': pathname === path,
              },
            )}
          >
            <Link href={path} className={cn('flex items-center gap-2')}>
              {icon}
              <span>{label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
