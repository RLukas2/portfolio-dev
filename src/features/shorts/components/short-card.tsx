'use client';

import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

import IncrementCounter from '@/components/increment-counter';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { useViews } from '@/features/content/hooks/use-views';

import type { Short } from '.content-collections/generated';

const ShortCard = ({ short }: { short: Short }) => {
  const { slug, title, tags } = short;
  const { views, isLoading: isLoadViews } = useViews({ slug });

  return (
    <Link
      href={`${ROUTES.shorts}/${slug}`}
      className={[
        'relative flex h-full flex-col rounded-xl border p-6',
        'transition-all duration-300 ease-out',
        'group-hover/grid:opacity-50 hover:z-10 hover:-translate-y-1 hover:scale-[1.02] hover:rotate-1 hover:opacity-100! hover:shadow-lg',
        'group/short',
      ].join(' ')}
      title={title}
    >
      {/* Title - grows to push content below to bottom */}
      <h3 className="font-cal m-0 mb-auto line-clamp-3 text-xl text-pretty group-hover/short:underline">
        {title}
      </h3>

      {/* Bottom section - anchored to bottom */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Views */}
        <div className="text-foreground flex items-center gap-1.5 text-sm">
          <EyeIcon className="text-primary size-4" />
          {isLoadViews ? (
            <Skeleton className="h-4 w-12" />
          ) : (
            <>
              <IncrementCounter to={views} /> views
            </>
          )}
        </div>

        <Separator />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-muted-foreground rounded-lg px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShortCard;
