'use client';

import Container from '@/components/core/container';
import { cn } from '@/lib/utils';

import type { ContentHeaderProps } from '../../types/content';

/**
 * A flexible header component with three sections: left, center (children), and right.
 *
 * @example
 * // Basic usage with back button and title
 * <ContentHeader leftSection={<BackButton href="/blog" />}>
 *   <h1>My Post Title</h1>
 *   <p>Description here</p>
 * </ContentHeader>
 *
 * @example
 * // With action buttons on the right
 * <ContentHeader
 *   leftSection={<BackButton href="/projects" />}
 *   rightSection={<Button>View Live</Button>}
 * >
 *   <h1>Project Title</h1>
 * </ContentHeader>
 */
const ContentHeader = ({
  leftSection,
  children,
  className,
  containerProps,
}: ContentHeaderProps) => {
  return (
    <Container {...containerProps} className={cn('py-4', className)} wide>
      {/* Left Section (e.g., Back Button) */}
      {leftSection}

      {/* Main Content Section */}
      <div className="mt-6">{children}</div>
    </Container>
  );
};

export default ContentHeader;
