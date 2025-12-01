'use client';

import Link from 'next/link';

import {
  ContentCardMeta,
  ContentCardTags,
} from '@/components/common/content-card';
import { Separator } from '@/components/ui/separator';
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
      <h3 className="font-cal m-0 mb-auto line-clamp-3 text-xl text-pretty group-hover/short:underline">
        {title}
      </h3>

      <div className="mt-4 flex flex-col gap-3">
        <ContentCardMeta
          views={views}
          isLoadingViews={isLoadViews}
          className="text-foreground"
        />

        <Separator />

        <ContentCardTags tags={tags || []} />
      </div>
    </Link>
  );
};

export default ShortCard;
