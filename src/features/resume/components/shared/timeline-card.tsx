import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface TimelineCardProps {
  /** Logo URL or null/undefined for fallback icon */
  logo?: string | null;
  /** Alt text for the logo */
  logoAlt: string;
  /** Fallback icon when no logo is provided */
  fallbackIcon: React.ReactNode;
  /** Optional URL to link the logo/title to */
  url?: string | null;
  /** Whether this is the last item in the timeline */
  isLast?: boolean;
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Additional className for the card */
  className?: string;
}

/**
 * TimelineCard component
 * A reusable card component for timeline entries with consistent styling.
 */
const TimelineCard = ({
  logo,
  logoAlt,
  fallbackIcon,
  url,
  children,
  className,
}: TimelineCardProps) => {
  return (
    <li className="group relative">
      {/* Card content */}
      <div
        className={cn(
          'border-border/50 hover:border-primary rounded-xl border p-4 transition-all duration-300 hover:shadow-lg',
          className,
        )}
      >
        {/* Header with logo and title */}
        <div className="mb-3 flex items-start gap-3">
          {/* Logo */}
          <div className="shrink-0">
            {logo ? (
              url ? (
                <Link href={url} target="_blank" className="block">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    width={44}
                    height={44}
                    className="rounded-xl object-cover transition-transform hover:scale-105"
                  />
                </Link>
              ) : (
                <Image
                  src={logo}
                  alt={logoAlt}
                  width={44}
                  height={44}
                  className="rounded-xl object-cover"
                />
              )
            ) : (
              <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-xl">
                {fallbackIcon}
              </div>
            )}
          </div>

          {/* Title and subtitle area */}
          <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </div>{' '}
    </li>
  );
};

export default TimelineCard;
