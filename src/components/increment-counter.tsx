'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

interface IncrementCounterProps {
  from?: number;
  to: number;
  duration?: number;
}

/**
 * IncrementCounter Component
 * This component animates a counter from a starting value to an ending value
 *
 * @param {IncrementCounterProps} param0
 * @param {number} [param0.from=0] - Starting value of the counter.
 * @param {number} param0.to - Ending value of the counter.
 * @param {number} [param0.duration=1] - Duration of the animation in seconds.
 * @returns {React.ReactNode} The rendered IncrementCounter component.
 */
const IncrementCounter = ({
  from = 0,
  to,
  duration = 1,
}: IncrementCounterProps): React.ReactNode => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef);

  useEffect(() => {
    if (inView) animate(count, to, { duration });
  }, [count, duration, inView, to]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
};

export default IncrementCounter;
