'use client';

import { useEffect, useState } from 'react';

/**
 * Hook that tracks which heading is currently active based on scroll position.
 * Uses Intersection Observer to detect when headings enter/leave the viewport.
 *
 * @param headingIds - Array of heading element IDs to observe
 * @returns The ID of the currently active heading
 */
export const useActiveHeading = (headingIds: string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Get the topmost visible heading
          const topEntry = visibleEntries.reduce((prev, curr) => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr;
          });
          setActiveId(topEntry.target.id);
        }
      },
      {
        // Observe when heading is in the top 20% of the viewport
        rootMargin: '-1px 0px -60% 0px',
        threshold: 0,
      },
    );

    // Observe all headings
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active heading
    const firstElement = document.getElementById(headingIds[0] ?? '');
    if (headingIds[0] && firstElement) {
      const rect = firstElement.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.2) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveId(headingIds[0]);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [headingIds]);

  return activeId;
};
