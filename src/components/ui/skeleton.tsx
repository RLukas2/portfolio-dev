import { cn } from '@/lib/utils';

/**
 * Skeleton component to render a loading skeleton placeholder.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} param0
 * @param {React.HTMLAttributes<HTMLDivElement>} param0.className
 * @param {React.HTMLAttributes<HTMLDivElement>} param0....props
 * @returns {*}
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
