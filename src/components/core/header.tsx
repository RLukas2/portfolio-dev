'use client';

import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/constants/links';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

import { CommandPalette } from '../command-palette';
import Link from '../common/link';
import ThemeSwitch from '../theme-switch';
import { Separator } from '../ui/separator';
import Container from './container';

/**
 * Header Component
 * This component renders the header section of the website, including the logo, navigation links, and utility items.
 *
 * @returns {React.ReactNode} - The rendered Header component.
 */
const Header = (): React.ReactNode => {
  const isScrolled = useScroll();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'bg-background sticky top-0 z-50 flex h-16 transition-colors duration-200 print:hidden',
        isScrolled ? 'shadow-sm' : 'saturate-110',
      )}
    >
      <Container>
        <div className={cn('flex h-full flex-1 items-center justify-between')}>
          <div className={cn('flex items-center gap-4')}>
            {/* Logo */}
            <Link
              href="/"
              className={cn('flex items-center justify-center gap-2')}
            >
              <span
                className={cn('flex text-xl font-extrabold tracking-tight')}
              >
                xbrk
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className={cn('hidden', 'md:flex')}>
              <ul className={cn('flex', 'md:gap-x-0.5')}>
                {NAV_LINKS.filter(
                  ({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu,
                ).map(({ path, label }) => {
                  const isActive =
                    pathname === path || pathname.startsWith(path);

                  return (
                    <li key={path} className={cn('relative')}>
                      <Link
                        href={path}
                        className={cn(
                          'hover:text-foreground flex items-center rounded px-3 py-1.5 text-base font-medium transition-colors duration-200',
                          isActive
                            ? 'font-bold text-blue-500 dark:text-blue-400'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right Side Items */}
          <div className={cn('flex items-center gap-1')}>
            <Separator orientation="vertical" className={cn('h-6')} />
            <ThemeSwitch />
            <CommandPalette />
            {/* <MobileMenu /> */}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
