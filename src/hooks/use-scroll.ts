import { useCallback, useEffect, useRef, useState } from 'react';

// Initialize scroll state on client side only
const getInitialScrollState = (threshold: number) => {
  if (typeof window === 'undefined') return false;
  return window.scrollY > threshold;
};

const useScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(() =>
    getInitialScrollState(threshold),
  );
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      // Use requestAnimationFrame to throttle scroll updates
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
