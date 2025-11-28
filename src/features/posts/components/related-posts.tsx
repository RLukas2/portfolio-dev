'use client';

import Container from '@/components/core/container';

import PostCard from './post-card';
import { usePostContext } from './post-provider';
import { allPosts } from '.content-collections/generated';

const RelatedPosts = () => {
  const { slug } = usePostContext();

  // Get other published posts excluding the current one
  const otherPosts = allPosts
    .filter((post) => post.published && post.slug !== slug)
    .slice(0, 3);

  if (otherPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t pt-12">
      <Container>
        <h2 className="font-cal text-2xl md:text-3xl">
          Other posts you might like
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RelatedPosts;
