import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * Reusable external link component with consistent styling and security attributes
 */
const ExternalLink = ({ href, children, className }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors',
      className,
    )}
  >
    {children}
  </a>
);

export default ExternalLink;
