import { FilterIcon, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { SORT_OPTIONS, type SortOption } from '../hooks/use-post-filters';

interface PostFilterSidebarProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

/**
 * PostFilterSidebar component that provides filtering and sorting options for blog posts.
 *
 * @param {PostFilterSidebarProps} param0
 * @param {SortOption} param0.sortOption - Current sort option
 * @param {(option: SortOption) => void} param0.setSortOption - Function to update the sort option
 * @param {{}} param0.selectedTags - Array of currently selected tags
 * @param {(tag: string) => void} param0.toggleTag - Function to toggle a tag filter
 * @param {{}} param0.allTags - Array of all available tags
 * @param {boolean} param0.hasActiveFilters - Indicates if there are any active filters
 * @param {() => void} param0.clearFilters - Function to clear all filters
 * @returns {*}
 */
const PostFilterSidebar = ({
  sortOption,
  setSortOption,
  selectedTags,
  toggleTag,
  allTags,
  hasActiveFilters,
  clearFilters,
}: PostFilterSidebarProps) => {
  return (
    <aside className="order-1 lg:order-2 lg:w-72 lg:shrink-0">
      <div className="sticky top-24 space-y-6 rounded-2xl border border-dashed p-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="text-primary size-5" />
          <h3 className="font-cal text-lg font-semibold">Filters</h3>
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-medium">Sort by</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
                <span className="text-muted-foreground">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
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
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
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
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              <XIcon className="mr-2 size-4" />
              Clear all filters
            </Button>
          </>
        )}
      </div>
    </aside>
  );
};

export default PostFilterSidebar;
