import Container from '@/components/core/container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * Reusable loading skeleton for content detail pages (blog, projects, shorts)
 * Reduces duplicate loading page code across multiple routes
 */
const ContentDetailLoading = () => {
  return (
    <Container>
      {/* Back button skeleton */}
      <div className={cn('mt-4', 'md:mt-8')}>
        <Skeleton className={cn('h-6 w-16')} />
      </div>

      {/* Header skeleton */}
      <div className={cn('py-16', 'lg:py-20')}>
        <div className={cn('flex flex-col gap-y-4')}>
          <Skeleton className={cn('h-16 w-1/4')} />
          <Skeleton className={cn('h-8 w-full')} />
        </div>
      </div>

      {/* Meta information skeleton */}
      <div className={cn('flex flex-col justify-between gap-2', 'sm:flex-row')}>
        <Skeleton className={cn('h-5 w-48')} />
        <Skeleton className={cn('h-5 w-48')} />
      </div>

      {/* Featured image skeleton */}
      <div className={cn('my-4', 'md:my-8')}>
        <Skeleton className={cn('h-[485px] w-full rounded-xl')} />
      </div>

      {/* Content skeleton */}
      <Skeleton className={cn('mb-4 h-8 w-1/2')} />
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className={cn('mb-2 h-7 w-full')} />
      ))}
    </Container>
  );
};

export default ContentDetailLoading;
