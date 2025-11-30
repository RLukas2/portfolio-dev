'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const containerAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, delay: 0.3 },
};

const primaryGlowAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.3, 0.2],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

const secondaryGlowAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.1, 0.2, 0.1],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: 1,
  },
};

export default function ProfileImage() {
  return (
    <motion.div
      className="relative flex justify-center md:w-1/2"
      initial={containerAnimation.initial}
      animate={containerAnimation.animate}
      transition={containerAnimation.transition}
    >
      {/* Glow effects */}
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-30 blur-3xl"
        animate={primaryGlowAnimation.animate}
        transition={primaryGlowAnimation.transition}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-linear-to-r from-indigo-400 to-blue-400 opacity-20 blur-2xl"
        animate={secondaryGlowAnimation.animate}
        transition={secondaryGlowAnimation.transition}
      />

      {/* Profile Image */}
      <div className="pointer-events-none relative h-auto min-h-[280px] w-[90%] max-w-[450px] overflow-hidden rounded-full border-4 border-white shadow-lg shadow-black/20 dark:border-gray-800">
        <Image
          src="/media/rlukas/rlukas.jpg"
          alt="Ngo Hoang Tuan - Backend Engineer"
          objectFit="cover"
          priority
          loading="eager"
          quality={50}
          className="h-full w-full rounded-full"
          width={512}
          height={512}
        />
      </div>
    </motion.div>
  );
}
