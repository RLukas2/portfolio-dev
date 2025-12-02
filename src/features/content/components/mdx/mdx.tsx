/* eslint-disable react-hooks/static-components */
'use client';

import './shiki.css';

import { useMDXComponent } from '@content-collections/mdx/react';
import type { MDXComponents } from 'mdx/types';
import { useEffect, useRef } from 'react';

import BlurImage from '@/components/effects/blur-image';
import { cn } from '@/lib/utils';

import Anchor from './anchor';
import AppsGrid from './apps-grid';
import { CodeBlock, Pre } from './code-block';
import CoreStack from './core-stack';
import Heading from './heading';
import ImageAlbum from './image-album';
import ImageComparison from './image-comparison';
import ImageZoom from './image-zoom';
import Workstation from './workstation';

const components: MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <Heading as="h3" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
    <Heading as="h4" {...props} />
  ),
  h5: (props: React.ComponentPropsWithoutRef<'h5'>) => (
    <Heading as="h5" {...props} />
  ),
  h6: (props: React.ComponentPropsWithoutRef<'h6'>) => (
    <Heading as="h6" {...props} />
  ),
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => (
    <ImageZoom>
      <BlurImage {...props} />
    </ImageZoom>
  ),
  a: Anchor,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  span: ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    if (className?.includes('katex-display')) {
      return <span className={cn('my-6', className)} {...props} />;
    }
    return <span className={className} {...props} />;
  },

  // Custom components
  AppsGrid,
  Workstation,
  CoreStack,
  ImageComparison,
  ImageAlbum,
};

const Mdx = ({ code, className }: { code: string; className?: string }) => {
  const MdxContent = useMDXComponent(code);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to hash after MDX content is mounted
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Small delay to ensure content is fully rendered
    const timeoutId = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'prose dark:prose-invert w-full max-w-none',
        'prose-headings:scroll-m-20',
        'prose-p:leading-relaxed',
        'prose-li:leading-relaxed',
        className,
      )}
    >
      <MdxContent components={{ ...components }} />
    </div>
  );
};

export default Mdx;
