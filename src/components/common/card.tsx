'use client';

import { useCallback, useRef } from 'react';

import Link from '@/components/common/link';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  ariaLabel?: string;
  mouseEffect?: boolean;
  compact?: boolean;
}

/**
 * Card Component
 * A component that displays a card with optional mouse effects and compact styling.
 *
 * @param {CardProps} param0
 * @param {React.ReactNode} param0.children - The content to be displayed inside the card.
 * @param {string} param0.className - Additional CSS classes for styling the card.
 * @param {string} param0.href - Optional URL to make the card a clickable link.
 * @param {string} param0.ariaLabel - ARIA label for accessibility.
 * @param {boolean} [param0.mouseEffect=false] - Enables mouse position effect on hover.
 * @param {boolean} [param0.compact=false] - Enables compact padding for the card.
 * @returns {*}
 */
export const Card = ({
  children,
  className,
  href,
  ariaLabel,
  mouseEffect = false,
}: CardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const ref = href ? linkRef.current : divRef.current;
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.style.setProperty('--mouse-x', `${x}px`);
      ref.style.setProperty('--mouse-y', `${y}px`);
    },
    [href],
  );

  const baseClasses = cn(
    'group',
    mouseEffect && 'card-mouse-effect',
    className,
  );

  const content = (
    <div className="card-content max-md:border md:absolute">{children}</div>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={linkRef}
        className={baseClasses}
        aria-label={ariaLabel}
        tabIndex={0}
        onMouseMove={mouseEffect ? handleMouseMove : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      ref={divRef}
      className={baseClasses}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseMove={mouseEffect ? handleMouseMove : undefined}
    >
      {content}
    </div>
  );
};
