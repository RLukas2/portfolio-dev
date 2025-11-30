'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Maximize2Icon,
  MinusIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ImageAlbumProps {
  images: {
    title: string;
    imageUrl:
      | string
      | {
          dark: string;
          light: string;
        };
    caption?: string;
  }[];
  caption?: string;
  showThumbnails?: boolean;
  className?: string;
}

const ImageAlbum = ({
  images = [],
  caption,
  showThumbnails = false,
  className,
}: ImageAlbumProps) => {
  const { resolvedTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Swipe gesture support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStart(touch.clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const touchEnd = touch.clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStart(null);
  };
  if (!images.length) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const imageSrc =
    typeof currentImage.imageUrl === 'string'
      ? currentImage.imageUrl
      : resolvedTheme === 'dark'
        ? currentImage.imageUrl.dark
        : currentImage.imageUrl.light;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-3 rounded-md border px-6 py-3',
        isExpanded && 'bg-background fixed inset-4 z-50 overflow-auto',
        className,
      )}
    >
      {/* Title */}
      <h3 className="font-cal mt-0 text-lg">{currentImage.title}</h3>{' '}
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Invisible placeholder to maintain aspect ratio */}
        <div className="pointer-events-none invisible w-full">
          <Image
            src={imageSrc}
            alt=""
            width={1280}
            height={720}
            className="rounded-xl object-cover"
            aria-hidden="true"
          />
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full"
          >
            <Image
              src={imageSrc}
              alt={currentImage.title}
              width={1280}
              height={720}
              className="rounded-xl object-cover"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (overlay on image) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="bg-background/80 hover:bg-background absolute top-1/2 left-2 -translate-y-1/2"
        >
          <ChevronLeftIcon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="bg-background/80 hover:bg-background absolute top-1/2 right-2 -translate-y-1/2"
        >
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
      {/* Image Caption */}
      {(currentImage.caption || caption) && (
        <p className="text-muted-foreground my-0 text-sm italic">
          {currentImage.caption || caption}
        </p>
      )}
      {/* Dot Indicators */}
      <div className="flex items-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={cn(
              'size-2 rounded-full transition-all duration-200',
              currentIndex === index
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      {/* Image Counter */}
      <p className="text-muted-foreground text-xs">
        {currentIndex + 1} / {images.length}
      </p>
      {/* Thumbnails (optional) */}
      {showThumbnails && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {images.map((image, index) => {
            const thumbSrc =
              typeof image.imageUrl === 'string'
                ? image.imageUrl
                : resolvedTheme === 'dark'
                  ? image.imageUrl.dark
                  : image.imageUrl.light;

            return (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  'shrink-0 overflow-hidden rounded-md border-2 transition-all',
                  currentIndex === index
                    ? 'border-primary'
                    : 'border-transparent opacity-60 hover:opacity-100',
                )}
              >
                <Image
                  src={thumbSrc}
                  alt={image.title}
                  width={80}
                  height={45}
                  className="size-12 object-cover md:h-12 md:w-20"
                />
              </button>
            );
          })}
        </div>
      )}
      {/* Controls */}
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handlePrev}>
              <ChevronLeftIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous (←)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronRightIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next (→)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              className="hidden md:inline-flex"
            >
              {isExpanded ? (
                <MinusIcon className="size-4" />
              ) : (
                <Maximize2Icon className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isExpanded ? 'Collapse' : 'Expand'}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImageAlbum;
