'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface BlurImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  imageClassName?: string;
  lazy?: boolean;
}

// Static style object - defined outside component to prevent recreation
const imageTransitionStyle = {
  transition: 'filter 700ms ease, transform 150ms ease',
};

/**
 * BlurImage Component
 * This component renders an image with a blur effect while loading.
 *
 * @type {React.ForwardRefExoticComponent<BlurImageProps & React.RefAttributes<HTMLImageElement>>}
 * @param {BlurImageProps} param0
 * @param {string} param0.src - The source URL of the image.
 * @param {string} param0.alt - The alt text for the image.
 * @param {string} [param0.className] - Additional class names to apply to the container div.
 * @param {string} [param0.imageClassName] - Additional class names to apply to the image.
 * @param {boolean} [param0.lazy=true] - Whether to lazy load the image.
 * @param {number} [param0.width=1920] - The width of the image.
 * @param {number} [param0.height=1024] - The height of the image.
 * @param {React.Ref<HTMLImageElement>} ref - The ref to be forwarded to the image element.
 * @returns {React.ReactNode} The rendered BlurImage component.
 */
const BlurImage = forwardRef<HTMLImageElement, BlurImageProps>(
  (
    {
      alt,
      src,
      className,
      imageClassName,
      lazy = true,
      width = 1920,
      height = 1024,
      ...props
    },
    ref,
  ): React.ReactNode => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div
        className={cn(
          'overflow-hidden',
          isLoading && 'animate-pulse',
          className,
        )}
      >
        <Image
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            isLoading && 'scale-[1.02] blur-xl grayscale',
            'rounded-lg',
            imageClassName,
          )}
          style={imageTransitionStyle}
          loading={lazy ? 'lazy' : undefined}
          priority={!lazy}
          quality={100}
          onLoad={() => setIsLoading(false)}
          width={width}
          height={height}
          {...props}
        />
      </div>
    );
  },
);

BlurImage.displayName = 'BlurImage';

export default BlurImage;
