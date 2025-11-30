import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect if the user has scrolled past a certain threshold.
 *
 * @param {number} [threshold=0] - The scroll threshold in pixels.
 * @returns {boolean} - True if the user has scrolled past the threshold, false otherwise.
 */
const useScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return isScrolled;
};

export default useScroll;
