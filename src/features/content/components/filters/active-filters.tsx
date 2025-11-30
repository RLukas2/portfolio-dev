import { XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { ActiveFiltersProps } from '../../types/content';

/**
 * A reusable active filters component to display and manage currently applied filters.
 *
 * @param {ActiveFiltersProps} props
 * @returns {React.ReactNode}
 */
const ActiveFilters = ({
  query,
  setQuery,
  sortOption,
  selectedTags,
  toggleTag,
  clearFilters,
  sortOptions,
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
          {sortOptions.find((o) => o.value === sortOption)?.label}
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
