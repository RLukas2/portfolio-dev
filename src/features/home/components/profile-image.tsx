'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProfileImage() {
  return (
    <motion.div
      className="relative flex justify-center md:w-1/2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {/* Glow effects */}
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-linear-to-r from-indigo-400 to-blue-400 opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Profile Image */}
      <div className="pointer-events-none relative h-auto min-h-[280px] w-[90%] max-w-[450px] overflow-hidden rounded-full border-4 border-white shadow-lg shadow-black/20 dark:border-gray-800">
        <Image
          src="/media/rlukas/rlukas.jpg"
          alt="Ngo Hoang Tuan - Backend Engineer"
          objectFit="cover"
          priority
          className="h-full w-full rounded-full"
          width={1000}
          height={1000}
        />
      </div>
    </motion.div>
  );
}
