import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface DiscoverWidgetProps {
  href: string;
  text?: string;
  className?: string;
}

export function DiscoverWidget({
  href,
  text = 'Discover more projects',
  className = '',
}: DiscoverWidgetProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex size-full p-6',
        'items-center justify-between',
        className,
      )}
    >
      <span className="relative font-bold">
        {text}
        <span className="bg-primary absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
      </span>
      <ArrowRight className="size-6 transition-all duration-300 group-hover:rotate-[90deg]" />
    </Link>
  );
}
