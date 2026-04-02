import type { db as DB } from '@xbrk/db/client';
import { articleViews, user } from '@xbrk/db/schema';
import { sql } from 'drizzle-orm';

type DbClient = typeof DB;

const DEFAULT_MONTHS = 6;
const FIRST_DAY = 1;

// Helper function to calculate start date for a given number of months back
function calculateStartDate(months: number): Date {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), FIRST_DAY));
  start.setUTCMonth(start.getUTCMonth() - (months - 1));
  return start;
}

// Helper function to process monthly data into continuous range
function processMonthlyData(
  result: { rows: Record<string, unknown>[] },
  start: Date,
  months: number,
): { month: string; count: number }[] {
  const monthCounts = new Map<string, number>();
  for (const row of result.rows as {
    month: string;
    count: number;
  }[]) {
    monthCounts.set(row.month, Number(row.count));
  }

  const data: { month: string; count: number }[] = [];
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
 * @param input.months - Number of months to look back (default: 6).
 */
export async function monthlyUsers(db: DbClient, input?: { months?: number }) {
  const months = input?.months ?? DEFAULT_MONTHS;
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
}

/**
 * Returns monthly article view counts for the given number of months.
 * Fills in zero for months with no views to ensure a continuous range.
 * @param input.months - Number of months to look back (default: 6).
 */
export async function monthlyBlogViews(db: DbClient, input?: { months?: number }) {
  const months = input?.months ?? DEFAULT_MONTHS;
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
}
