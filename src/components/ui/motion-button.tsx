'use client';

import { type HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Create a motion version of the button
const MotionButtonPrimitive = motion.create('button');

interface MotionButtonProps extends Omit<
  HTMLMotionProps<'button'>,
  'children'
> {
  children?: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}

/**
 * MotionButton - A button with built-in micro-interactions.
 * Includes subtle scale and tap animations for better user feedback.
 */
const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <MotionButtonPrimitive
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        {...props}
      >
        {children}
      </MotionButtonPrimitive>
    );
  },
);
MotionButton.displayName = 'MotionButton';

/**
 * MotionCard - A wrapper component for cards with hover animations.
 * Adds subtle lift and shadow effects on hover.
 */
const MotionCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn('rounded-lg', className)}
      whileHover={{
        y: -4,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
MotionCard.displayName = 'MotionCard';

/**
 * MotionLink - A wrapper for links with hover animations.
 * Can be used with Next.js Link component.
 */
const MotionLink = motion.create('a');

/**
 * Preset animation variants for common micro-interactions
 */
export const microInteractions = {
  /** Subtle scale up on hover */
  hover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  /** Lift effect with shadow */
  lift: {
    whileHover: { y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  /** Gentle pulse animation */
  pulse: {
    animate: {
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  /** Fade in from below */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  /** Stagger children animations */
  staggerContainer: {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    },
  },
  staggerItem: {
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
};

export { MotionButton, MotionCard, MotionLink };
