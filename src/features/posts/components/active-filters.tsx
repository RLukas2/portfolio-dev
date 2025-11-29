import { XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { SORT_OPTIONS, type SortOption } from '../hooks/use-post-filters';

interface ActiveFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  sortOption: SortOption;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

/**
 * ActiveFilters component to display and manage currently applied filters.
 *
 * @param {ActiveFiltersProps} param0
 * @param {string} param0.query - Current search query
 * @param {(query: string) => void} param0.setQuery - Function to update the search query
 * @param {SortOption} param0.sortOption - Current sort option
 * @param {{}} param0.selectedTags - Array of currently selected tags
 * @param {(tag: string) => void} param0.toggleTag - Function to toggle a tag filter
 * @param {() => void} param0.clearFilters - Function to clear all filters
 * @returns {React.ReactNode} - The rendered ActiveFilters component
 */
const ActiveFilters = ({
  query,
  setQuery,
  sortOption,
  selectedTags,
  toggleTag,
  clearFilters,
}: ActiveFiltersProps): React.ReactNode => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-sm">Active filters:</span>

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
  );
};

export default ActiveFilters;
