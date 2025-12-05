import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface SocialWidgetProps {
  Icon: React.ReactNode;
  href: string;
  label?: string;
  className?: string;
}

export function SocialWidget({
  Icon,
  href,
  label,
  className = '',
}: SocialWidgetProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'flex size-full',
        'text-card-foreground items-center justify-center',
        'group-hover:text-primary',
        className,
      )}
    >
      {Icon}
    </Link>
  );
}
