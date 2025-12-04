import { useEffect, useState } from 'react';

const ROTATION_INTERVAL = 3000;

export const useRotatingPlaceholder = (placeholders: string[]) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, ROTATION_INTERVAL);

    return () => clearTimeout(timer);
  }, [index, placeholders.length]);

  return placeholders[index];
};
