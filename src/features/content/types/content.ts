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

export interface ContentThumbnailProps {
  image?: string;
  title: string;
  imageMeta?: string;
}

export interface ContentBodyProps {
  slug: string;
  code: string;
  headings?: string;
}

export interface ContentHeaderProps {
  /** Content for the left section (e.g., back button) */
  leftSection?: React.ReactNode;
  /** Content for the middle/main section (e.g., title, description, tags) */
  children: React.ReactNode;
  /** Content for the right section (e.g., action buttons) */
  rightSection?: React.ReactNode;
  /** Additional class name for the container */
  className?: string;
}

export interface ContentMetaProps {
  date: string;
  readingTime: string;
  slug: string;
  /** Additional content to render after the default meta (e.g., action buttons) */
  actions?: React.ReactNode;
}
