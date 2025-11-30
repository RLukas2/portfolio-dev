// Shared content types for posts and projects
export interface BaseContent {
  slug: string;
  title: string;
  date: string;
  code: string;
  readingTime: string;
  headings?: string;
  image?: string;
  imageMeta?: string;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

export interface ContentThumbnailProps {
  image?: string;
  title: string;
  imageMeta?: string;
}

export interface ContentBodyProps {
  slug: string;
  code: string;
  headings?: string;
  engagements?: boolean;
}

export interface ContentHeaderProps {
  /** Content for the left section (e.g., back button) */
  leftSection?: React.ReactNode;
  /** Content for the middle/main section (e.g., title, description, tags) */
  children: React.ReactNode;
  /** Additional class name for the container */
  className?: string;
  /** Props for the container (supports wide prop) */
  containerProps?: ContainerProps;
}

export interface ContentMetaProps {
  date?: string;
  readingTime: string;
  slug: string;
  /** Additional content to render after the default meta (e.g., action buttons) */
  actions?: React.ReactNode;
}

// Shared filter types
export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'views-desc'
  | 'views-asc'
  | 'title-asc'
  | 'title-desc';

export interface SortOptionItem {
  value: SortOption;
  label: string;
}

export interface FilterSidebarProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
  sortOptions: SortOptionItem[];
}

export interface ActiveFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  sortOption: SortOption;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  sortOptions: SortOptionItem[];
}
