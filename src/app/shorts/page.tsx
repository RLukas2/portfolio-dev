import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { ROUTES } from '@/constants/routes';
import ShortsContent from '@/features/shorts/components/shorts-content';
import { seo } from '@/lib/meta';

import { allShorts } from '.content-collections/generated';

// Revalidate every hour - content changes infrequently
export const revalidate = 3600;

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

  return <ShortsContent shorts={shorts} />;
};

export default ShortsPage;
