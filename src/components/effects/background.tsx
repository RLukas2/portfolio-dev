'use client';

import { motion } from 'framer-motion';
import { useId, useMemo } from 'react';

import useMediaQuery from '@/hooks/use-media-query';

// Seeded Random Number Generator for consistent star placement
class SeededRandom {
  private seed: number;

  constructor(inputSeed: number) {
    this.seed = inputSeed;
  }

  next() {
    this.seed |= 0; // Ensure seed is a 32-bit integer
    this.seed = (this.seed + 0x9e3779b9) | 0;
    let t = this.seed ^ (this.seed >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    t = t ^ (t >>> 15);
    return (t >>> 0) / 4294967296;
  }

  seedGen() {
    return (Math.random() * 2 ** 32) >>> 0;
  }
}

// Simple seeded random function for fallback
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Helper function to round to consistent precision
const roundToPrecision = (num: number, precision: number = 2) => {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
};

/**
 * StarBackground Component
 * This component renders a dynamic starry background with accent stars and nebula effects.
 *
 * @returns {React.ReactNode} The rendered StarBackground component.
 */
export default function StarBackground() {
  const id = useId();

  // Detect mobile devices and reduced motion preference for performance optimization
  const isMobile = useMediaQuery('(max-width: 768px)', false);

  // Reduce star count significantly on mobile to prevent performance issues
  const numberOfAccentStars = isMobile ? 3 : 10;
  const numberOfBackgroundStars = isMobile ? 50 : 200;

  // Generate accent stars with animation
  const accentStars = useMemo(
    () =>
      [...Array(numberOfAccentStars)].map((_, index) => {
        const seed = id.length + index;
        return {
          id: index,
          top: `${roundToPrecision(seededRandom(seed) * 99, 2)}%`,
          left: `${roundToPrecision(seededRandom(seed + 1) * 100, 2)}%`,
          duration: 3 + seededRandom(seed + 2) * 4,
          delay: seededRandom(seed + 3) * 5,
        };
      }),
    [id, numberOfAccentStars],
  );

  // Generate background stars distributed across full page height
  const backgroundStars = useMemo(() => {
    const rng = new SeededRandom(id.length);

    return Array.from({ length: numberOfBackgroundStars }, () => ({
      x: rng.next() * 99,
      y: rng.next() * 100,
      size: rng.next() < 0.5 ? 1 : 2,
      opacity: 0.2 + rng.next() * 0.5,
      duration: 2 + rng.next() * 3,
    }));
  }, [id, numberOfBackgroundStars]);

  return (
    <div className="from-bg-primary via-bg-secondary to-bg-secondary pointer-events-none fixed inset-0 z-0 bg-linear-to-b">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {backgroundStars.map((star, index) => (
          <motion.div
            key={`bg-star-${index}`}
            className={`absolute rounded-full bg-blue-800 dark:bg-white`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.y}%`,
              left: `${star.x}%`,
              opacity: star.opacity,
            }}
            animate={{ opacity: [star.opacity, 0.1, star.opacity] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (index % 10) * 0.3,
            }}
          />
        ))}
      </div>

      {/* Accent Stars */}
      <div className="absolute inset-0">
        {accentStars.map((star) => (
          <motion.div
            key={`accent-star-${star.id}`}
            className="absolute h-1 w-1 rounded-full bg-gray-800 dark:bg-white"
            style={{
              top: star.top,
              left: star.left,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Nebula Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-72 max-h-[90vh] w-72 max-w-[90vw] rounded-full bg-linear-to-r from-purple-500/40 via-blue-500/40 to-cyan-400/40 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 max-h-[80vh] w-64 max-w-[80vw] rounded-full bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
      </div>
    </div>
  );
}
