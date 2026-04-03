// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DB } from '@xbrk/db/client';
import { articleViews, user } from '@xbrk/db/schema';
import { sql } from 'drizzle-orm';

type DbClient = typeof DB;

const DEFAULT_MONTHS = 6;
const FIRST_DAY = 1;
const MIN_MONTHS = 1;
const MAX_MONTHS = 24;

interface MonthlyData {
  count: number;
  month: string;
}

/**
 * Validates the months parameter
 */
function validateMonths(months?: number): number {
  if (months === undefined) {
    return DEFAULT_MONTHS;
  }

  if (months < MIN_MONTHS || months > MAX_MONTHS) {
    throw new Error(`Months must be between ${MIN_MONTHS} and ${MAX_MONTHS}`);
  }

  return months;
}

/**
 * Calculates start date for a given number of months back
 */
function calculateStartDate(months: number): Date {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), FIRST_DAY));
  start.setUTCMonth(start.getUTCMonth() - (months - 1));
  return start;
}

/**
 * Processes monthly data into continuous range, filling gaps with zeros
 */
function processMonthlyData(result: { rows: Record<string, unknown>[] }, start: Date, months: number): MonthlyData[] {
  const monthCounts = new Map<string, number>();
  for (const row of result.rows as { month: string; count: number }[]) {
    monthCounts.set(row.month, Number(row.count));
  }

  const data: MonthlyData[] = [];
  const cursor = new Date(start);
  for (let i = 0; i < months; i += 1) {
    const key = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}`;
    data.push({ month: key, count: monthCounts.get(key) ?? 0 });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  return data;
}

/**
 * Returns monthly new user registration counts for the given number of months.
 * Fills in zero for months with no registrations to ensure a continuous range.
 * @param input.months - Number of months to look back (default: 6, min: 1, max: 24).
 * @throws {Error} If months parameter is invalid
 */
export async function monthlyUsers(db: DbClient, input?: { months?: number }): Promise<MonthlyData[]> {
  try {
    const months = validateMonths(input?.months);
    const start = calculateStartDate(months);

    // Fetch monthly counts from DB
    const result = await db.execute(
      sql<{ month: string; count: number }>`
        SELECT to_char(date_trunc('month', ${user.createdAt}), 'YYYY-MM') AS month,
               COUNT(*)::int AS count
        FROM ${user}
        WHERE ${user.createdAt} >= ${start}
        GROUP BY 1
        ORDER BY 1
      `,
    );

    return processMonthlyData(result, start, months);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Months must be')) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[stats.monthlyUsers] Database error:', error);
    return [];
  }
}

/**
 * Returns monthly article view counts for the given number of months.
 * Fills in zero for months with no views to ensure a continuous range.
 * @param input.months - Number of months to look back (default: 6, min: 1, max: 24).
 * @throws {Error} If months parameter is invalid
 */
export async function monthlyBlogViews(db: DbClient, input?: { months?: number }): Promise<MonthlyData[]> {
  try {
    const months = validateMonths(input?.months);
    const start = calculateStartDate(months);

    // Fetch monthly aggregated views from DB by actual view timestamp
    const result = await db.execute(
      sql<{ month: string; count: number }>`
        SELECT to_char(date_trunc('month', ${articleViews.createdAt}), 'YYYY-MM') AS month,
               COUNT(*)::int AS count
        FROM ${articleViews}
        WHERE ${articleViews.createdAt} >= ${start}
        GROUP BY 1
        ORDER BY 1
      `,
    );

    return processMonthlyData(result, start, months);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Months must be')) {
      throw error;
    }
    Sentry.captureException(error);
    console.error('[stats.monthlyBlogViews] Database error:', error);
    return [];
  }
}
