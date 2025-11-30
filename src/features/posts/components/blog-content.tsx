'use client';

import { SearchIcon } from 'lucide-react';

import EmptyState from '@/components/common/empty-state';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ActiveFilters, FilterSidebar } from '@/features/content/components';
import {
  BLOG_SORT_OPTIONS,
  useContentFilters,
} from '@/features/content/hooks/use-content-filters';

import PostCard from './post-card';
import type { Post } from '.content-collections/generated';

interface BlogContentProps {
  posts: Post[];
}

/**
 * BlogContent component that displays a list of blog posts with filtering and sorting options.
 *
 * @param {BlogContentProps} props - The component props
 * @param {Post[]} props.posts - Array of blog posts to display
 * @returns {React.ReactNode} The rendered blog content
 */
const BlogContent = ({ posts }: BlogContentProps): React.ReactNode => {
  const {
    query,
    setQuery,
    sortOption,
    setSortOption,
    selectedTags,
    toggleTag,
    clearFilters,
    hasActiveFilters,
    allTags,
    filteredItems: filteredPosts,
  } = useContentFilters(posts, {
    getSearchableText: (post) =>
      post.title + (post.excerpt ?? '') + (post.tags?.join(' ') ?? ''),
    defaultSortOption: 'date-desc',
  });

  return (
    <>
      {/* Page Header with Search */}
      <PageHeader
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
      >
        <div className="relative w-full">
          <Input
            aria-label="Search posts"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="ring-offset-background focus-visible:ring-input pl-10 transition-all duration-200 focus-visible:ring-1 focus-visible:outline-none"
          />
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
        </div>
      </PageHeader>

      {/* Full-width Separator */}
      <Separator />

      {/* Main Content */}
      <Container className="py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Posts Section */}
          <div className="order-2 flex-1 space-y-6 lg:order-1">
            {/* Active Filters Display */}{' '}
            {hasActiveFilters && (
              <ActiveFilters
                query={query}
                setQuery={setQuery}
                sortOption={sortOption}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                clearFilters={clearFilters}
                sortOptions={BLOG_SORT_OPTIONS}
              />
            )}
            {/* Posts Grid or Empty State */}
            {filteredPosts.length ? (
              <div className="grid auto-cols-fr grid-cols-1 gap-8">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={
                  query || selectedTags.length > 0
                    ? 'No posts found. Try adjusting your filters.'
                    : "The posts are playing hide and seek – we just can't find them!"
                }
              />
            )}
          </div>{' '}
          {/* Filter Sidebar */}
          <FilterSidebar
            sortOption={sortOption}
            setSortOption={setSortOption}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            allTags={allTags}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            sortOptions={BLOG_SORT_OPTIONS}
          />
        </div>
      </Container>
    </>
  );
};

export default BlogContent;
