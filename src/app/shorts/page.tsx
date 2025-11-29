import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import EmptyState from '@/components/common/empty-state';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { ROUTES } from '@/constants/routes';
import ShortCard from '@/features/shorts/components/short-card';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

import { allShorts } from '.content-collections/generated';

export const metadata: Metadata = seo({
  title: 'Shorts',
  description: 'My personal notes that is not long enough to be a blog post.',
  keywords: [
    'shorts',
    'short',
    'code',
    'collection',
    'tricks',
    'shorthand',
    'scripts',
  ],
  url: ROUTES.shorts,
});

const ShortsPage = () => {
  const shorts = allShorts
    .filter((short) => short.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <PageHeader
        title="Short Notes"
        description="My personal notes that is not long enough to be a blog post."
      />
      <Container>
        {shorts.length ? (
          <div className={cn('grid gap-4')}>
            {shorts.map((short) => (
              <ShortCard key={short._id} short={short} />
            ))}
          </div>
        ) : (
          <EmptyState message="The shorts are probably off having a party somewhere without us!" />
        )}
      </Container>
    </>
  );
};

export default ShortsPage;
