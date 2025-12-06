'use server';

import { SITE } from '@/constants/site';
import env from '@/lib/env';
import fetcher from '@/lib/fetcher';

import type {
  GitHubRepository,
  GitHubUser,
  UserContributionsCollection,
} from '../types/github';

const GITHUB_USERNAME = SITE.author.github.username;

const GITHUB_USER_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_USER_GRAPHQL_URL = 'https://api.github.com/graphql';
const PERSONAL_ACCESS_TOKEN = env.GITHUB_READ_USER_TOKEN_PERSONAL ?? '';

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

export const getGitHubUser = async (): Promise<GitHubUser> => {
  if (!PERSONAL_ACCESS_TOKEN) {
    throw new Error('GitHub personal access token is not set');
  }

  try {
    return await fetcher<GitHubUser>(GITHUB_USER_API_URL, {
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 * 10 },
    });
  } catch (error) {
    throw error;
  }
};

export const getGitHubUserRepositories = async (): Promise<
  GitHubRepository[]
> => {
  if (!PERSONAL_ACCESS_TOKEN) {
    throw new Error('GitHub personal access token is not set');
  }

  try {
    return await fetcher<GitHubRepository[]>(`${GITHUB_USER_API_URL}/repos`, {
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 * 10 },
    });
  } catch (error) {
    throw error;
  }
};

export const getGitHubUserContributions =
  async (): Promise<UserContributionsCollection> => {
    if (!PERSONAL_ACCESS_TOKEN) {
      throw new Error('GitHub personal access token is not set');
    }

    try {
      const response = await fetcher<{
        data: { user: UserContributionsCollection };
      }>(GITHUB_USER_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: GITHUB_USER_QUERY,
          variables: {
            username: GITHUB_USERNAME,
          },
        }),
        next: { revalidate: 60 * 10 }, // Cache for 10 minutes
      });

      return response.data.user;
    } catch (error) {
      throw error;
    }
  };
