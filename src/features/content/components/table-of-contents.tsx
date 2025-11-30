'use client';

import { ListIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TocHeading } from '@/config/content-collections/extract-headings';
import { deserializeHeadings } from '@/config/content-collections/extract-headings';
import { cn } from '@/lib/utils';

import { useActiveHeading } from '../hooks/use-active-heading';

interface TableOfContentsProps {
  /** Serialized JSON string of headings */
  headings: string;
  /** Additional CSS classes */
  className?: string;
  /** Title for the ToC section */
  title?: string;
}

/**
 * Table of Contents component that displays a navigable list of headings.
 * Shows as a sidebar on desktop and a floating button with dialog on mobile.
 * Highlights the currently active heading based on scroll position.
 *
 * @param {TableOfContentsProps} param0
 * @param {string} param0.headings: headingsJson
 * @param {string} param0.className
 * @param {string} [param0.title='On This Page']
 * @returns {*}
 */
const TableOfContents = ({
  headings: headingsJson,
  className,
  title = 'On This Page',
}: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(
    () => deserializeHeadings(headingsJson),
    [headingsJson],
  );

  const headingIds = useMemo(
    () => headings.map((heading) => heading.id),
    [headings],
  );

  const activeId = useActiveHeading(headingIds);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
      // Close dialog on mobile after clicking
      setIsOpen(false);
    },
    [],
  );

  // Find active heading text for mobile button
  const activeHeading = useMemo(
    () => headings.find((h) => h.id === activeId),
    [headings, activeId],
  );

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop: Static sidebar */}
      <nav
        className={cn('hidden space-y-4 lg:block', className)}
        aria-label="Table of contents"
      >
        <div className="flex items-center gap-2">
          <ListIcon className="text-primary size-5" />
          <h3 className="font-cal text-lg font-semibold">{title}</h3>
        </div>

        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <TocItem
              key={heading.id}
              heading={heading}
              isActive={activeId === heading.id}
              onClick={handleClick}
            />
          ))}
        </ul>
      </nav>

      {/* Mobile: Floating button + Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-background fixed right-4 bottom-4 z-50 gap-2 shadow-lg backdrop-blur-sm lg:hidden"
          >
            <ListIcon className="size-4" />
            <span className="max-w-32 truncate text-xs">
              {activeHeading?.text ?? title}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListIcon className="text-primary size-5" />
              {title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <TocItem
                  key={heading.id}
                  heading={heading}
                  isActive={activeId === heading.id}
                  onClick={handleClick}
                />
              ))}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface TocItemProps {
  heading: TocHeading;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const TocItem = ({ heading, isActive, onClick }: TocItemProps) => {
  // Calculate indentation based on heading level (h2 = 0, h3 = 1, h4 = 2)
  const indent = (heading.level - 2) * 12;

  return (
    <li style={{ paddingLeft: `${indent}px` }}>
      <a
        href={`#${heading.id}`}
        onClick={(e) => onClick(e, heading.id)}
        className={cn(
          'block py-1 transition-colors duration-200',
          'hover:text-foreground',
          'border-l-2 pl-3',
          isActive
            ? 'border-primary text-foreground font-medium'
            : 'text-muted-foreground border-transparent',
        )}
      >
        {heading.text}
      </a>
    </li>
  );
};

export default TableOfContents;
