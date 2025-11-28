'use client';

import { FilterIcon, SearchIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import EmptyState from '@/components/common/empty-state';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import PostCard from './post-card';
import type { Post } from '.content-collections/generated';

type SortOption = 'date-desc' | 'date-asc' | 'views-desc' | 'views-asc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'views-desc', label: 'Most Views' },
  { value: 'views-asc', label: 'Least Views' },
];

const filterPosts = (
  posts: Post[],
  query: string | undefined | null = null,
  selectedTags: string[] = [],
): Post[] => {
  if (!posts) return [];

  let filteredPosts = posts;

  // Filter by search query
  if (query) {
    filteredPosts = filteredPosts.filter((post) => {
      const searchContent = post.title + post.excerpt + post.tags?.join(' ');
      return searchContent
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }

  // Filter by selected tags
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      selectedTags.some((tag) => post.tags?.includes(tag)),
    );
  }

  return filteredPosts;
};

const sortPosts = (posts: Post[], sortOption: SortOption): Post[] => {
  const sorted = [...posts];

  switch (sortOption) {
    case 'date-desc':
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    case 'date-asc':
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    case 'views-desc':
    case 'views-asc':
      // Views sorting would require fetching view counts - for now, fallback to date
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    default:
      return sorted;
  }
};

const getAllTags = (posts: Post[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

interface BlogContentProps {
  posts: Post[];
}

/**
 * BlogContent component that displays a list of blog posts with filtering and sorting options.
 *
 * @param {BlogContentProps} param0
 * @param {{}} param0.posts
 * @returns {React.ReactNode}
 */
const BlogContent = ({ posts }: BlogContentProps): React.ReactNode => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => getAllTags(posts), [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = filterPosts(posts, query, selectedTags);
    return sortPosts(filtered, sortOption);
  }, [posts, query, selectedTags, sortOption]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedTags([]);
    setSortOption('date-desc');
  };

  const hasActiveFilters =
    query || selectedTags.length > 0 || sortOption !== 'date-desc';

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
      <Container wide={true} className="py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Posts Section */}
          <div className="order-2 flex-1 space-y-6 lg:order-1">
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Active filters:
                </span>
                {query && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => setQuery('')}
                  >
                    &quot;{query}&quot;
                    <XIcon className="size-3" />
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <XIcon className="size-3" />
                  </Badge>
                ))}
                {sortOption !== 'date-desc' && (
                  <Badge variant="outline" className="gap-1">
                    {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground h-auto px-2 py-1 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Posts Grid or Empty State */}
            {filteredAndSortedPosts.length ? (
              <div className="grid auto-cols-fr grid-cols-1 gap-8">
                {filteredAndSortedPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={
                  query || selectedTags.length > 0
                    ? `No posts found. Try adjusting your filters.`
                    : "The posts are playing hide and seek – we just can't find them!"
                }
              />
            )}
          </div>

          {/* Filter Sidebar - Right Side */}
          <aside className="order-1 lg:order-2 lg:w-72 lg:shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-dashed p-6">
              <div className="flex items-center gap-2">
                <FilterIcon className="text-primary size-5" />
                <h3 className="font-cal text-lg font-semibold">Filters</h3>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Sort by
                </h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
                      <span className="text-muted-foreground">▼</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup
                      value={sortOption}
                      onValueChange={(value) =>
                        setSortOption(value as SortOption)
                      }
                    >
                      {SORT_OPTIONS.map((option) => (
                        <DropdownMenuRadioItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Separator />

              {/* Tags Filter */}
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Topics ({allTags.length})
                </h4>
                <div className="flex max-h-64 flex-wrap gap-2 overflow-y-auto">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? 'default' : 'outline'
                      }
                      className={cn(
                        'cursor-pointer transition-colors',
                        selectedTags.includes(tag)
                          ? 'hover:bg-primary/80'
                          : 'hover:bg-accent',
                      )}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    <XIcon className="mr-2 size-4" />
                    Clear all filters
                  </Button>
                </>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
};

export default BlogContent;
