/**
 * @xbrk/types
 * Shared TypeScript type definitions for the monorepo
 */

// Authentication
export type { AuthProvider } from './auth';
// Database entities
// Legacy type aliases for backward compatibility
// @deprecated Use `Project` instead
// @deprecated Use `Experience` instead
// @deprecated Use `Snippet` instead
// @deprecated Use `Article` instead
// @deprecated Use `Comment` instead
// @deprecated Use `User` instead
// @deprecated Use `CommentReaction` instead
// @deprecated Use `Guestbook` instead
// @deprecated Use `Service` instead
export type {
  Article,
  Article as ArticleType,
  Comment,
  Comment as CommentType,
  CommentReaction,
  CommentReaction as CommentReactionType,
  CommentWithRelations,
  Experience,
  Experience as ExperienceType,
  Guestbook,
  Guestbook as GuestbookType,
  Project,
  Project as ProjectType,
  Service,
  Service as ServiceType,
  Snippet,
  Snippet as SnippetType,
  User,
  User as UserType,
} from './db';
// GitHub integration
export type {
  ContributionCalender,
  ContributionDay,
  ContributionsCollection,
  ContributionWeeks,
  GitHubUser,
} from './github';
// Miscellaneous types
export type {
  Bookmark,
  Collection,
  TOC,
  UseData,
} from './misc';
// Site configuration and navigation
export type {
  ContentNavItem,
  NavItem,
  SiteConfig,
  Social,
} from './site';
// Utility types
export type {
  Branded,
  DeepPartial,
  KeysOfType,
  Mutable,
  NonNullableProps,
  Nullable,
  PartialBy,
  RequiredBy,
} from './utils';
