import { Link as TanStackLink, useLocation } from '@tanstack/react-router';
import { cn } from '@xbrk/ui';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const linkVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'no-underline hover:text-foreground hover:underline',
      bold: 'font-bold hover:text-foreground hover:no-underline',
      muted: 'text-muted-foreground hover:text-foreground',
      nav: 'font-medium hover:text-foreground hover:no-underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
  hash?: string;
  href?: string;
  // TanStack Router specific props
  params?: Record<string, string | number>;
  preload?: false | 'intent' | 'viewport' | 'render';
  search?: Record<string, unknown>;
  state?: true | Record<string, unknown>;
  to?: string;
}

// Props that are safe to pass to TanStack Router Link
type TanStackLinkSafeProps = Omit<
  LinkProps,
  'href' | 'to' | 'className' | 'children' | 'variant' | 'onClick' | 'ref' | 'params' | 'search' | 'hash' | 'state'
>;

/**
 * Scrolls to an element with the given hash ID
 * Handles header offset for proper positioning
 */
const scrollToHash = (hash: string) => {
  const id = hash.replace('#', '');
  const element = document.getElementById(id);

  if (element) {
    const headerOffset = 80; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Scrolls to the top of the page smoothly
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * Link Component
 * This component handles internal and external links with appropriate attributes.
 *
 * Supports both simple links and TanStack Router's type-safe routing with params.
 *
 * Variants:
 * - default: Basic link with hover effect (no bold)
 * - bold: Bold link with hover effect (for emphasis)
 * - muted: Muted color link (for secondary links)
 * - nav: Medium weight link (for navigation menus)
 *
 * TanStack Router Features:
 * - params: Route parameters (e.g., { projectId: 'my-project' })
 * - search: Query parameters (e.g., { page: 1, filter: 'active' })
 * - hash: Hash fragment (e.g., 'section-1')
 * - state: Location state
 * - preload: Preload behavior ('intent' or boolean)
 *
 * Same-Page Navigation:
 * - Clicking a link to the current page scrolls to top smoothly
 * - Clicking a link to the current page with hash scrolls to that section
 * - Handles repeated clicks properly
 *
 * Hash Navigation:
 * - Uses TanStack Router for proper integration
 * - Adds manual scroll handling for repeated clicks (TanStack Router limitation)
 * - Supports both /#section and #section formats
 *
 * @example
 * // Simple internal link
 * <Link href="/about">About</Link>
 *
 * @example
 * // Type-safe routing with params
 * <Link to="/projects/$projectId" params={{ projectId: 'my-project' }}>
 *   View Project
 * </Link>
 *
 * @example
 * // External link (automatic security attributes)
 * <Link href="https://github.com">GitHub</Link>
 *
 * @example
 * // Hash navigation with smooth scroll
 * <Link href="#features">Jump to Features</Link>
 *
 * @example
 * // Same page link - scrolls to top
 * <Link href="/blog">Blog</Link> (when already on /blog)
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href: hrefProp, className, children, variant, to, params, search, hash, state, preload, onClick, ...props },
    ref,
  ) => {
    const location = useLocation();

    // Use 'to' if provided, otherwise use 'href'
    const href = to || hrefProp;

    if (!href) {
      throw new Error('Link must have either href or to prop');
    }

    // If using TanStack Router features (params, search, state, preload), use TanStack Link
    const hasTanStackFeatures = params || search || state || preload !== undefined;

    // Type-safe routing with TanStack Router features
    if (hasTanStackFeatures && to) {
      // Check if navigating to the same page
      const isSamePage =
        location.pathname ===
        to.replace(/\/\$[^/]+/g, (match) => {
          const paramKey = match.slice(2); // Remove '/$'
          return params?.[paramKey] ? `/${params[paramKey]}` : match;
        });

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isSamePage) {
          e.preventDefault();
          if (hash) {
            scrollToHash(`#${hash}`);
          } else {
            scrollToTop();
          }
        }

        // Call original onClick if provided
        if (onClick) {
          onClick(e);
        }
      };

      return (
        <TanStackLink
          className={cn(linkVariants({ variant, className }))}
          hash={hash}
          onClick={handleClick}
          params={params}
          preload={preload}
          ref={ref}
          search={search}
          state={state}
          to={to}
          {...(props as TanStackLinkSafeProps)}
        >
          {children}
        </TanStackLink>
      );
    }

    // Internal route with hash (e.g., /#featured-projects)
    // Use TanStack Router Link with hash prop + manual scroll for repeated clicks
    if (href.startsWith('/#')) {
      const hashValue = href.split('#')[1];

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Always scroll to hash (handles repeated clicks)
        scrollToHash(`#${hashValue}`);

        // Call original onClick if provided
        if (onClick) {
          onClick(e);
        }
      };

      return (
        <TanStackLink
          className={cn(linkVariants({ variant, className }))}
          hash={hashValue}
          onClick={handleClick}
          ref={ref}
          to="/"
          {...(props as TanStackLinkSafeProps)}
        >
          {children}
        </TanStackLink>
      );
    }

    // Internal route - use TanStack Router Link
    if (href.startsWith('/')) {
      // Check if navigating to the same page
      const isSamePage = location.pathname === href;

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isSamePage) {
          e.preventDefault();
          scrollToTop();
        }

        // Call original onClick if provided
        if (onClick) {
          onClick(e);
        }
      };

      return (
        <TanStackLink
          className={cn(linkVariants({ variant, className }))}
          onClick={handleClick}
          ref={ref}
          to={href}
          {...(props as TanStackLinkSafeProps)}
        >
          {children}
        </TanStackLink>
      );
    }

    // Hash link on same page (e.g., #section)
    // Use TanStack Router Link with hash prop + manual scroll for repeated clicks
    if (href.startsWith('#')) {
      const hashValue = href.replace('#', '');

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Always scroll to hash (handles repeated clicks)
        scrollToHash(`#${hashValue}`);

        // Call original onClick if provided
        if (onClick) {
          onClick(e);
        }
      };

      return (
        <TanStackLink
          className={cn(linkVariants({ variant, className }))}
          hash={hashValue}
          onClick={handleClick}
          ref={ref}
          to={location.pathname}
          {...(props as TanStackLinkSafeProps)}
        >
          {children}
        </TanStackLink>
      );
    }

    // External link - use regular anchor with security attributes
    return (
      <a
        className={cn(linkVariants({ variant, className }))}
        href={href}
        onClick={onClick}
        ref={ref}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';

export default Link;
