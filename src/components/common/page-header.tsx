'use client';

import { motion } from 'framer-motion';
import { forwardRef, useMemo } from 'react';

import { cn } from '@/lib/utils';

import Container from '../core/container';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

/**
 * Page Header Component
 * This component renders a page header with a title and an optional description.
 *
 * @type {React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>}
 * @param {PageHeaderProps} param0
 * @param {string} param0.title - The title of the page header. * @param {string} [param0.description] - The optional description of the page header.
 * @param {boolean} [param0.centered=false] - Whether the text should be centered.
 * @param {React.ReactNode} [param0.children] - Optional children to render below the description.
 * @param {string} [param0.className] - Additional class names to apply to the header.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the div element.
 * @returns {React.ReactNode} The rendered PageHeader component.
 */
const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    { title, description, centered = false, children, className, ...props },
    ref,
  ) => {
    const animation = useMemo(
      () => ({
        hide: centered ? { y: 32, opacity: 0 } : { x: -32, opacity: 0 },
        show: centered ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 },
      }),
      [centered],
    );

    return (
      <div
        className={cn('bg-grid py-16', 'lg:py-20', className)}
        {...props}
        ref={ref}
      >
        <Container
          className={cn(
            'pointer-events-none overflow-hidden select-none',
            {
              'text-center': centered,
            },
            centered && 'flex flex-col items-center justify-center',
          )}
        >
          <motion.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0.1 }}
          >
            <h1
              className={cn(
                'font-cal m-0 text-4xl font-bold',
                'md:text-5xl',
                'lg:text-6xl',
              )}
            >
              {title}
            </h1>
          </motion.div>{' '}
          {description && (
            <motion.div
              initial={animation.hide}
              animate={animation.show}
              transition={{ delay: 0.2 }}
            >
              <p className={cn('mt-2 md:text-lg')}>{description}</p>
            </motion.div>
          )}
          {/* Render children if provided */}
          {children && (
            <motion.div
              initial={animation.hide}
              animate={animation.show}
              transition={{ delay: 0.3 }}
              className="pointer-events-auto mt-6"
            >
              {children}
            </motion.div>
          )}
        </Container>
      </div>
    );
  },
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
