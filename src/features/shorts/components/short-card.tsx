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
      className="group/short bg-card hover:bg-accent/50 relative flex flex-col gap-3 rounded-xl border p-4 transition-colors"
      title={title}
    >
      {/* Title */}
      <h3 className="font-cal m-0 line-clamp-2 text-lg text-pretty group-hover/short:underline">
        {title}
      </h3>

      {/* Views */}
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
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
    </Link>
  );
};

export default ShortCard;
