'use client';

import { ListIcon } from 'lucide-react';
import { useMemo } from 'react';

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
 * Highlights the currently active heading based on scroll position.
 *
 * @param props - Component props
 * @returns The rendered Table of Contents
 */
const TableOfContents = ({
  headings: headingsJson,
  className,
  title = 'On This Page',
}: TableOfContentsProps) => {
  const headings = useMemo(
    () => deserializeHeadings(headingsJson),
    [headingsJson],
  );

  const headingIds = useMemo(
    () => headings.map((heading) => heading.id),
    [headings],
  );

  const activeId = useActiveHeading(headingIds);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className={cn('space-y-4', className)} aria-label="Table of contents">
      <div className="flex items-center gap-2">
        <ListIcon className="text-primary size-5" />
        <h3 className="font-cal text-lg font-semibold">{title}</h3>
      </div>

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
    </nav>
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
          'block transition-colors duration-200',
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
