import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'up';
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
  loopSize?: number;
}

/**
 * Marquee Component
 * This component creates a scrolling marquee effect for its children.
 * marquee effect is the continuous scrolling of content either horizontally or vertically.
 *
 * @param {MarqueeProps} param0
 * @param {React.ReactNode} param0.children
 * @param {("left" | "up")} [param0.direction='left'] - The direction of the marquee scroll.
 * @param {boolean} [param0.pauseOnHover=false] - Whether to pause the marquee on hover.
 * @param {boolean} [param0.reverse=false] - Whether to reverse the scroll direction.
 * @param {boolean} [param0.fade=false] - Whether to apply a fade effect at the edges.
 * @param {string} param0.className - Additional class names to apply to the marquee container.
 * @param {number} [param0.loopSize=2] - The number of times to loop the children for continuous effect.
 * @returns {React.ReactNode}
 */
const Marquee = ({
  children,
  direction = 'left',
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  loopSize = 2,
}: MarqueeProps): React.ReactNode => {
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';

  return (
    <div
      className={cn(
        'group flex gap-4 overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className,
      )}
      style={{
        maskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
      }}
    >
      {Array.from({ length: loopSize }, (_, index) => (
        <div
          key={index}
          className={cn(
            'flex shrink-0 justify-around gap-4 [--gap:1rem]',
            direction === 'left'
              ? 'animate-marquee-left flex-row'
              : 'animate-marquee-up flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && 'direction-reverse',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
