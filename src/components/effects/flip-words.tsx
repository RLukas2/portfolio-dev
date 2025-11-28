'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * FlipWords Component
 * This component displays a series of words that flip with an animation effect.
 *
 * @param {{
 *   words: string[];
 *   duration?: number;
 *   className?: string;
 * }} param0
 * @param {{}} param0.words
 * @param {number} [param0.duration=1000] - Duration between word flips in milliseconds.
 * @param {string} param0.className - Additional class names to apply to the component.
 * @returns {React.ReactNode} The rendered FlipWords component.
 */
const FlipWords = ({
  words,
  duration = 1000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}): React.ReactNode => {
  if (words.length === 0) {
    words = [''];
  }

  const [currentWord, setCurrentWord] = useState<string>(words[0] ?? '');
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] ?? words[0] ?? '';
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        startAnimation();
      }, duration);
    }
  }, [isAnimating, startAnimation, duration]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute',
        }}
        className={cn('relative z-10 inline-block text-left', className)}
        key={currentWord}
      >
        {currentWord.split('').map((letter, index) => (
          <motion.span
            key={currentWord + index}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipWords;
