'use client';

import { SearchIcon } from 'lucide-react';

import EmptyState from '@/components/common/empty-state';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ActiveFilters, FilterSidebar } from '@/features/content/components';

import { SORT_OPTIONS, useShortFilters } from '../hooks/use-short-filters';
import ShortCard from './short-card';
import type { Short } from '.content-collections/generated';

interface ShortsContentProps {
  shorts: Short[];
}

/**
 * ShortsContent component that displays a list of shorts with filtering and sorting options.
 *
 * @param {ShortsContentProps} props - The component props
 * @param {Short[]} props.shorts - Array of shorts to display
 * @returns {React.ReactNode} The rendered shorts content
 */
const ShortsContent = ({ shorts }: ShortsContentProps): React.ReactNode => {
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
    filteredShorts,
  } = useShortFilters(shorts);

  return (
    <>
      {/* Page Header with Search */}
      <PageHeader
        title="Short Notes"
        description="My personal notes that is not long enough to be a blog post."
      >
        <div className="relative w-full">
          <Input
            aria-label="Search shorts"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shorts..."
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
          {/* Shorts Section */}
          <div className="order-2 flex-1 space-y-6 lg:order-1">
            {' '}
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <ActiveFilters
                query={query}
                setQuery={setQuery}
                sortOption={sortOption}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                clearFilters={clearFilters}
                sortOptions={SORT_OPTIONS}
              />
            )}
            {/* Shorts Grid or Empty State */}
            {filteredShorts.length ? (
              <div className="group/grid grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {filteredShorts.map((short) => (
                  <ShortCard key={short._id} short={short} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={
                  query || selectedTags.length > 0
                    ? 'No shorts found. Try adjusting your filters.'
                    : 'The shorts are probably off having a party somewhere without us!'
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
            sortOptions={SORT_OPTIONS}
          />
        </div>
      </Container>
    </>
  );
};

export default ShortsContent;
