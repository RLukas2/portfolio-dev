/**
 * GitHub API types
 * Used for fetching and displaying GitHub activity data
 */

/**
 * Single day of GitHub contributions
 */
export interface ContributionDay {
  contributionCount: number;
  date: string;
}

/**
 * Week of GitHub contributions (7 days)
 */
export interface ContributionWeeks {
  contributionDays: ContributionDay[];
}

/**
 * Full contribution calendar data
 */
export interface ContributionCalender {
  weeks: ContributionWeeks[];
}

/**
 * Container for contribution calendar
 */
export interface ContributionsCollection {
  contributionCalendar: ContributionCalender;
}

/**
 * GitHub user profile data
 */
export interface GitHubUser {
  avatar_url: string;
  bio: string;
  created_at: string;
  followers: number;
  following: number;
  html_url: string;
  login: string;
  name: string;
  public_repos: number;
  updated_at: string;
}
