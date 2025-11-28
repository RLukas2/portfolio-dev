import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Loading from '@/app/loading';
import Container from '@/components/core/container';
import Hero from '@/features/home/components/hero';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = seo({
  title: 'Home',
  url: '/',
});

const HighlightedProjects = dynamic(
  () => import('@/features/projects/components/highlighted-projects'),
  {
    loading: () => <Loading />,
  },
);

const LatestPosts = dynamic(
  () => import('@/features/posts/components/latest-posts'),
  {
    loading: () => <Loading />,
  },
);

const GetInTouch = dynamic(
  () => import('@/features/home/components/get-in-touch'),
  {
    loading: () => <Loading />,
  },
);

const HomePage = () => {
  return (
    <div className={cn('flex flex-col')}>
      <Hero />
      <Container className={cn('gap-8')}>
        <HighlightedProjects />
        <LatestPosts />
        <GetInTouch />
      </Container>
    </div>
  );
};

export default HomePage;
